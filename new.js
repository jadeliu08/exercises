function myNew(func, ...args) {
	var obj = {};
	obj.__proto__ = typeof func.prototype === 'object' ? func.prototype : Object.prototype;
	debugger;
	var result = func.apply(obj, args);
	return result !== null && typeof result === 'object' ? result : obj;
}