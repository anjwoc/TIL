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

// 직접 만드는 모듈 로더
function loadModule(filename, module, require) {
  const wrapperSrc = `(function(module, exports, require){
    ${fs.readFileSync(filename, 'utf8')}
  })(module, module.exports, require)`;
  eval(wrapperSrc);
}
