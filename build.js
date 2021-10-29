import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concatStream from 'concat-stream'

https.get('https://www.w3.org/TR/html4/sgml/entities.html', (response) => {
  response.pipe(concatStream(onconcat)).on('error', bail)
})

/**
 * @param {Buffer} data
 */
function onconcat(data) {
  const value = String(data)
  /** @type {Record.<string, string>} */
  const entities = {}
  const re = /&lt;!ENTITY([\s\S]+?)--&gt;/g
  let match = re.exec(value)

  while (match) {
    const list = match[1].split('--', 1)[0].split(/\s+/).filter(Boolean)

    if (list[1] === 'CDATA') {
      entities[list[0]] = String.fromCharCode(
        Number(list[2].split('#')[1].split(';')[0])
      )
    }

    match = re.exec(value)
  }

  fs.writeFile(
    'index.js',
    [
      '/**',
      ' * Map of named character references from HTML 4.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const characterEntitiesHtml4 = ' +
        JSON.stringify(entities, null, 2),
      ''
    ].join('\n'),
    bail
  )
}
