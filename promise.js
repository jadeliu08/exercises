const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

class MyPromise {
	#status = STATUS.PENDING;
	#result = undefined;
	#thenables = [];

	constructor(executor) {
		const resolve = (value) => {
			this.#changeStatus(STATUS.FULFILLED, value);
		}
		const reject = (reason) => {
			this.#changeStatus(STATUS.REJECTED, reason);
		}
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	#changeStatus(status, result) {
		if (status !== STATUS.PENDING) {
			return;
		}
		this.#status = status;
		this.#result = result;
		this.#run();
	}

	#run() {
		if (this.#status === STATUS.PENDING) {
			return;
		}
	}

	then(onFullFilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			this.#thenables.push({
				onFullFilled,
				onRejected,
				resolve,
				reject,
			});
			// 这里为啥要执行run呢??
			this.#run();
		});
	}
}

const p = new MyPromise((resolve, reject) => {
	throw 111;
});
console.log('p', p);