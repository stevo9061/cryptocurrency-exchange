<!-- src/routes/crypto/[id]/+page.svelte -->
<script lang="ts">
	// Die von der Load-Funktion bereitgestellten Daten stehen als Prop "data" zur Verfügung.
	export let data: {
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

	// Extrahiere den Krypto-Datensatz
	const { crypto } = data;

	// Felder für die Umrechnung
	let cryptoAmount: number = 1;
	let usdAmount: number = 0;

	// Eine Funktion zur Formatierung, ähnlich dem Angular Number Pipe "1.2-2"
	function formatNumber(num: number | null): string {
		if (num == null) return 'N/A';
		return num.toFixed(2);
	}

	// Berechnungen für die Umrechnung:
	function calculateUsdFromCrypto() {
		usdAmount = cryptoAmount * crypto.priceUsd;
		updateConvertedCurrencies();
	}

	function calculateCryptoFromUsd() {
		if (crypto.priceUsd !== 0) {
			cryptoAmount = usdAmount / crypto.priceUsd;
			updateConvertedCurrencies();
		}
	}

	// Beispielhafte Währungsdaten für ein Multi-Select
	let currencies: { key: string; value: number }[] = [
		{ key: 'EUR', value: 0.92 },
		{ key: 'GBP', value: 0.81 },
		{ key: 'JPY', value: 134.50 }
	];

	// Liste der aktuell ausgewählten Währungen
	let selectedCurrencies: { key: string; value: number }[] = [];

	// Berechnung der umgerechneten Werte für die ausgewählten Währungen:
	let convertedCurrencies: { key: string; value: number }[] = [];

	function updateConvertedCurrencies() {
		convertedCurrencies = selectedCurrencies.map(currency => {
			return { key: currency.key, value: currency.value * cryptoAmount };
		});
	}
</script>

{#if crypto}
	<h1>Cryptocurrency Exchange Rate</h1>
	<h2>This page displays detailed exchange rate information for a selected cryptocurrency.</h2>

	<!-- Crypto Details -->
	<div class="crypto-detail">
		<h2>{crypto.name} ({crypto.symbol}) Details</h2>
		<div class="details-container">
			<div class="detail-item">
				<label>Current price:</label>
				<span>{formatNumber(crypto.priceUsd)} USD</span>
			</div>
			<div class="detail-item">
				<label>Market capitalisation:</label>
				<span>{formatNumber(crypto.marketCapUsd)} USD</span>
			</div>
			<div class="detail-item">
				<label>Number in circulation:</label>
				<span>{formatNumber(crypto.supply)}</span>
			</div>
			<div class="detail-item">
				<label>Maximum supply:</label>
				<span>{crypto.maxSupply ? formatNumber(crypto.maxSupply) : 'Unlimited'}</span>
			</div>
			<div class="detail-item">
				<label>Volume (24h):</label>
				<span>{formatNumber(crypto.volumeUsd24Hr)} USD</span>
			</div>
			<div class="detail-item">
				<label>Change (24h):</label>
				<span>{formatNumber(crypto.changePercent24Hr)} %</span>
			</div>
			<div class="detail-item">
				<label>VWAP (24h):</label>
				<span>{formatNumber(crypto.vwap24Hr)}</span>
			</div>
			<div class="detail-item">
				<label>Explorer:</label>
				<a href={crypto.explorer} target="_blank">{crypto.explorer}</a>
			</div>
		</div>
	</div>

	<!-- Conversion Section -->
	<div class="crypto-calc">
		<h3>{crypto.name} to USD Conversion</h3>
		<div class="details-container">
			<div class="detail-item">
				<label>{crypto.name}:</label>
				<input
					type="number"
					bind:value={cryptoAmount}
					on:input={calculateUsdFromCrypto}
					placeholder={"Quantity in " + crypto.symbol}
					class="input-field"
				/>
			</div>
			<div class="detail-item">
				<label>USD:</label>
				<input
					type="number"
					bind:value={usdAmount}
					on:input={calculateCryptoFromUsd}
					placeholder="Amount in USD"
					class="input-field"
				/>
			</div>
		</div>
	</div>

	<!-- Additional Section for Multi-select conversion -->
	<h3>Convert to other currencies</h3>
	<div>
		<label>Select currencies:</label>
		<!-- Ein einfaches multi-select -->
		<select multiple bind:value={selectedCurrencies} on:change={updateConvertedCurrencies}>
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