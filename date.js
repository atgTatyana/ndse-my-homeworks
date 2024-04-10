#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

if (argv._[0] === 'current') {
  if (argv.year || argv.y) {
    console.log(new Date().getFullYear())
    return
  }
  
  if (argv.month || argv.m) {
    console.log(`0${new Date().getMonth() + 1}`)
    return
  }
  
  if (argv.date || argv.d) {
    console.log(new Date().getDate())
    return
  }
  
  console.log(new Date())
}

if (argv._[0] === 'add' || 'sub') {
  console.log(new Date)
  if (argv.date || argv.d) {
    const currentTime = new Date().getTime()
    const days = argv.date ? argv.date : argv.d
    argv._[0] === 'add' ? console.log(new Date(currentTime + 24 * 3600 * 1000 * days))
      : console.log(new Date(currentTime - 24 * 3600 * 1000 * days))
    return
  }

  const now = new Date()

  if (argv.month || argv.m) { 
    const month = argv._[0] === 'add' ? now.getMonth() + (argv.month ? argv.month : argv.m)
      : now.getMonth() - (argv.month ? argv.month : argv.m)

    console.log(new Date(
      now.getFullYear(),
      month,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    ))
    return
  }
  
  if (argv.year || argv.y) {
    const year = argv._[0] === 'add' ? now.getFullYear() + (argv.year ? argv.year : argv.y)
      : now.getFullYear() - (argv.year ? argv.year : argv.y)

    console.log(new Date(
      year,
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    ))
    return
  }
}
