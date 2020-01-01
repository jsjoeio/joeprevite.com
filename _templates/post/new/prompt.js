const { slugify } = require('./slugify')

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
          const today = new Date()
          const date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate()
          const slug = slugify(title)
          const folderName = `${date}-${slug}`
          resolve({ title, description, date, slug, folderName })
        })
    })
  },
}
