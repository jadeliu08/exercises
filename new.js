function myNew(func, ...args) {
	var obj = {};
	obj.__proto__ = typeof func.prototype === 'object' ? func.prototype : Object.prototype;
	var result = func.apply(obj, args);
	return result !== null && typeof result === 'object' ? result : obj;
}