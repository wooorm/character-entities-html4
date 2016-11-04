/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities-html4:script
 * @fileoverview Generate a dictionary of entity names to replacements.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');

/* Read. */
var doc = fs.readFileSync(path.join('data', 'entities.html'), 'utf8');

/* Transform. */
var re = /&lt;!ENTITY([\s\S]+?)--&gt;/g;
var entities = {};
var match = re.exec(doc);

while (match) {
  match = match[1].split('--', 1)[0].split(/\s+/).filter(Boolean);

  if (match[1] === 'CDATA') {
    entities[match[0]] = String.fromCharCode(
      match[2].split('#')[1].split(';')[0]
    );
  }

  match = re.exec(doc);
}

/* Write. */
entities = JSON.stringify(entities, 0, 2) + '\n';

fs.writeFileSync('index.json', entities);
