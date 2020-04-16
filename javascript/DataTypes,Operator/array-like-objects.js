const arr = ['bar'];
const obj = {
    name: 'foo',
    lenght: 1
};

arr.push(2);
console.log(arr);

// 유사 배열 객체에서 표준 어레이 메소드를 사용하려면
// apply메소드를 이용해야한다.
Array.prototype.push.apply(obj, ['asdf']);
console.log(obj)

/**
 * 출력
 * [ 'bar', 2 ]
 * { '0': 'asdf', name: 'foo', lenght: 1, length: 1 }
 */