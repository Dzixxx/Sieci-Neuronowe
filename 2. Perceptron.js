var uArray = [
					[0.0,0.0,0.0,0.0,0.0,
					 0.0,1.0,1.0,0.0,0.0,
					 0.0,0.0,1.0,0.0,0.0,
					 0.0,0.0,1.0,0.0,0.0,
					 0.0,0.0,1.0,0.0,0.0,1.0], //U1

					[0.0,0.0,1.0,1.0,0.0,
					 0.0,0.0,0.0,1.0,0.0,
					 0.0,0.0,0.0,1.0,0.0,
					 0.0,0.0,0.0,0.0,0.0,
					 0.0,0.0,0.0,0.0,0.0,1.0], //U2

					[0.0,0.0,0.0,0.0,0.0,
					 1.0,1.0,0.0,0.0,0.0,
					 0.0,1.0,0.0,0.0,0.0,
					 0.0,1.0,0.0,0.0,0.0,
					 0.0,1.0,0.0,0.0,0.0,1.0], //U3

					[0.0,0.0,0.0,0.0,0.0,
					 0.0,1.0,1.0,1.0,0.0,
					 0.0,1.0,0.0,1.0,0.0,
					 0.0,1.0,1.0,1.0,0.0,
					 0.0,0.0,0.0,0.0,0.0,1.0], //U4

					[0.0,0.0,0.0,0.0,0.0,
					 0.0,0.0,0.0,0.0,0.0,
					 1.0,1.0,1.0,0.0,0.0,
					 1.0,0.0,1.0,0.0,0.0,
					 1.0,1.0,1.0,0.0,0.0,1.0]  //U5
				];

function scalarSum(w,u){
	var output = 0.0

	for (var i=0; i<26; i++) {
		output += w[i] * u[i]	
	}
	
	if (output >= 0)
		return 1.0;
	else 
		return 0.0;
}

//start
var t = 0

var counter = 0

//Nauczyciel
var zt

//stala
var c = 1.0


var w = [0.0,0.0,0.0,0.0,0.0,
		 0.0,0.0,0.0,0.0,0.0,
		 0.0,0.0,0.0,0.0,0.0,
		 0.0,0.0,0.0,0.0,0.0,
		 0.0,0.0,0.0,0.0,0.0,0.0]

//result of function for loop
var scalarResult

while(counter<5){

	if (t%5 <= 2) {
		zt = 1.0;
	} else {
		zt = 0.0;
	}

	scalarResult = scalarSum(w, uArray[t%5])

	for (var i = 0; i<26; i++) {
		w[i] = w[i] + c * (zt - scalarResult) * uArray[t%5][i];
	}

	t++;
	if (scalarResult == zt) {
		counter += 1.0;
	} else {
		counter = 0.0;
	}
}
var result = String(w[0])

for(var i=1; i< 26; i++){
	result = result + ", " + String(w[i])
}

console.log("t: "+t);
console.log("[ "+result+" ]");
