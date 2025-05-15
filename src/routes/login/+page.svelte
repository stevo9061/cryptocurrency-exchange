<script lang="ts">
  // wir arbeiten weiter im Legacy-Modus ohne Runes
  export let data: { 
    error?: string ;
    cryptos: { id: string; name: string; symbol: string; priceUsd: string}[];
  };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  <!-- 1. Neue Sektion: Top 5 Cryptos -->
  <section class="mb-8 w-full max-w-xl">
    <h3 class="text-xl font-semibold mb-2 text-center">Top 6 Cryptocurrencies</h3>
    <ul class="grid grid-cols-2 gap-4">
      {#each data.cryptos as crypto}
        <li class="bg-white p-3 rounded shadow flex justify-between">
          <span>{crypto.name} ({crypto.symbol})</span>
          <span class="font-mono">{(+crypto.priceUsd).toFixed(2)} USD</span>
        </li>
      {/each}
      {#if data.cryptos.length === 0}
        <li class="col-span-2 text-center text-gray-500">
          No data available.
        </li>
      {/if}
    </ul>
  </section>

<div class="flex items-center justify-center bg-gray-100 px-4">
  <div class="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold text-center mb-6">Login</h2>

    <form method="POST" class="space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {#if data.error}
        <p class="text-sm text-red-600">{data.error}</p>
      {/if}

      <button
        type="submit"
        class="w-full bg-gray-800 hover:bg-blue-600 text-white font-medium py-2 rounded transition"
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