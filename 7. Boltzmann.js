var tZero = 1.0
//zmianiac oba gdy chodzi o temperature
var temperature = 1.0
var time = 1.0

function calculateTheta(vector){
	var sum = 0.0;
	for (let i =0; i<25; i++) {
		sum+= vector[i];
	}
	return sum;
}

function calcVectorC(vector){
	var output = []
	var tmp = []
	for (var i = 0; i<25; i++) {
		tmp = []
		for (var j=0; j<25; j++) {
			if (i != j) {
				var local = [vector[i],vector[j]]
				var wynik = (local[0] - 0.5) * (local[1] - 0.5)
				tmp.push(wynik);
			} else {
				tmp.push(0.0);
			}	
		}
		
		output.push(tmp);
	}
	return output;
}

function calculateFuit (u) {
	var local = [u, temperature]
	return 1.0 / (1.0 + Math.pow(Math.E, -1.0 * (local[0] / local[1])));
}

function generateRandomVector() {
	var vec = [
		Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),
		Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),
		Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),
		Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),
		Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),

	]	
	var temp = []
	for (let i =0; i<25; i++) {
		if (vec[i] % 2 == 0) {
			temp.push(1.0);
		} else {
			temp.push(0.0);
		}
	}
	return temp;
}

function generateNextVector(prev, vectorC) {
	var vec = []
	var uit = 0.0;
	var fuit;

	for (var i=0; i<25; i++) {
		uit = 0.0;
		for (var j=0; j<25; j++) {
			let local = [vectorC[i][j],prev[j]]
			uit+= 2*local[0] * local[1];
		}
		let local = [vectorC[i]]
		uit -= calculateTheta(local[0]);
		fuit = calculateFuit(uit);

		if (fuit > ((Math.random() % 11) / 1.0)) {
			vec.push(1.0);
		} else {
			vec.push(0.0);
		}
	}
	return vec;
}

function generateNextTemperature(time) {

	return tZero / (1.0+Math.log(time));
}

function print(vector){
	var line = "|"
	for(var i = 0; i<25; i++){
		if (vector[i] <= 0.0) {
			line = line + "   |"
		} else {
			line = line + " * |";
		}
		
		if (i%5 == 4) {
			console.log(line);
			line = "|"
		}
	}
}

var Xs = [
			0.0,0.0,0.0,0.0,0.0,
			0.0,1.0,1.0,0.0,0.0,
			0.0,0.0,1.0,0.0,0.0,
			0.0,0.0,1.0,0.0,0.0,
			0.0,0.0,1.0,0.0,0.0
			]

var vecC = calcVectorC(Xs)

var vecX = generateRandomVector()
print(vecX)

setInterval(function(){	
	vecX = generateNextVector(vecX, vecC)
	time += 1.0
	temperature = generateNextTemperature(time)
	console.log("T: "+time+" - temperature: "+temperature);
	print(vecX)
},1000)
