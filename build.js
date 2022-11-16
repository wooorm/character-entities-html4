import fs from 'node:fs/promises'
import fetch from 'node-fetch'

const response = await fetch('https://www.w3.org/TR/html4/sgml/entities.html')
const text = await response.text()

/** @type {Record<string, string>} */
const entities = {}
const re = /&lt;!ENTITY([\s\S]+?)--&gt;/g
let match = re.exec(text)

while (match) {
  const list = match[1].split('--', 1)[0].split(/\s+/).filter(Boolean)

  if (list[1] === 'CDATA') {
    entities[list[0]] = String.fromCodePoint(
      Number(list[2].split('#')[1].split(';')[0])
    )
  }

  match = re.exec(text)
}

await fs.writeFile(
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
  ].join('\n')
)
