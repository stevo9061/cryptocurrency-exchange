<script lang="ts">
	// 1. Read out props (instead of `export let data`)
	let { data } = $props<{
		data: {
			crypto: {
				id: string;
				name: string;
				symbol: string;
				priceUsd: number;
				marketCapUsd: number;
				supply: number;
				maxSupply: number | null;
				volumeUsd24Hr: number;
				changePercent24Hr: number;
				vwap24Hr: number | null;
				explorer: string;
			};
		};
	}>();

	// 2.) Rune state for crypto data
	// Extract the crypto data set
	// Creates a mutable, reactive variable. Bindable to inputs and observable in effects.
	const crypto = $state(data.crypto);
	// Fields for the conversion
	let cryptoAmount = $state(1);
	let usdAmount = $state(0);

	// 3) Effects instead of own functions
	// Executes a side effect whenever state variables read in the callback change.
	$effect(() => {
		usdAmount = cryptoAmount * crypto.priceUsd;
	});

	$effect(() => {
		if (crypto.value.priceUsd !== 0) {
			cryptoAmount = usdAmount / crypto.priceUsd;
		}
	});

	// A function for formatting
	function formatNumber(num: number | null): string {
		if (num == null) return 'N/A';
		return num.toFixed(2);
	}

	// 4) Derived list with multi-select and derived conversion
	const currencies = $state([
		{ key: 'EUR', value: 0.92 },
		{ key: 'GBP', value: 0.81 },
		{ key: 'JPY', value: 134.5 }
	]);

	// List of currently selected currencies
	let selectedCurrencies = $state<{ key: string; value: number }[]>([]);

	// Calculation of the converted values for the selected currencies
	// Automatically updated array
	// Creates a value that is automatically recalculated when dependent states change.
	let convertedCurrencies = $derived(
		selectedCurrencies.map((c) => ({ key: c.key, value: c.value * usdAmount }))
	);
</script>

{#if crypto}
	<a
		href="/dashboard"
		class="mb-4 inline-block rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
	>
		← Back to Dashboard
	</a>
	<h1>Cryptocurrency Exchange Rate</h1>
	<h2>This page displays detailed exchange rate information for a selected cryptocurrency.</h2>

	<!-- Crypto Details -->
	<div class="crypto-detail">
		<h2>{crypto.name} ({crypto.symbol}) Details</h2>
		<div class="details-container">
			<div class="detail-item">
				<strong>Current price:</strong>
				<span>{formatNumber(crypto.priceUsd)} USD</span>
			</div>
			<div class="detail-item">
				<strong>Market capitalisation:</strong>
				<span>{formatNumber(crypto.marketCapUsd)} USD</span>
			</div>
			<div class="detail-item">
				<strong>Number in circulation:</strong>
				<span>{formatNumber(crypto.supply)}</span>
			</div>
			<div class="detail-item">
				<strong>Maximum supply:</strong>
				<span>{crypto.maxSupply ? formatNumber(crypto.maxSupply) : 'Unlimited'}</span>
			</div>
			<div class="detail-item">
				<strong>Volume (24h):</strong>
				<span>{formatNumber(crypto.volumeUsd24Hr)} USD</span>
			</div>
			<div class="detail-item">
				<strong>Change (24h):</strong>
				<span>{formatNumber(crypto.changePercent24Hr)} %</span>
			</div>
			<div class="detail-item">
				<strong>VWAP (24h):</strong>
				<span>{formatNumber(crypto.vwap24Hr)}</span>
			</div>
			<div class="detail-item">
				<strong>Explorer:</strong>
				<a href={crypto.explorer} target="_blank">{crypto.explorer}</a>
			</div>
		</div>
	</div>

	<!-- Conversion Section -->
	<div class="crypto-calc">
		<h3>{crypto.name} to USD Conversion</h3>
		<div class="details-container">
			<div class="detail-item">
				<label for="crypto-amount">{crypto.name}:</label>
				<input
					id="crypto-amount"
					type="number"
					bind:value={cryptoAmount}
					placeholder={'Quantity in ' + crypto.symbol}
					class="input-field"
				/>
			</div>
			<div class="detail-item">
				<label for="usd-amount">USD:</label>
				<input
					id="usd-amount"
					type="number"
					bind:value={usdAmount}
					placeholder="Amount in USD"
					class="input-field"
				/>
			</div>
		</div>
	</div>

	<!-- Additional Section for Multi-select conversion -->
	<h3>Convert to other currencies</h3>
	<div>
		<label for="currency-select">Select currencies:</label>
		<select id="currency-select" multiple bind:value={selectedCurrencies}>
			{#each currencies as currency}
				<option value={currency}>{currency.key}</option>
			{/each}
		</select>
	</div>

	<h3>Selected currencies</h3>
	<ul>
		{#each convertedCurrencies as currency}
			<li>{currency.key}: {formatNumber(currency.value)}</li>
		{/each}
	</ul>
{:else}
	<p>Loading crypto details...</p>
{/if}

<style>
	.crypto-detail,
	.crypto-calc {
		margin: 1rem 0;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.details-container {
		display: flex;
		flex-wrap: wrap;
	}
	.detail-item {
		flex: 1 1 200px;
		margin: 0.5rem;
	}
	.input-field {
		width: 100%;
		padding: 0.5rem;
		box-sizing: border-box;
	}
</style>
