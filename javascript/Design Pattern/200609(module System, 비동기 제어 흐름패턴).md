## 노출식 모듈 패턴

자바스크립트의 주요 문제점 중 하나는 네임스페이스가 없다는 점이다. 전역 범위에서 실행되는 프로그램은 내부 어플리케이션과 종속된 라이브러리 코드의 데이터들로 인해 충돌이 발생할 수 있다. 이 문제를 해결하기 위해 나온 기법이 노출식 모듈 패턴

```jsx
const modules = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})();
console.log(modules);
```

이 패턴은 자기 호출 함수를 사용해서 private 범위를 만들어서 공개될 범위만 익스포트한다. 이렇게되면 익스포트한 부분만 외부에서 접근이 가능하고 나머지는 접근이 불가능하다. 이 패턴의 사상이 Node.js 모듈 시스템의 기반으로 사용된다.

module.exprorts 변수에 할당하지 않는 한, 모듈 내부의 모든 항목은 private이라는 것이 기억해야 할 핵심 개념

## module.exports vs exports

변수 exports는 module.exports의 초기 값에 대한 참조일 뿐이다. 이 값은 본질적으로 모듈이 로드되기 전의 간단한 객체 리터럴이다. 

### require 함수는 동기적이다.

Node.js의 require() 함수는 동기적이다. direct style을 사용하여 모듈 내용을 반환하고 콜백이 필요하지 않다. 그러므로 module.exports에 대한 할당도 역시 동기적이다.

아래 코드는 올바르지 않은 코드의 예

```jsx
setTimeout(() => {
	module.exports = function() {};
}, 100);
```

위 코드는 몇가지 문제가 있다. 보통은 모듈을 정의할 때 동기적인 코드를 사용하는데 모듈을 비동기적으로 초기화해야 하는 과정이 필요한 경우에는 모듈이 미래 시점에 비동기적으로 초기화되기 때문에 미처 초기화되지 않은 모듈을 정의하고 익스포트 할 수도 있다.

## 해결 알고리즘

의존성 지옥이란 용어는 소프트웨어의 의존성이 서로 공통된 라이브러리들을 의존하지만 호환되지 않는 서로 다른 버전을 필요로 하는 상황을 나타낸다. Node.js는 모듈을 로드되는 위치에 따라 다른 버전의 모듈을 로드할 수 있또록 해서 이 문제를 해결한다.

`이 부분 그림은 나중에 정리`

## 모듈 캐시

## 순환 의존성

# 콜백을 사용한 비동기 제어 흐름 패턴

## 콜백 규칙

1. 비동기 코드를 작성할 때 명심해야 할 첫 번째 규칙은 콜백을 정의할 때 함부로 클로저를 사용하지 않는 것
    - 대부분의 경우는 콜백 헬 문제를 해결하기 위해서 어떤 라이브러리나 멋진 기술이 필요한게 아니고 일반적인 상식이면 충분하다.
2. 다음은 중첩 수준을 낮게 유지하고 일반적으로 코드 체계를 개선하는데 도움이 되는 몇 가지 기본 원칙
    1. 가능한 빨리 종료, 문맥에 따라 return, continue or break를 사용해서 if ... else을 모두 작성하는 대신 현재 문을 즉시 종료할 수 있다. 이렇게 하면 코드는 얕게 유지하는데 도움이 된다.
    2. 콜백을 위해 명명된 함수를 생성하여 클로저 바깥에 배치하여 중간 결과를 인자로 전달한다. 함수의 이름을 지정하면 stack trace에서 더 잘 보이게된다.
    3. 코드를 모듈화 해야 한다. 가능한 코드를 작고 재사용 가능한 함수들로 분할해라

### 첫 번째 최적화로 간단하게 else문을 제거해서 개선하기

아래 코드를 else문을 제거해서 개선할 수 있다.

```jsx
if (err) {
  callback(err);
} else {
  // 오류가 없을 때 실행할 코드
}
```

else문을 없애고 오류가 발생한 경우에 바로 return 해준다.

```jsx
// 다음과 같은 코드로 개선이 가능
if (err) {
  return callback(err);
}

// 오류가 없을 때 실행할 코드
```

위와 같은 수준의 트릭으로도 중첩 수준을 줄일 수 있음

### 두 번째 최적화로 재사용 가능한 코드를 구분할 수 있다.

```jsx
/* 두 번째 최적화 재사용 가능한 코드를 구분하기 */
function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloading and saved: ${url}`);
      callback(null, body);
    });
  });
}

function spider(url, callback) {
  const filename = util.urlToFilename(url);
  fs.exists(filename, exists => {
    if (exists) {
      return callback(null, filename, false);
    }
    download(url, filename, err => {
      if (err) {
        return callback(err);
      }
      callback(null, filename, true);
    });
  });
}
```

## 순차 실행

일련의 작업을 순차적으로 실행하는 것을 한 번에 하나씩 실행하는 것을 의미한다. 

- 시작
- task1
- task2
- task3
- 끝