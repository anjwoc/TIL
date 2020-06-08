function spider(url, nesting, callback) {
  const filename = util.urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, body) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      return download(url, filename, (err, body) => {
        if (err) {
          return callback(err);
        }
        spiderLinks(url, body, nesting, callback);
      });
    }

    spiderLinks(url, body, nesting, callback);
  });
}

function spiderLinks(curUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  // getPageLinks는 함수를 통해 페이지의 모든 링크 목록을 가져온다.
  const links = util.getPageLinks(curUrl, body);
  // 링크들을 반복하는 함수
  function iterate(idx) {
    if (idx === links.length) {
      return callback;
    }

    spider(links[idx], nesting - 1, err => {
      if (err) {
        return callback(err);
      }

      iterate(idx + 1);
    });

    iterate(0);
  }
}

// 패턴
function iterate(idx) {
  if (idx === tasks.length) {
    return finish();
  }
  const task = tasks[idx];
  task(() => {
    iterate(idx + 1);
  });
}

function finish() {
  // 반복 작업이 완료된 후 처리
}
iterate(0);
