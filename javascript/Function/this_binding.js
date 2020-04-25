// 객체의 메소드 호출 시 this 바인딩

const func1 = {
  name: 'a',
  sayHello: function () {
    console.log(this.name);
  },
};

const func2 = {
  name: 'b',
};

func2.sayHello = func1.sayHello;

/**
 * 두 메소드가 sayHello호출 시에 this는 func1, func2 객체가 된다.
 * 즉 자기 자신을 호출한 객체의 this에 바인딩 되기때문에 해당 객체의 name 값이 출력된다.
 */
func1.sayHello();
func2.sayHello();

// 함수를 호출할 때 this 바인딩
/**
 * 자바스크립트에서 함수를 호출하면, 해당 함수 내부코드에서 사용된 this는 전역 객체에 바인딩된다.
 * 브라우저에서는 window객체
 */
const c = 'asdf';
const test1 = function () {
  console.log(this.c);
};

test1();
