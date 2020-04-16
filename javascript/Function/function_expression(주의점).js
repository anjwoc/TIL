
/**
 * 아래 코드가 에러가 발생하는 이유는 세미콜론을 붙이지 않아서다.
 * return 42가 끝난 다음 라인에서 즉시 실행 함수를 만들어서 function called라는 문자열을 출력도록 만들고
 * (function() {
 * })(); 의 형태로 바로 실행되게끔 해놨다.
 * 하지만 문제점은
 * const func = function() {
 *  return 42;
 * } 이 부분에서 세미콜론을 찍지 않아서
 * 자바스크립트 파서가 func()의 함수 정의 끝에 중괄호만으로 함수가 끝났다고 판단하지 않는다.
 * 그래서 이후 괄호에 둘러쌓인 즉시 실행 함수를 보고 func()함수 호출 연산으로 판단하고
 * func()함수를 호출해서 결론적으로 42();의 형태가 된다.
 * 그래서 42는 함수가 아니기 때문에 TypeError: (intermediate value)(...) is not a function라는 에러가 발생한다.
 */

const func = function () {
    return 42;
}(function () {
    console.log("function called");
})();
