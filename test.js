import test from 'tape'
import {characterEntitiesHtml4} from './index.js'

test('characterEntitiesHtml4', function (t) {
  t.equal(characterEntitiesHtml4.AElig, 'Æ')
  t.equal(characterEntitiesHtml4.aelig, 'æ')
  t.equal(characterEntitiesHtml4.amp, '&')
  t.equal(characterEntitiesHtml4.apos, undefined)

  t.end()
})
