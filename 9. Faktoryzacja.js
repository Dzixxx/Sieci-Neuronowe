function NWD(a,b){
	if (a % b == 0) {
		return b;
	} else {
		return NWD(b, a%b);
	}
}

function potega(a,b){
	var output = 1;
 	for (var i = 0; i < b; i++) {
 		output = output * a;
 	}
 	return output;
}

function solveDL(a,n){
	var r = 1;
	
	while (potega(a, r) % n != 1 && r < 10) {
		r++;
	}
	if (r == 10) {
		return -1;
	} else {
		return r;
	}
}

function factorize(n){
	var randomed = Math.round(Math.random()*100000000) % n;	//bo math.random daje z 0 - 1

	if (NWD(n, randomed) > 1) {
		console.log(`N: ${n}, NWD: ${NWD(n, randomed)}`);
	} else {
		var r = solveDL(randomed, n);
		//console.log(`R: ${r}`);
		if (r == -1) {
			factorize(n);
		} else if (r % 2 == 0) {
			if (NWD(n, potega(randomed, r/2) + 1) > 1) {
				console.log(`N: ${n}, POTEGA: ${potega(randomed, r/2) + 1}`);
			} else if (NWD(n, potega(randomed, r/2) - 1) > 1) {
				console.log(`N: ${n}, POTEGA: ${potega(randomed, r/2) - 1}`);
			} else {
				factorize(n);
			}
		} else {
			factorize(n);
		}
	}
}

factorize(12)
factorize(91)
factorize(143)
factorize(1737)
factorize(1859)
factorize(988027)
