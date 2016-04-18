
// UWAGA TROCHE MIELI DLA TYCH PARAMETRÓW ale bangla idealnie :D
// beta: 1,25 ; c: 1.0 , eps: 0.000001
// ewentualnie mozna zmienic indexy w na Math.random()*2 to dla kazdych paramsów znajdzie wynik

var U = [ 
			[0,0,1],
			[0,1,1],
			[1,0,1],
			[1,1,1]
		];

var Z = [0,1,1,0];
 
var SiecNeuronowa ={
	beta: 1.25,
	c: 1.0,
	w: [
		[ 0, 1, 2],
		[ 0, 1, 2]
	],
	s: [ Math.random() * 2, Math.random() * 2, Math.random() * 2],
	x: [3,3,1],
	u: undefined,
	z: undefined
}

function vp(){
	var lokalna = [SiecNeuronowa.s[0], SiecNeuronowa.x[0], SiecNeuronowa.s[1],SiecNeuronowa.x[1], SiecNeuronowa.s[2],SiecNeuronowa.x[2] ]
	return lokalna[0] * lokalna[1] + lokalna[2] * lokalna[3] + lokalna[4] * lokalna[5] 
}

function Fp(p){
	newX(p)
	var wynik =  vp()
	return wynik;
}

function F(x){
	var wynik = f(x);
	return wynik;
}

function propagacja(_U,_Z){

	SiecNeuronowa.u = _U;
	SiecNeuronowa.z = _Z;

	var eps = 0.000001;
	var mw = 2*eps; 
	var ms = 2*eps;
	var m = undefined;
	var sp = [];
	var wp = [];

	do {
		var lokalna = [SiecNeuronowa.s, SiecNeuronowa.w], 

		sp = newS(lokalna[0]);

		wp = newW(lokalna[1]);

		m = max(lokalna[0], sp, lokalna[1], wp);

		SiecNeuronowa.s = sp;
		SiecNeuronowa.w = wp;

	} while (m >= eps);
}

function max(s,sp,w,wp){
	var i = s.length
	var wi = w.length
	var m = 0
	var sa = undefined
	var wa = undefined

	for (var k = 0; k < i; k++)
	{
		sa = Math.abs(sp[k] - s[k]);
		for (var l = 0; l < wi; l++)
		{
			wa = Math.abs(wp[l, k] - w[l, k]);
			if (wa >= m)
				m = wa;
		}
		if (sa >= m)
			m = sa;
	}
	return m
}

function maxS(s,sp){
	var i = s.length;
	var m = 0;
	var sa;
	for (var k = 0; k < i; k++)
	{
		sa = Math.abs(sp[k] - s[k]);
		if (sa >= m)
			m = sa;
	}
	return m;
}
// --------------------------tutaj zmien jakbys chcial inny wektor (domyslnie  i=2, j=3)
function maxW(w,wp){
	var wi = 2
	var wj = 3
	var m = 0;
	var wa;
	for (var k = 0; k < wi; k++)
	{
	    for (var l = 0; l < wj; l++)
	    {
	        wa = Math.abs(wp[k][l] - w[k][l]);
	        if (wa >= m)
	            m = wa;
	    }
	}
	return m;
}

function newS(s){
	var n = s.length;
	var sp = [];
	var lokalna = [SiecNeuronowa.c]
	for (var i = 0; i < n; i++)
	    sp[i] = s[i] - lokalna[0] * Es(s, i);
	return sp;
}
// --------------------------tutaj zmien jakbys chcial inny wektor (domyslnie  i=2, j=3)
function newW(w){
	var nj, ni;

    ni = 2
    nj = 3

    var stala = [SiecNeuronowa.c]
	
    var wp = [
		[ Math.random() * 2, Math.random() * 2, Math.random() * 2],
		[ Math.random() * 2, Math.random() * 2, Math.random() * 2]
	]

    for (var i = 0; i < ni; i++){
        for (var j = 0; j < nj; j++){
        	var sub =  w[i][j]
            wp[i][j] = sub - stala[0] * Ew(i, j);
        }
    }
    return wp;
}

function newX(p){
	var n = SiecNeuronowa.x.length-1;

    for (var i = 0; i < n; i++){
    	var lokalna = [SiecNeuronowa.w[i][0],SiecNeuronowa.u[p][0],SiecNeuronowa.w[i][1],SiecNeuronowa.u[p][1],SiecNeuronowa.w[i][2]]
        SiecNeuronowa.x[i] = f( lokalna[0] * lokalna[1] + lokalna[2] * lokalna[3] + lokalna[4]);
    }
    return 
}
//---------------------------ewentualne nadpisanie !!!!!!!
function Es(s,si){
	var sum = 0;
    var y = undefined, 
    	z = undefined,
    	x = undefined;
    var p = SiecNeuronowa.z.length;

    for (var i = 0; i < p; i++)
    {
    	x = Fp(i);
    	z = F(x);
        y = z

        var local = [SiecNeuronowa.z[i],SiecNeuronowa.x[si]]
        sum += (y - local[0]) * fp(vp())*local[1];
    }

    return sum;
}

function Ew(wi,wj){
	var sum = 0;
    var p = SiecNeuronowa.z.length;
    var y,z,x;
    for (var i = 0; i < p; i++)
    {
    	newX(i);
    	x = Fp(i);
    	z = F(x)
        y = z

        var la = [
        	SiecNeuronowa.z[i],
        	SiecNeuronowa.s[wi],
        	SiecNeuronowa.w[wi][0],
        	SiecNeuronowa.u[i][0],
        	SiecNeuronowa.w[wi][1],
        	SiecNeuronowa.u[i][1],
        	SiecNeuronowa.w[wi][2],
        	SiecNeuronowa.u[i][wj]
        ];

        var doFP = la[2] * la[3] + la[4] * la[5] + la[6]

        sum += (y - la[0]) * fp(vp()) * la[1]* fp(doFP) * la[7];
    }
    return sum;
}

function f(x){
	var beta = [SiecNeuronowa.beta]
	return 1/(1+Math.pow(Math.E, -beta[0] * x));
}

function fp(x){
	var beta = [SiecNeuronowa.beta]
	return beta[0]*f(x)*(1-f(x));
}

propagacja(U,Z);

console.log("W");
console.log(SiecNeuronowa.w);
console.log("\nS");
console.log(SiecNeuronowa.s);
console.log("\n");

/*
for (var i = 0; i < 2; i++){
	for (var j = 0; j < 3; j++)
		console.log("w["+i+"]["+j+"] = "+SiecNeuronowa.w[i][j]);
}

for (var k = 0; k < 3; k++)
	console.log("s["+k+"] = "+SiecNeuronowa.s[k]);
*/
for (var l = 0; l < 4; l++)
	console.log("y["+l+"] = "+F(Fp(l)));

