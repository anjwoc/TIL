/* 첫 번째 최적화 else문 제거해서 개선하기 */
if (err) {
  callback(err);
} else {
  // 오류가 없을 때 실행할 코드
}

// 다음과 같은 코드로 개선이 가능
if (err) {
  return callback(err);
}

// 오류가 없을 때 실행할 코드

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
