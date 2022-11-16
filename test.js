import assert from 'node:assert/strict'
import test from 'node:test'
import {characterEntitiesHtml4} from './index.js'

test('characterEntitiesHtml4', function () {
  assert.equal(characterEntitiesHtml4.AElig, 'Æ')
  assert.equal(characterEntitiesHtml4.aelig, 'æ')
  assert.equal(characterEntitiesHtml4.amp, '&')
  assert.equal(characterEntitiesHtml4.apos, undefined)
})
