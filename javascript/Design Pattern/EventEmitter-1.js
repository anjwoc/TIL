const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

function findPattern(files, regex) {
  const emitter = new EventEmitter();
  files.forEach(file => {
    fs.readFile(file, 'utf8', (err, content) => {
      if (err) return emitter.emit('error', err);

      emitter.emit('fileread', content);
      let match;
      if ((match = content.match(regex))) match.forEach(elem => emitter.emit('found', file, elem));
    });
  });

  return emitter;
}

// 아래와 같은 방식으로 사용 가능
findPattern(['fileA.txt', 'fileB.json'], /hello \w+/g)
  .on('fileread', file => console.log(file + 'was read'))
  .on('found', (file, match) => console.log('Matched ' + match + 'in file' + file))
  .on('error', err => console.log('Error emitted: ' + err.message));

// 관찰 가능한 객체 만들기
class FindPattern extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.files.forEach(file => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) return this.emit('error', err);

        this.emit('fileread', file);

        let match = null;
        if ((match = content.match(this.regex))) {
          match.forEach(e => this.emit('found', file, e));
        }
      });
    });

    return this;
  }
}

const findPatternObj = new FindPattern(/hello \w+/);
findPatternObj
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .find()
  .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`))
  .on('error', err => console.log(`Error emitted ${err.message}`));
