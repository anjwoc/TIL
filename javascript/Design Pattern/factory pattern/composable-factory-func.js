/**
 * 합성가능한(Composable) 팩토리 함수
 * 복잡한 클래스 계층 구조를 만들지 않아도 상속을 하는데 굉장히 유용하다.
 *
 * 조합 가능한 팩토리 함수를 사용할 예정이며, 특히 stampint 모듈에서 정의한 stamp 스펙을 사용함
 * 이 모듈은 새로운 팩토리 함수들을 만들기 위해 함께 구성할 수 있는 팩토리 함수들을 정의하기 위한 직관적인 인터페이스를 제공한다.
 *
 */

const stampit = require('stampit');

const character = stampit().props({
  name: 'anonymous',
  lifePoints: 100,
  x: 0,
  y: 0,
});

const c = character();
c.name = 'John';
c.lifePoints = 10;
console.log(c);

const mover = stampit().methods({
  move(xIncr, yIncr) {
    this.x += xIncr;
    this.y += yIncr;
    console.log(`${this.name} moved to [${this.x}, ${this.y}]`);
  },
});

const slasher = stampit.methods({
  slash(direction) {
    console.log(`${this.name} slashed to the ${direction}`);
  },
});

const shooter = stampit()
  .props({
    bullets: 6,
  })
  .methods({
    shoot(direction) {
      if (this.bullets > 0) {
        if (this.bullets > 0) {
          --this.bullets;
          console.log(`${this.name} shoot to the ${direction}`);
        }
      }
    },
  });

const runner = stampit.compose(character, mover);
const samurai = stampit.compose(character, mover, slasher);
const sniper = stampit.compose(character, shooter);
const gunslinger = stampit.compose(character, mover, shooter);
const westernSamurai = stampit.compose(gunslinger, samurai);

const gojiro = westernSamurai();
gojiro.name = 'Gojiro Kiryu';
gojiro.move(1, 0);
gojiro.slash('left');
gojiro.shoot('right');

/**
 * 실전에서 사용되는 예제
 * Dnode(Node.js용 원격 프로시저 호출(RPC) 시스템)
 * Restify(Rest api를 만들기 위한 프레임 워크)
 *
 */
