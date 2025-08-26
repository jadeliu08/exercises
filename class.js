class Person {
	#age;
	name;
	constructor(name, age) {
		this.name = name;
		this.#age = age;
	}
	get age() {
		return this.#age;
	}
	set age(value) {
		this.#age = value;
	}

}

// const p = new Person('John', 20);
//
// console.log(p.age);
// console.log(p.name);