const { slugify } = require('./slugify')
const dayjs = require('dayjs')
const open = require('open')

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise((resolve, reject) => {
      prompter
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is the title?',
          },
          {
            type: 'input',
            name: 'description',
            message: 'What is the description?',
          },
        ])
        .then(({ title, description }) => {
          // Source: https://tecadmin.net/get-current-date-time-javascript/
          const date = dayjs().format('YYYY-MM-DD')
          const slug = slugify(title)
          const folderName = `${date}-${slug}`
          resolve({ title, description, date, slug, folderName })
          return slug
        })
        .then(slug => {
          // Open in default browser
          open(`http://localhost:8000/${slug}`)
        })
    })
  },
}
