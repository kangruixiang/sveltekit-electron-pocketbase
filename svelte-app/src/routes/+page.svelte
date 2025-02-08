<script lang="ts">
	let { data } = $props();

	const testNote = data.notes[0].title;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>Test Note from Pocketbase: {testNote}</p>
