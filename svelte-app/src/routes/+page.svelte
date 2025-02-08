<script lang="ts">
	let { data } = $props();
	import pb from '$lib/db';

	// export async function load() {
	//   console.log("Logged in to Pocket client: ", pb.authStore.isValid)
	//   setTimeout(async () => {
	//     const notes = await pb.collection('notes').getFullList()
	//     console.log(notes)
	//   }, 200)

	// }

	const testNote = data.notes[0].title;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>Test Note from Pocketbase: {testNote}</p>
