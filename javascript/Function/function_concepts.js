// 함수도 객체다.
function mul(x, y) {
  return x * y;
}
// mul 함수를 생성할 때 함수 코드는 함수 객체의 [[Code]]내부 프로퍼티에 자동으로 저장된다.

// 객체처럼 프로퍼티 추가 가능
// 일반 객체처럼 동적으로 생성한다.
mul.result = mul(3, 2);
mul.status = 'ok';

/**
 * 정리하면
 * [[Code]]: 함수 본문의 코드
 * ...add properties(추가되는 프로퍼티들)
 * ex) result: 추가된 프로퍼티
 *
 */

console.log(mul.result);

// Js에서 함수는 값으로 취급
/**
 * 리터럴에 의해 생성
 * 변수나 배열의 요소, 객체의 프로퍼티 등에 할당가능
 * 함수의 인자로 사용 가능
 * 함수의 리턴 값으로 사용 가능
 * 동적으로 프로퍼티를 생성 및 할당 가능
 * 위와 같은 특징이 있으면 일급 객체라고 한다.
 */

/**
 * 함수 객체의 기본 프로퍼티
 * 함수도 객체라고 했지만 함수는 일반적인 객체의 기능에서 추가로
 * 호출됐을 때 정의된 코드를 실행하는 기능을 가지고 있다.
 * 일반 객체와는 다르게 추가로 함수 객체만의 표준 프로퍼티가 있다.
 */
console.dir(mul);

/**
 * es5의 명세로는 모든 함수가 length와 prototype 프로퍼티를 가진다고 기술하낟.
 * 두 프로퍼티 이외에 name, caller, arguments, __proto__ 프로퍼티가 있다.
 * name: 함수의 이름(익명 함수의 경우는 빈 문자열)
 * caller: 자신을 호출한 함수
 * arguments: 함수를 호출할 때 전달된 인자 값
 * 모든 자바스크립트 객체는 자신의 프로토타입을 가리키는 [[Prototype]]이라는 내부 프로퍼티를 가진다.
 * __proto__: 크롬에서 [[Prototype]]이라는 내부 프로퍼티가 __proto__로 구현되어 있다.
 * 우리 코드에서 mul과 같이 함수 객체의 부모역할을 하는 프로토타입 객체를 Function.prototype 객체라 하고 이것 역시 함수 객체다.
 * 크롬 브라우저에서는 Function Prototype 객체를 Empty()함수라 하고있다.
 */

/**
 * Function.prototype 객체의 프로토타입 객체는?
 * 모든 객체의 조상격인 Object.prototype객체이다.
 * Function.Prototype 객체의 __Proto__ 프로퍼티는 Object.prototype을 가리키고 있다.
 */

// 함수 객체의 length 프로퍼티
// 함수가 정상적으로 실행될 때 기대되는 인자의 개수를 나타낸다.
function func0() {}
function func1(x) {
  return x;
}
function func2(x, y) {
  return x + y;
}

function func3(x, y, z) {
  return x + y + z;
}
console.log(
  `func0.len: ${func0.length} func1.len: ${func1.length} func2.len: ${func2.length} func3.len: ${func3.length}`,
);
