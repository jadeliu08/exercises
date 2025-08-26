'use strict';
// 严格模式下，实参和arguments不共享
function say(name, age) {
	name = 'rename name';
	console.log('name', name, 'age', age);
	console.log('arguments', arguments[0], arguments[1]);
}

const name = 'jadessss';
say(name, 33);
// boolean、number、string、undefined、null、object