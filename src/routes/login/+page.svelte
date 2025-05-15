<script lang="ts">
    export let data: { error?: string };

</script>

<form
  method="POST"
>
  <label for="email">E-Mail</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Passwort</label>
  <input id="password" name="password" type="password" required />

  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
  >
    Login
  </button>

  {#if data.error}
  <p class="text-red-600">{data.error}</p>
{/if}
</form>