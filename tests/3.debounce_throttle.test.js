const assert = require("assert");
const { debounce, throttle } = require("../solutions/3.debounce_throttle");

describe("debounce", function () {
  it("should debounce a function", function (done) {
    var callCount = 0;

    var debounced = debounce(function (value) {
      ++callCount;
      return value;
    }, 32);

    var results = [debounced("a"), debounced("b"), debounced("c")];
    assert.deepStrictEqual(results, [undefined, undefined, undefined]);
    assert.strictEqual(callCount, 0);

    setTimeout(function () {
      assert.strictEqual(callCount, 1);

      var results = [debounced("d"), debounced("f")];
      assert.deepStrictEqual(results, [undefined, undefined]);
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function () {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });
});

describe("throttle", function () {
  it("should throttle a function", function (done) {
    var callCount = 0,
      throttled = throttle(function () {
        callCount++;
      }, 32);

    throttled();
    throttled();
    throttled();

    var lastCount = callCount;
    assert.strictEqual(callCount, 0);

    setTimeout(function () {
      // assert.ok(callCount > lastCount);
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });
});
