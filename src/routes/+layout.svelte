<script lang="ts">
	import '../app.css';

	//    $props() reads the props that I returned in +layout.server.ts:
	//    - children: All subordinate pages/layouts that are loaded in here
	//    - data.user: The user object from event.locals (or null if not logged in)
	let { children, data } = $props<{
		children: unknown;
		data: {
			user: { id: string; email: string } | null;
		};
	}>();

	const user = data.user;
</script>

<nav class="flex justify-center bg-gray-800 p-4 text-white">
	<div>
		<h2>My Crypto App</h2>

		{#if user}
			<div>
				Logged in as <strong>{user.email}</strong>
				<form method="POST" action="/logout" class="inline">
					<button
						type="submit"
						class="ml-4 rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
					>
						Logout
					</button>
				</form>
			</div>
		{/if}
	</div>
</nav>

<main class="p-4">
	{@render children()}
</main>
