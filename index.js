const http = require('http')

const myAPIKey = process.env.myAPIKey
const citiName = process.argv[2]

const url = `http://api.openweathermap.org/data/2.5/weather?q=${citiName}&appid=${myAPIKey}`

http.get(url, (res) => {

  const {statusCode} = res
  if (statusCode !== 200) {
    console.log(`statusCode: ${statusCode}`)
    return
  }

  res.setEncoding('utf8')
  let rowData = ''
  res.on('data', (chunk) => rowData += chunk)
  res.on('end', () => { 
    const parseData = JSON.parse(rowData)
    console.log(parseData)
  })
}).on('error', (err) =>{ 
  console.error(err)
})
