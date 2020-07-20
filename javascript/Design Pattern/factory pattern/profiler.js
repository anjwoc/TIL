// function createImage(name) {
//   return new Image(name);
// }

// const image = createImage('photo.img');

// function createImage(name) {
//   if (name.match(/\.jpeg$/)) {
//     return new JpegImage(name);
//   } else if (name.match(/\.gif$/)) {
//     return new GifImage(name);
//   }
//   // ...etc
// }
// /**
//  * factory는 생성된 객체의 생성자를 노출하지 않고 객체를 확장하거나 수정하지 못하도록 한다.
//  *
//  * 캡슐화를 강제하기 위한 메커니즘
//  * 팩토리는 클로져 덕분에 캡슐화 메커니즘도 사용할 수 있다.
//  */

// function createPerson(name) {
//   const privateProperties = {};

//   const person = {
//     setName: (name) => {
//       if (!name) throw new Error('A person must have a name');
//       privateProperties.name = name;
//     },
//     getName: () => {
//       return privateProperties.name;
//     },
//   };

//   person.setName(name);
//   return person;
// }

// /**
//  * 간단한 코드 프로파일러 작성
//  * 프로파일링 세션을 시작시키는 start 메소드
//  * 세션을 종료하고 실행 시간을 콘솔에 기록하는 end 메소드
//  */

class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime();
  }

  end() {
    const diff = process.hrtime(this.lastTime);
    console.log(`Timer ${this.label} took ${diff[0]} seconds and ${diff[1]} nanoseconds.`);
  }
}

/**
 * Profiler의 생성을 추상화 하기 위해 팩토리를 사용할 수 있다.
 * 개발 모드라면 완전한 기능을 갖춘 프로파일러 객체를 리턴
 * 배포 모드라면 start와 end가 빈 mock객체를 리턴
 */

module.exports = function (label) {
  if (process.env.NODE_ENV === 'development') {
    return new Profiler(label);
  } else if (process.env.NODE_ENV === 'production') {
    return {
      start: () => {},
      end: () => {},
    };
  } else {
    throw new Error('Must set NODE_ENV');
  }
};
