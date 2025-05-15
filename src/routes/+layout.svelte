<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';


	let { children, data } = $props<{
		children: unknown;
		data: {
		    user: { id: string; email: string } | null;
		};
	}>();

	const user = data.user;


	onMount(() => {
		console.log('Layout user prop:', user);
	});

</script>

<nav class="bg-gray-800 text-white p-4 flex justify-center">
	<div>
		<h2>My Crypto App</h2>
		
	{#if user}
	<div>Logged in as <strong>{user.email}</strong>
	<form method="POST" action="/logout" class="inline">
	<button
		type="submit"
		class="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
		>
		Logout
	</button>
	</form>
	</div>
	
	 {/if}
</nav>

<main class="p-4">
	{@render children()}
</main>
