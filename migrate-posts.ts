// # 4. Copy *.png files to /astro-migration/public/assets/images
// # 5. Update *.png references in md file

;(async function main() {
  console.log('running migration script')
  // 1. Loop through /content directory
  const pathToContent = `${Deno.cwd()}/content`
  for await (const dirEntry of Deno.readDir(pathToContent)) {
    const currentDir = dirEntry.name
    const pathToDir = `${pathToContent}/${currentDir}`

    await processDir(currentDir, pathToDir)
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
      // TODO update file in markdown
      // Referenced in markdown like (assets/img/astronaut.png)
    }
  }
  // Clean up - remove dir
  //   await Deno.remove(fullPathToDir, { recursive: true })
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
