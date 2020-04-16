// == 와 === 의 차이
const a = 1;
const b = '1';
console.log(a == b); // True
console.log(a === b); // False
/**
 * ==(동등 연산자)
 * ===(일치 연산자)
 * == 연산자는 피연산자와 타입이 다르면 타입변환을 한 후에 비교하고
 * === 연산자는 타입이 달라도 변경하지 않고 비교한다
 */


//  ! 과 !!의 차이
// !!은 피연산자를 Boolean으로 변환시킨다.
console.log(!!0)
console.log(!!1)
console.log(!!'String')