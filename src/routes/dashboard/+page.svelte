<script lang="ts">
	export let data: {
		cryptos: { id: string; name: string; symbol: string; priceUsd: string }[];
	};
</script>

<table class="min-w-full border-collapse">
	<thead>
		<tr class="bg-gray-100">
			<th class="border px-4 py-2 text-left">Name</th>
			<th class="border px-4 py-2 text-left">Symbol</th>
			<th class="border px-4 py-2 text-left">Price (USD)</th>
			<th class="border px-4 py-2 text-left">Details</th>
		</tr>
	</thead>
	<tbody>
		{#each data.cryptos as crypto}
			<tr class="hover:bg-gray-50">
				<td class="border px-4 py-2">{crypto.name}</td>
				<td class="border px-4 py-2">{crypto.symbol}</td>
				<td class="border px-4 py-2">{crypto.priceUsd}</td>
				<td class="border px-4 py-2">
					<a
						href={'/details/' + crypto.id}
						class="rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
					>
						Details
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
