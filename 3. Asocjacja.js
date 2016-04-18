var zVectors = [
				   [ -1.0,-1.0,-1.0,-1.0,-1.0,
					 -1.0, 1.0, 1.0, 1.0,-1.0,
					 -1.0, 1.0,-1.0, 1.0,-1.0,
					 -1.0, 1.0, 1.0, 1.0,-1.0,
					 -1.0,-1.0,-1.0,-1.0,-1.0 ],

				   [ -1.0,-1.0,-1.0,-1.0,-1.0,
				     -1.0, 1.0, 1.0,-1.0,-1.0,
				     -1.0,-1.0, 1.0,-1.0,-1.0,
				     -1.0,-1.0, 1.0,-1.0,-1.0,
				     -1.0,-1.0,-1.0,-1.0,-1.0 ],
				]

var zaburzoneZVectors = [
							[-1.0, 1.0, 1.0, 1.0,-1.0,
							 -1.0, 1.0,-1.0, 1.0,-1.0,
							 -1.0, 1.0,-1.0, 1.0,-1.0,
							 -1.0, 1.0, 1.0, 1.0,-1.0,
							 -1.0,-1.0,-1.0,-1.0,-1.0
							 ],
							[-1.0,-1.0,1.0,-1.0,-1.0,
							 -1.0,-1.0,1.0,-1.0,-1.0,
							 -1.0,-1.0,1.0,-1.0,-1.0,
							 -1.0,-1.0,1.0,-1.0,-1.0,
							 -1.0,-1.0,1.0,-1.0,-1.0
							 ]
						]

function EmptyVector(){
	return [ -1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0]
}
function print(vector, name){
	console.log(name);
	console.log("")
	var row = "|"
	for (var i=0; i<25; i++) {
		if (vector[i] == -1.0) {
			row += "   |"
		} else {
			row += " * |"
		}
		
		if (i%5 == 4) {
			console.log(row);
			row = "|"
		}
	}
	console.log("")
}
function creatWVec(z0,z1){
	var w = []

	for (var i=0; i<25; i++) {
		w[i] = EmptyVector();
		for (var j=0; j<25; j++) {
			w[i][j] = 1.0/25.0 * (z0[i] * z0[j] + z1[i] * z1[j]);
		}
	}

	return w;
}
function calcSGN(u){
	for (var i=0; i<25; i++) {
		if(u[i] >= 0.0) {
			u[i] = 1.0;
		} else {
			u[i] = -1.0;
		}
	}
	return u;
}
function calcF(w,u){
	var output = []

	for (var i=0; i<25; i++) {
		var temporary = 0.0

		for (var j=0; j<25; j++) {
			temporary += w[i][j] * u[j]
		}		

		output[i] = temporary;
	}

	return calcSGN(output);
}

var result;
var vectorW = creatWVec(zVectors[0], zVectors[1])

print(zVectors[0],"          Z0")
print(zVectors[1],"          Z1")
print(zaburzoneZVectors[0],"     Zaburzone Z0")
print(zaburzoneZVectors[1],"     Zaburzone Z1")

result = calcF(vectorW, zVectors[0]);
print(result,"       F -> z0")

result = calcF(vectorW, zVectors[1]);
print(result, "      F -> z1")

result = calcF(vectorW, zaburzoneZVectors[0]);
print(result, "  F -> zaburzone z0")

result = calcF(vectorW, zaburzoneZVectors[1]);
print(result, "  F -> zaburzone z1")
