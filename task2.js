#!/usr/bin/env node

const readline = require('node:readline')

const { stdin: input, stdout: output } = require('node:process')

const rl = readline.createInterface({ input, output })

const number = Math.floor(Math.random()*100)
console.log('Загадано число в диапазоне от 0 до 100')

const checkAnswer = () => {
  rl.question('', (answer) => {
    if (+answer === number) {
      console.log(`Отгадано число ${answer}`)
      rl.close();
    }

    if (+answer < number) {
      console.log('Больше')
      checkAnswer()
    }

    if (+answer > number) {
      console.log('Меньше')
      checkAnswer()
    }
})}

checkAnswer()
