import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

pb.collection('_superusers').authWithPassword('admin@pocketbase.com', 'amiodarone')

export async function getNotes(notebook: string) {
  if (notebook == '') {
    const notes = await pb.collection('notes').getList(1, 50, {
      expand: 'notebook'
    })
    return notes
  }

  const notes = await pb.collection('notes').getList(1, 50, {
    filter: `notebook == ${notebook}`,
    expand: 'notebook'
  })

  return notes
}

export async function getNotebooks() {
  const notebooks = await pb.collection('notebooks').getFullList()
  return notebooks
}

export async function getNotebook(name: string) {
  const notebook = await pb.collection('notebooks').getFirstListItem(`name='${name}'`)
  return notebook
}

export default pb
