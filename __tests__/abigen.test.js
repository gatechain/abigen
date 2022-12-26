"use strict";

const abigen = require("../lib/abigen");
const assert = require("assert").strict;

assert.strictEqual(abigen(), "hahah");
console.info("abigen tests passed");
