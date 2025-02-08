import pb from '$lib/db'

export async function load() {
  console.log("Logged in to Pocket client: ", pb.authStore.isValid)
  const notes = await pb.collection('notes').getFullList()

  console.log(notes)

  return {
    notes
  }
}