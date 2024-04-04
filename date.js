#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

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
