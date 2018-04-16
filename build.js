'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')

https.get('https://www.w3.org/TR/html4/sgml/entities.html', onconnection)

function onconnection(res) {
  res.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  var entities = {}
  var re = /&lt;!ENTITY([\s\S]+?)--&gt;/g
  var match = re.exec(data)

  while (match) {
    match = match[1]
      .split('--', 1)[0]
      .split(/\s+/)
      .filter(Boolean)

    if (match[1] === 'CDATA') {
      entities[match[0]] = String.fromCharCode(
        match[2].split('#')[1].split(';')[0]
      )
    }

    match = re.exec(data)
  }

  data = JSON.stringify(entities, null, 2)

  fs.writeFile('index.json', data + '\n', bail)
}
