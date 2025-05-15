<script lang="ts">
    export let data: { error?: string };
  </script>
  
  <form
    method="POST"
  >
    <label for="email">E-Mail</label>
    <input id="email" name="email" type="email" required />
  
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required />
  
    <button
      type="submit"
      class="bg-gray-800 hover:bg-blue-700 text-white py-1 px-2 rounded"
    >
      Register
    </button>

    {#if data.error}
    <p class="text-red-600"> User already exists {data.error}</p>
  {/if}
  </form>