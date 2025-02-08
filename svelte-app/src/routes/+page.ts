import pb, { getAuth } from '$lib/db'

export async function load() {
  await getAuth()

  const notes = await pb.collection('notes').getFullList()
  console.log('from page.ts load', notes)

  return {
    notes
  }
}