import pb, { getAuth } from '$lib/db'

export async function load() {


  const notes = await pb.collection('notes').getFullList()
  console.log(notes)


}