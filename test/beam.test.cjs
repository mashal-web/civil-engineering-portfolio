const test = require("node:test");
const assert = require("node:assert/strict");
const { calculatePointLoadReactions } = require("../dist/src/shared/beam.js");
test("centered point load reactions and peak moment", () => {
  assert.deepEqual(calculatePointLoadReactions({ spanM: 10, loadKN: 20, distanceM: 5 }), { leftReactionKN: 10, rightReactionKN: 10, maxMomentKNm: 50 });
});
test("off-center point load satisfies vertical force equilibrium", () => {
  const result = calculatePointLoadReactions({ spanM: 8, loadKN: 24, distanceM: 2 });
  assert.equal(result.leftReactionKN + result.rightReactionKN, 24);
  assert.equal(result.maxMomentKNm, 36);
});
test("rejects load outside span", () => {
  assert.throws(() => calculatePointLoadReactions({ spanM: 8, loadKN: 24, distanceM: 9 }), /between the supports/);
});
test("rejects invalid span and negative load", () => {
  assert.throws(() => calculatePointLoadReactions({ spanM: 0, loadKN: 1, distanceM: 0 }), /Span/);
  assert.throws(() => calculatePointLoadReactions({ spanM: 8, loadKN: -1, distanceM: 2 }), /Load/);
});
