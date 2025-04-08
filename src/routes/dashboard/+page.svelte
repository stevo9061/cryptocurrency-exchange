<script lang="ts">
    export let data;
</script>

<h1>Dashboard</h1>
{#each data.cryptos as crypto}
    <div>
        <strong>{crypto.name}</strong> - {crypto.symbol} - {crypto.priceUsd}
    </div>
    {/each}