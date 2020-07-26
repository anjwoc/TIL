// 공개 생성자
const promise = new Promise((resolve, reject) => {
  // ...
});

// 읽기 전용 이벤트 이미터(Roee - Read only event emit)
const EventEmitter = require('events');

module.exports = class Roee extends EventEmitter {
  constructor(executor) {
    super();
    const emit = this.emit.bind(this);
    this.emit = undefined;
    executor(emit);
  }
};

// 다른 파일에서 사용할 때
//  const Roee = require('/roee');

const ticker = new Roee(emit => {
  let tickCount = 0;
  setInterval(() => emit('tick', tickCount++), 1000);
});
// module.exports = ticker;

// const ticker_external = require('./ticker');
ticker.on('tick', tickCount => console.log(tickCo, 'TICK'));
// ticker.emit('something', {}); 에러 발생
