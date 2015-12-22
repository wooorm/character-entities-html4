/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities-html4
 * @fileoverview Test suite for `character-entities-html4`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var characterEntities = require('./');

/*
 * Tests.
 */

test('characterEntities', function (t) {
    t.equal(characterEntities.AElig, 'Æ');
    t.equal(characterEntities.aelig, 'æ');
    t.equal(characterEntities.amp, '&');
    t.equal(characterEntities.apos, undefined);

    t.end();
});
