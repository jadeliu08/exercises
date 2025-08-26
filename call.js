Function.prototype.myCall = function (context) {
	var newContext = context || globalThis;
	newContext.fn = this;
	var args = [];
	for(var i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']');
	}
	var result = eval('newContext.fn(' + args + ')');
	delete newContext.fn;
	return result;
}

// 测试一下
var value = 2;

var obj = {
	value: 1
}

function bar(name, age) {
	console.log(this.value);
	return {
		value: this.value,
		name: name,
		age: age
	}
}

bar.myCall(null); // 2

console.log(bar.myCall(obj, 'kevin', 18));