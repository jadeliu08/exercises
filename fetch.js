async function getDuyiHeros() {
	const resp = await fetch('https://study.duyiedu.com/api/herolist');
  console.log(resp);
	 const data = await resp.json();
  console.log(data);
}

getDuyiHeros();