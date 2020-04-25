// CAll / Apply와 데코레이터와 포워딩

function slow(x) {
  console.log(`slow(${x})를 호출`);
  return x;
}

/**
 * cachingDecorator처럼 인수로 받은 함수의 행동을 변화시켜주는 함수를 데코레이터라한다.
 * 모든 함수를 대상으로 cachingDecorator를 호출가능하고, 이때 반환하는 것이 캐싱 래퍼다.
 * cachingDecorator를 활용하면 캐싱이 가능한 함수를 원하는 만큼 구현이 가능하다.
 *
 * 캐싱 관련 코드를 함수 코드와 분리할수 있기 때문에 코드가 간결하다는 장점도 있다.
 *
 */
function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      //cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 리턴
    }
    let result = func(x);
    cache.set(x, result);
    return result;
  };
}

// slow = cachingDecorator(slow);
// console.log(slow(1));
// console.log(`다시 호출: ${slow(1)}`);

// console.log(slow(2));
// console.log(`다시 호출: ${slow(2)}`);

// func.call을 사용해서 컨텍스트 지정
let worker = {
  someMethod() {
    return 1;
  },
  slow(x) {
    console.log(`slow(${x})를 호출`);
    return x * this.someMethod(); // (*)
  },
};

function cachingDecorator2(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // 이 부분에서의 래퍼가 this가 undefined가 되어서 에러
    cache.set(x, result);
    return result;
  };
}

// console.log(worker.slow(1));
// worker.slow = cachingDecorator2(worker.slow); // 캐싱 데코레이터 적용
// console.log(worker.slow(2)); this.someMethod에 접근이 안되어서 에러

// 아래도 비슷한 증상

// let func = worker.slow;
// func(2);

// 위의 증상들을 해결하려면 func.call(context, ...args)를 사용해야한다.
/**
 * this를 명시적으로 고정해 함수를 호출할 수 있게 해주는 내장 함수 메소드다.
 * func.call(context, args1, arg2, ...)
 * func(1, 2, 3)
 * func.call(obj, 1, 2, 3) - this가 obj로 고정된다.
 */

function test() {
  console.log(this.name);
}

let user = {name: 'John'};
let admin = {name: 'Admin'};

// call을 사용해서 원하는 객체가 'this'가 되도록 한다.
test.call(user); // this = John
test.call(admin); // this = admin

function say(phrase) {
  console.log(`${this.name} : ${phrase}`);
}

// this에는 user가 고정, 첫 인수는 'Hello'가 들어간다.
say.call(user, 'Hello');

// 래퍼 안에서 call을 사용해 컨텍스트를 원본 함수로 전달하면 에러가 발생하지 않는다.
function cachingDecorator3(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // this를 전달
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator3(worker.slow); // 캐싱 데코레이터 적용

console.log(worker.slow(2));
console.log(worker.slow(2)); // 원본 함수를 호출하지 않고 캐시 된 값 출력

/**
 * 1. 데코레이터를 적용 후에 worker.slow가 래퍼 function(x) { ... }가 된다.
 * 2. worker.slow(2)를 실행하면 래퍼는 2를 인수로 받고, this=worker가 된다.
 * 3. 결과가 캐시되지 않은 상황이면 func.call(this, x)에서 현재 this(=worker)와 인수 (=2)를 원본 메소드로 전달한다.
 */

// func.apply로 여러 인수 전달하기
let worker2 = {
  slow(min, max) {
    return min + max; // cpu를 많이 사용하는 작업이라 가정
  },
};

// 동일한 인수를 전달했을 때 호출 결과를 기억할 수 있어야한다.
function cachingDecorator4(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments);

    cache.set(key, result);
    return result;
  };
}

// function hash(args) {
//   return `${args[0]}, ${args[1]}`;
// }

worker2.slow = cachingDecorator4(worker2.slow, hash);

// console.log(worker2.slow(3, 5));
// console.log(worker2.slow(3, 5));

/**
 * func.apply(context, args)
 * apply는 func의 this를 context로 고정하고, 유사 배열 객체인 args를 인수로 사용할 수 있게 해준다.
 * call과 apply의 차이는 call이 복수 인수를 따로따로 받는 대신 apply는 인수를 유사 배열 객체로 받는 다는 점이다.
 *
 * 아래 두 줄은 같은 역할을 한다.
 * func.call(context, ...args);
 * func.apply(context, args);
 *
 * spread syntax ... 은 이터러블 args를 분해해서 call에 전달 할 수 있게 해준다.
 * apply는 오직 유사 배열 형태의 args만 받는다.
 *
 * 위의 두 차이만 빼면 완전히 동일하게 동작한다.
 */
let wrapper = function () {
  return func.apply(this, arguments);
};

// 메소드 빌리기
function hash() {
  // args.join()은 args가 배열이아니고 유사 배열 객체라서 호출 시 에러가 발생한다.
  console.log([].join.call(arguments));
}
hash(1, 2, 3, 4, 5);

/**
 * 데코레이터와 함수 프로퍼티
 * 함수나 메소드에 데코레이터로 감싸 대체하는것이 대체적으로 안전하지만 원본 함수에 func.calledCount 등의
 * 프로퍼티가 있는 경우에 데코레이터를 적용한 함수에서 프로퍼티를 사용할 수 없으므로 안전하지 않다.
 * 함수에 프로퍼티가 있는 경우에는 데코레이터 사용에 주의해야한다.
 * 위 예시인 cachingDecorator(slow)는 호출 결과 래퍼에 프로퍼티가 없어서 문제가 없다.
 * 언급한 문제를 해결하는 함수 프로퍼티에 접근할 수 있게 만드는 데코레이터도 만드는 방법이 있다.
 * 이걸 구현하려면 Proxy라는 특별한 객체를 사용해서 함수를 감싸야한다.
 */

/**
 * 요약
 * 데코레이터는 함수를 감싸는 래퍼로 함수의 행동을 변화시킨다.
 * 주요 기능은 함수에서 처리하고 함수에 추가된 기능정도로 보면된다.
 * 하나 혹은 여러 개의 데코레이터를 추가해도 함수의 코드는 변하지 않는다.
 */

/* 과제
 * 1. Spy decorator
 * 모든 호출을 호출 속성에 저장하는 래퍼를 리턴하는 spy(func)를 작성해라
 * 모든 호출은 인수 배열로 저장된다.
 */

function work(a, b) {
  console.log(a + b);
}

work = spy(work);
function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];
  return wrapper;
}

work(1, 2); // 3
work(4, 5); // 9
work(6, 7);
console.log(work.calls);

for (let args of work.calls) {
  console.log(`call: ${args.join()}`); // call: 1, 2, call: 4,5
}

/**
 * 과제 2: Delaying decorator
 * Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.
 */

function f(x) {
  console.log(x);
}

// create wrappers
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);

function delay(func, ms) {
  return function () {
    setTimeout(() => func.apply(this, arguments), ms);
  };
}

// 아래 처럼도 가능
// let f1000 = delay(console.log, 1000);
// let f1500 = delay(console.log, 1500);

// f1000('test'); // shows "test" after 1000ms
// f1500('test2'); //shows "test2" after 1500ms

/**
 * 과제 3: Debounce decorator
 * Debounce(f, ms)데코레이터의 결과는 ms당 최대 한번 호출을 f로 전달하는 래퍼여야함
 * 디바운스 된 함수를 호출하면 이전 호출 후 ms 밀리 초보다 짧은 함수는 모두 무시
 */
let d_func = debounce(console.log, 1000);
d_func(1); // runs immediately
d_func(2); // ignored
function debounce(func, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    func.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}

// setTimeout(() => d_func(3), 100); // ignored ( only 100 ms passed )
// setTimeout(() => d_func(4), 1100); // runs
// setTimeout(() => d_func(5), 1500); // ignored (less than 1000ms from the last run) - 마지막 실행에서 1000ms 미만

/**
 * 과제 4: Throttle decorator
 * throttle(f ,ms)는 ms 당 최대 한번 호출을 f로 전달하는 래퍼를 리턴
 * cooldown 기간 동안의 떨어진 호출들은 모두 무시
 * 앞의 디바운스와의 차이는 만약에 무시된 호출이 지난 쿨다운 동안 마지막 호출이라면, 딜레이가 끝날 때 실행이 된다.
 *
 */
function t_func(a) {
  console.log(a);
}

let f1000 = throttle(f, 1000);

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      console.log(arguments);
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
console.log('-------');
/**
 * 콘솔로 찍어보면 알다시피 f1000(1)이 실행되고 바로 f1000(2), f1000(3)으로 실행되어서
 * savedArgs와 savedThis에 먼저 2에 해당하는 값들이 들어갔다가, 마지막으로 3에 해당하는 값이 들어가서
 * 쿨다운 동안 무시된 호출의 마지막이 (3)에 해당해서 콘솔에는 1, 3이 찍히고 2가 무시된다.
 */
f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)
