
const idle1 = window.requestIdleCallback(() => {
	console.log('idle1');
}, { timeout: 50 });

const idle2 = window.requestIdleCallback(() => {
	console.log('idle2');
}, { timeout: 40 });