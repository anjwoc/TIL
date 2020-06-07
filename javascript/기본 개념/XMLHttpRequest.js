// onreadystatechange
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  // 요청에 대한 콜백
  if (xhr.response === xhr.DONE) {
    // 요청이 완료되면
    console.log(xhr.response);
  } else {
    console.error(xhr.responseText);
  }
};

xhr.open('GET', 'https://www.zerocho.com/api/get'); // 메소드와 주소 설정
xhr.send(); // 요청 전송

// onload 예시
var xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (xhr.status === 200 || xhr.status === 201) {
    console.log(xhr.responseText);
  } else {
    console.error(xhr.responseText);
  }
};
xhr.open('GET', 'https://www.zerocho.com/api/get?name=zerocho');
xhr.send();

// post 요청 예시, 주로 JSON이나 FormData를 body에 실어 보낸다.
var xhr = new XMLHttpRequest();
var data = {
  name: 'a',
  age: 1,
};

xhr.onload = function () {
  if (xhr.status === 200 && xhr.status === 201) {
    console.log(xhr.responseText);
  } else {
    console.error(xhr.responseText);
  }
};

xhr.open('POST', 'https://www.zerocho.com/api/post/json');
xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠 타입을 json으로
xhr.send(JSON.stringify(data));
