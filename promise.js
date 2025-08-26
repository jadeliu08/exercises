const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

class Promise {
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
		const promise2 = new Promise((resolve, reject) => {
			if (that.#status === FULFILLED) {
				const x = onResolved(this.#value);
				resolvePromise(promise2, x, resolve, reject);
			}
			if (that.#status === REJECTED) {
				const x = onRejected(this.#reason);
				resolvePromise(promise2, x, resolve, reject);
			}
			if (that.#status === PENDING) {
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
}

Promise.resolve = function (value) {
	return new Promise((resolve) => {
		resolve(value);
	});
}

Promise.reject = function (reason) {
	return new Promise((resolve, reject) => {
		reject(reason);
	});
}

Promise.race = function (promises) {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < promises.length; i++) {
			promises[i].then(resolve, reject);
		}
	});
}

Promise.all = function (promises) {

}

function resolvePromise(promise2, x, resolve, reject) {
	if (x === promise2) {
		return reject(new TypeError('Chaining cycle detached for promise'));
	}
	if (x !== null && ['object', 'function'].includes(typeof x)) {

	}
}