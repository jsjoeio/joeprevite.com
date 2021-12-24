// # 4. Copy *.png files to /astro-migration/public/assets/images
// # 5. Update *.png references in md file

;(async function main() {
  console.log('running migration script')
  // 1. Loop through /content directory
  const pathToContent = `${Deno.cwd()}/content`
  for await (const dirEntry of Deno.readDir(pathToContent)) {
    const currentDir = dirEntry.name
    const pathToDir = `${pathToContent}/${currentDir}`
    await processDir(pathToDir)
    // 2. Rename index.md to <folder-name>.md
    // const { path, name } = await renameIndexFile(dirName)

    // 3. Copy file to /astro-migrateion/src/data/posts
    // await copyMarkdownFileToAstroDir(path, name)

    break
  }
})()

/**
 * Used to process a directory under /content
 *
 * Expected to have an index.md and maybe .png files
 */
async function processDir(fullPathToDir: string) {
  // Loop through files
  for await (const dirEntry of Deno.readDir(fullPathToDir)) {
    const name = dirEntry.name
    // If index, rename, and move. process
    if (name === 'index.md') {
      console.log('processing .md file')
      // TODO process .md file
    }
    if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(name)) {
      console.log('processing photo file')
      // TODO process photo file
    }
  }
  // Clean up - remove dir
  //   await Deno.remove(fullPathToDir, { recursive: true })
}

async function renameIndexFile(dirName: string) {
  const parentPath = `${Deno.cwd()}/content/${dirName}`
  const oldFilePath = `${parentPath}/index.md`
  const newFilePath = `${parentPath}/${dirName}.md`
  await Deno.rename(oldFilePath, newFilePath)

  return {
    path: newFilePath,
    name: `${dirName}.md`,
  }
}

async function copyMarkdownFileToAstroDir(
  currentFilePath: string,
  currentFileName: string,
) {
  const newFilePath = `${Deno.cwd()}/astro-migration/src/data/posts/${currentFileName}`
  await Deno.copyFile(currentFilePath, newFilePath)

  return {
    path: newFilePath,
  }
}
