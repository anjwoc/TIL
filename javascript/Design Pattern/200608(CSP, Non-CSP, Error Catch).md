## 연속 전달 방식(The Continuation-Passing Style)

Javascript에서 콜백은 다른 함수에 인자로 전달되는 함수이고, 작업이 완료되면 결과로 호출된다. 함수형 프로그래밍에서는 이런 전달 방식을 연속 전달 방식(CPS)라고 부른다. 항상 비동기와 관련된 부분은 아니고 단순하게 결과를 직접 반환하는 것이 아닌 다른 함수(콜백)으로 전달하는 방식을 말한다.

### 동기식 전달 방식

```jsx
function add(a, b){
	return a+b;
}
```

일반적으로 이미 아는 형태로 return문으로 직접 반환 하는 형태

### 연속 전달 방식

```jsx
function add(a, b, callback){
	callback(a+b);
}
```

연속 전달 방식(CPS)로 바꾼 구현 코드는 인자로 callback을 추가하고 return 대신 callback의 인자로 전달해주면서 반환한다. 이런 방식은 add 함수가 동기화된 CPS함수로 콜백이 완료될 때만 값이 반환된다.

```jsx
console.log('before');
add(1, 2, result => console.log('Result: ' + result));
console.log('after');

before
result: 3
after
```

### 비동기 연속 전달 방식

아래와 같은 add 함수가 있는 경우를 생각해보자

```jsx
function additionAsync(a, b, callback){
	setTimeout(() => callback((a+b), 100);
}

console.log('before');
addtionAsync(1, 2, result => console.log('Result: ' + result));
console.log('after');
```

setTimeout()을 사용해서 비동기 호출을 한 모습이다. 위 코드에서 작업 순서가 어떻게 되는지 살펴보자.

setTimeout은 비동기 작업을 실행시키기 때문에 콜백의 실행이 끝날 때 까지 기다리지 않고 바로 즉시 반환된다. 그 후에 addtionAsync에 제어권을 돌려주고 제어가 호출자에게 반환된다. Node.js의 이 속성은 비동기 요청이 전달된 후 즉시 제어를 이벤트 루프에 돌려줘서 큐(대기열)에 있는 새로운 이벤트가 처리될 수 있도록 하기 때문에 매우 중요하다.

간단 요약

1. setTimeout 실행 → 콜백이 끝나기를 기다리지 않고 즉시 반환
2. addtionAsync로 제어를 돌려주고 제어가 호출자에게 반환
3. Node.js에서는 이 속성으로 비동기 요청이 전달된 후 즉시 제어를 이벤트 루프에 돌려주고 큐 대기열에 있는 처리되지 않은 혹은 이후의  새로운 이벤트를 처리할 수 있도록한다.
4. 이벤트가 처리되는 와중에 setTimeout의 시간이 끝나 실행될 준비가 되면 현재 처리중인 이벤트를 끝내고 callback이 실행된다.

### 작동 방식

1. console.log('before')
2. additionAsync(...) 제어 전환
3. setTimeout 호출
4. addtionAsync(...) 제어 전환
5. console.log('after') 제어 전환
6. 이벤트 루프로 제어 전환
7. 비동기 조작이 완료될 때 다시 callback(a+b)호출
8. console.log('Result: ' + result); 호출
9. callback(a+b) 제어 전환
10. 이벤트 루프로 제어 전환

동기 함수는 조작을 완료할 때 까지 블록하고, 비동기 함수는 제어를 즉시 반환하고 결과는 이벤트 루프의 다음 사이클에서 핸들러(이 경우에는 콜백)로 전달된다.

### 비 연속 전달 방식의 콜백

```jsx
const result = [1, 5, 7].map(e => e-1);
console.log(result); // [0, 4, 6]
```

함수에 콜백 인자가 있으면 무조건 함수가 비동기식이거나 연속 전달 스타일(CPS)를 사용하는 것은 아니다. 위의 케이스는 반복하는데 사용될 뿐  연산 결과를 전달하지 않는다. 콜백의 목적은 API 문서에 분명하게 명시가 된다.

process.nextTick()은 이벤트 루프의 다음 사이클까지 함수의 실행을 지연시킨다.
콜백을 인수로 취하여 대기 중인 I/O 이벤트 대기열의 앞으로 밀어 넣고 즉시 반환한다. 그러면 콜백은 이벤트 루프가 다시 실행되는 즉시 호출된다.

코드의 실행을 지연시키는 또 다른 API는 setImmediate()함수로 이 함수의 목적은 유사하지만 의미는 크게 다르다. process.nextTick()으로 지연된 콜백은 다른 I/O이벤트가 발생하기 전에 실행되지만, setImmediate()는 이미 큐에 있는 I/O 이벤트들의 뒤에 대기하게 된다.

process.nextTick()은 이미 예정된 I/O보다 먼저 실행 되서 재귀 호출과 같은 특정 상황에서는 I/O 기아(Starvation)을 발생시킬 수 있지만 setImmediate에서는 이런일이 생기지 않음

`process.nextTick()을 사용하여 실행을 연기함으로써 콜백이 비동기적 호출을 보장할 수 있다.`

## 오류를 전파하는 일반적인 패턴

```jsx
const fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      // 오류를 전달하고 현재 함수를 종료
      return callback(err);
    }

    try {
      // 파일의 내용을 해석
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }
    callback(null, parsed);
  });
}
```

### 캐치되지 않는 예외

readJSON을 보면 fs.readFile()함수 내 콜백에서 던져지는 예외를 피하기 위해서 JSON.parse에 try catch로 감쌌다. 비동기 콜백 내부에서 예외를 발생시키면 예외가 이벤트 루프로 이동해서 다음 콜백으로 전달되지 않는다. 이 상태는 Node.js에서는 회복 불능 상태고 어플리케이션은 종료되면서 stderr 인터페이스로 오류를 출력한다.

```jsx
function readJSONThrows(filename, callback) {
  // 이 함수에서는 JSON.parse에서 발생하는 예외를 잡을 방법이 없다.
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
}
```

아래 코드도 JSON.parse의 구문 분석에 대한 예외를 받지 못한다. 예외가 발생한 스택과 실행 스택이 다르기 때문이다. 

```jsx
try {
  readJSONThrows('nonJSON.txt', (err, data) => {
    // ...
  });
} catch (err) {
  console.error(err);
}
```