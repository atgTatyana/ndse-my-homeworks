const fs = require('fs')

const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })

const log = process.argv[2]

const number = Math.floor(Math.random()*2) + 1

rl.question('Орёл или решка (1 или 2)? ', (answer) => {
  let content
  if (+answer === number) {
    content = ' win'
    console.log('Win!!!')
  } else {
    content = ' lose'
    console.log('Oops...')
  }
  
  fs.appendFile(log, content, (err) => {
    if (err) throw Error(err)
    console.log('ok')
  })
  rl.close()
})
