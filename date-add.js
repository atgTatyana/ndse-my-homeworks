#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

console.log(new Date)

if (argv.date || argv.d) {
  const currentTime = new Date().getTime()
  const dateAdd = argv.date ? argv.date : argv.d
  console.log(new Date(currentTime + 24 * 3600 * 1000 * dateAdd))
  return
}

const now = new Date()

if (argv.month || argv.m) {
  const month = now.getMonth() + (argv.month ? argv.month : argv.m)
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
  const year = now.getFullYear() + (argv.year ? argv.year : argv.y)
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
