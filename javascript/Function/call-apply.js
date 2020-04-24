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

slow = cachingDecorator(slow);
console.log(slow(1));
console.log(`다시 호출: ${slow(1)}`);

console.log(slow(2));
console.log(`다시 호출: ${slow(2)}`);
