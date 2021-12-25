;(async function main() {
  console.log('running migration script')
  const pathToContent = `${Deno.cwd()}/content`

  for await (const dirEntry of Deno.readDir(pathToContent)) {
    const currentDir = dirEntry.name
    const pathToDir = `${pathToContent}/${currentDir}`

    await processDir(currentDir, pathToDir)

    break
  }
  console.log(`✅ Done processing /content directory.`)
})()

/**
 * Used to process a directory under /content
 *
 * Expected to have an index.md and maybe .png files
 */
async function processDir(dirName: string, fullPathToDir: string) {
  // Loop through files
  for await (const dirEntry of Deno.readDir(fullPathToDir)) {
    const fileName = dirEntry.name
    // If index, rename, and move. process
    if (fileName === 'index.md') {
      await moveIndexFile(dirName, fullPathToDir)
    }
    if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName)) {
      await moveImageFile(fileName, fullPathToDir)
      await updateImageReferenceInMarkdownFile(fileName, dirName)
    }
  }
  // Clean up - remove dir
  await Deno.remove(fullPathToDir, { recursive: true })
}

async function moveIndexFile(dirName: string, fullPathToDir: string) {
  const oldFilePath = `${fullPathToDir}/index.md`
  const newFilePath = `${Deno.cwd()}/astro-migration/src/data/posts/${dirName}.md`
  await Deno.rename(oldFilePath, newFilePath)
}

async function moveImageFile(fileName: string, fullPathToDir: string) {
  const oldFilePath = `${fullPathToDir}/${fileName}`
  const newFilePath = `${Deno.cwd()}/astro-migration/public/assets/images/${fileName}`
  await Deno.rename(oldFilePath, newFilePath)
}

async function updateImageReferenceInMarkdownFile(
  fileName: string,
  dirName: string,
) {
  // readFile
  const pathToMarkdownFile = `${Deno.cwd()}/astro-migration/src/data/posts/${dirName}.md`
  const decoder = new TextDecoder('utf-8')
  const data = await Deno.readFile(pathToMarkdownFile)
  // as string
  const fileAsString = decoder.decode(data)
  // replace text in string
  const updatedString = fileAsString.replace(
    `./${fileName}`,
    `assets/images/${fileName}`,
  )
  // writeFile (overwrite?)
  const encoder = new TextEncoder()
  const newData = encoder.encode(updatedString)
  await Deno.writeFile(pathToMarkdownFile, newData)
}
