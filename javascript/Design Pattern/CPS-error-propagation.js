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

function readJSONThrows(filename, callback) {
  // 이 함수에서는 JSON.parse에서 발생하는 예외를 잡을 방법이 없다.
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
}

try {
  readJSONThrows('nonJSON.txt', (err, data) => {
    // ...
  });
} catch (err) {
  console.error(err);
}
