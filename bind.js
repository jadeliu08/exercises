Function.prototype.myBind = function (context) {
	var fn = this;
	var args1 = Array.prototype.slice.call(arguments, 1);
	var bindFn = function () {
		var args2 = Array.prototype.slice.call(arguments, 1);
		const args3 = args1.concat(args2);
		return fn.apply(context || window, args3);
	};
	bindFn.prototype = Object.create(fn.prototype);
	return bindFn;
}

function say() {
}

say.myBind({ value: 1}, { name: 111})(1,2);