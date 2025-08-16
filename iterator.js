var iteratorObj = {
  value: [11, 22, 44, 66, 77],

  [Symbol.iterator]() {
    let _currentIndex = 0;
    return {
      next() {
        const value = iteratorObj.value[_currentIndex];
        const done = _currentIndex === iteratorObj.value.length;
        _currentIndex++;
        return {value, done}
      },
      return() {

      },
      throw() {

      },
    }
  }
};


function* source() {
  yield 1;
  yield 2;
  yield 3;
}

var generator = source();
for (let value of generator) {
  console.log(value);
}



for (let i of iteratorObj) {
  console.log(i);
}