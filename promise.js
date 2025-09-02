const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

class MyPromise {
	#status = STATUS.PENDING;
	#value = undefined;
	#reason = undefined;
	#onCallbacks = [];

	constructor(executor) {
		const resolve = (value) => {
			if (this.#status === STATUS.PENDING) {
				this.#status = STATUS.FULFILLED;
				this.#value = value;
				this.#onCallbacks.forEach(({onResolved}) => {
					onResolved(this.#value);
				});
			}
		}
		const reject = (reason) => {
			if (this.#status === STATUS.PENDING) {
				this.#status = STATUS.REJECTED;
				this.#reason = reason;
				this.#onCallbacks.forEach(({onRejected}) => {
					onRejected(this.#reason);
				});
			}
		}
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	then(onResolved, onRejected) {
		const that = this;
		const promise2 = new MyPromise((resolve, reject) => {
			if (that.#status === STATUS.FULFILLED) {
				const x = onResolved(this.#value);
				resolvePromise(promise2, x, resolve, reject);
			}
			if (that.#status === STATUS.REJECTED) {
				const x = onRejected(this.#reason);
				resolvePromise(promise2, x, resolve, reject);
			}
			if (that.#status === STATUS.PENDING) {
				this.#onCallbacks.push({
					onResolved: (value) => {
						const x = onResolved(value);
						resolvePromise(promise2, x, resolve, reject);
					},
					onRejected: (reason) => {
						const x = onRejected(reason);
						resolvePromise(promise2, x, resolve, reject);
					}
				});
			}
		});
		return promise2;
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	static resolve = function (value) {
		return new MyPromise((resolve) => {
			resolve(value);
		});
	}

	static reject = function (reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason);
		});
	}

	static race = function (promises) {
		return new MyPromise((resolve, reject) => {
			for (var i = 0; i < promises.length; i++) {
				promises[i].then(resolve, reject);
			}
		});
	}

	static all = function (promises) {

	}
}

function isObject(val) {
	return val !== null && typeof val === 'object';
}

function isFunction(val) {
	return typeof val === 'function';
}

function isThenable(val) {
	return (isObject(val) || isFunction(val)) && isFunction(val.then);
}

function resolvePromise(promise, x, resolve, reject) {
	if (isThenable(x)) {
		if (x === promise) {
			return reject(new TypeError('Chaining cycle detached for promise'));
		}
		x.then(resolve, resolve);
	}
	resolve(x);
}
