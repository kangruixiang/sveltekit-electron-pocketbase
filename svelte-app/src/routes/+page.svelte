<script lang="ts">
	let { data } = $props();

	const notes = data.notes;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation.
</p>

{#if notes.length > 0}
	<p>Test Note from Pocketbase: {notes[0].title}</p>
{:else}
	<p>No notes found.</p>
{/if}
