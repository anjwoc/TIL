const arr = [1, 2, 3];

// push, pop은 스택에서 넣고 빼는 동작과 비슷하고
arr.push(4);
arr.pop();

// unshift와 shift는 큐에서의 동작과 비슷
arr.unshift(5);
arr.shift();

// concat 메소드
// arr을 분해해서 인자로 들어온 배열을 추가한 결과를 반환
tmp = arr.concat([7, 8, 9]);
console.log(tmp);

// splice
// 임의의 위치에 요소를 추가 or 삭제
const arr2 = [1, 5, 7];
arr2.splice(1, 0, 2, 3, 4);
console.log(arr2);

// copyWithin
// 배열 요소를 복사해서 다른 위치에 붙여넣고, 기존의 요소를 덮어쓴다.

const arr3 = [1, 2, 3, 4];
console.log(arr3.copyWithin(1, 2, 3));
console.log(arr3.copyWithin(1, 2));
