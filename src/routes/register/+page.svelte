<script lang="ts">
    import { enhance } from '$app/forms';
    export let data: { error?: string };
</script>

<form method="POST" use:enhance>
    <label for="email">E-Mail</label>
    <input id="email" name="email" type="email" required />

    <label for="password">Password</label>
    <input id="password" name="password" type="password required" />

    <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
    Register
    </button>

    {#if data.error}
        <p class="text-red-600">{data.error}</p>
    {/if}
    </form>