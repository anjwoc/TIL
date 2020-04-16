log = console.log;

log(sub(2, 3));

// 아래처럼 함수 선언문으로 생성하면 호이스팅이 되지만
// function sub(a, b) {
//   return a - b;
// }

// 아래처럼 함수 표현식으로 생성하면 호이스팅이 되지 않는다.
const sub = (x, y) => {
  return x - y;
};

log(sub(4, 3));
