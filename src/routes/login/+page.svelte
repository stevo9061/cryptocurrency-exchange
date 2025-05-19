<script lang="ts">
	// legacy mode without runes
	export let data: {
		error?: string;
		cryptos: { id: string; name: string; symbol: string; priceUsd: string }[];
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<section class="mb-8 w-full max-w-xl">
		<h3 class="mb-2 text-center text-xl font-semibold">Top 6 Cryptocurrencies</h3>
		<ul class="grid grid-cols-2 gap-4">
			{#each data.cryptos as crypto}
				<li class="flex justify-between rounded bg-white p-3 shadow">
					<span>{crypto.name} ({crypto.symbol})</span>
					<span class="font-mono">{(+crypto.priceUsd).toFixed(2)} USD</span>
				</li>
			{/each}
			{#if data.cryptos.length === 0}
				<li class="col-span-2 text-center text-gray-500">No data available.</li>
			{/if}
		</ul>
	</section>

	<div class="flex items-center justify-center bg-gray-100 px-4">
		<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
			<h2 class="mb-6 text-center text-3xl font-semibold">Login</h2>

			<form method="POST" class="space-y-5">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">E-Mail</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					/>
				</div>

				<div>
					<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label
					>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					/>
				</div>

				{#if data.error}
					<p class="text-sm text-red-600">{data.error}</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded bg-gray-800 py-2 font-medium text-white transition hover:bg-blue-600"
				>
					Login
				</button>
			</form>

			<p class="mt-6 text-center text-sm text-gray-600">
				No account yet?
				<a href="/register" class="text-gray-600 hover:underline">Register</a>
			</p>
		</div>
	</div>
</div>
