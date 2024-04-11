const fs = require('fs')

const log = process.argv[2]
const readerStream = fs.createReadStream(log)

let data
readerStream
  .setEncoding('UTF8')
  .on('data', (chank) => {
    data += chank
  })

  .on('end', () => {
    const arr = data.split(' ')
    const winArr = arr.filter(item => item === 'win')
    const loseArr = arr.filter(item => item === 'lose')
    console.log('общее количество партий: ',
      winArr.length + loseArr.length)
    console.log('количество выигранных/проигранных партий: ',
      winArr.length, '/', loseArr.length)
    console.log('процентное соотношение выигранных партий: ',
      Math.round(winArr.length * 100 / (winArr.length + loseArr.length)), '%')
  })
  
  .on('error', (err) => {
    console.log(err)
  })
