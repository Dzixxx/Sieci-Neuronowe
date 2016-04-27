var arrayXs = [
				0.0,0.0,0.0,0.0,0.0,
				0.0,1.0,1.0,0.0,0.0,
				0.0,0.0,1.0,0.0,0.0,
				0.0,0.0,1.0,0.0,0.0,
				0.0,0.0,1.0,0.0,0.0
			 ]

var arrayXr = [
				0.0,1.0,1.0,1.0,0.0,
				0.0,1.0,0.0,1.0,0.0,
				0.0,1.0,0.0,1.0,0.0,
				0.0,1.0,0.0,1.0,0.0,
				0.0,1.0,1.0,1.0,0.0,
			 ]

var zad1 = [
			0.0,1.0,0.0,0.0,0.0,
			0.0,0.0,0.0,1.0,0.0,
			1.0,0.0,1.0,0.0,0.0,
			0.0,0.0,0.0,0.0,1.0,
			0.0,1.0,0.0,0.0,0.0
			]

function calcTheta(v){
	var sum = 0
	for (var i = 0; i < 25; i++){
		sum += v[i]
	}
	return sum
}

function calcTheta2(v1,v2){
	var sum = 0
	for (var i = 0; i < 25; i++){
		sum += v1[i]
		sum += v2[i]
	}
	return sum
}

function calcC(v){
	var output = []
	var temp
	for(var i = 0; i < 25; i++){
		temp = []
		for(var j = 0; j < 25; j++){
			if (i != j) {
				var local = [v[i],v[j]];
				temp.push((local[0] - 0.5) * (local[1] - 0.5));
			} else {
				temp.push(0.0);
			}	
		}
		output.push(temp)
	}
	return output
}

function generateRandomV(){
	var vec = [
				Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),
				Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),
				Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),
				Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),
				Math.random(),Math.random(),Math.random(),Math.random(),Math.random()
				]
	var result = []
	for (var i =0; i<25; i++) {
		vec[i] = Math.round( vec[i] * 100 );  
		if (vec[i] % 2 == 0) {
			result.push(1.0);
		} else {
			result.push(0.0);
		}
	}
	return result;
}
											// ----------> Sprawdzic array override
function generateNextV(prev, vecC){
	var vec = []
	var uit = 0.0

	for (var i = 0; i < 25; i++) {
		uit = 0.0;
		for (var j = 0; j < 25; j++) {
			var c = vecC[i][j], 
				p = prev[j]
			uit+= 2*c * p;
		}
		var temp = vecC[i]
		uit -= calcTheta(temp);
		
		if (uit>0) {
			vec.push(1.0);
		} else {
			if (uit == 0) {
				vec.push(prev[i]);
			} else {
				vec.push(0.0);
			}
		}
	}

	return vec;
}

function generateNextV2(prev, vecC, vecD){
	var vec = []
	var uit = 0.0
	for (var i=0; i<25; i++) {
		uit = 0.0;
		for (var j=0; j<25; j++) {
			var local = [vecC[i][j],vecD[i][j], prev[j]]
			uit += 2 * (local[0] + local[1]) * local[2]
		}

		var temp = [vecC[i],vecD[i]]
		uit -= calcTheta2(temp[0],temp[1])

		if (uit>0) {
			vec.push(1.0);
		} else {
			if (uit == 0) {
				vec.push(prev[i]);
			} else {
				vec.push(0.0);
			}
		}	
	}
	return vec;
}

function print(v){
	var line = "|"
	for (var i=0; i<25; i++) {
		if (v[i] == 0.0) {
			line = line + "   |"
		} else {
			line = line + " * |"
		}
		if (i%5 == 4) {
			console.log(line)
			line = "|"
		}
	}
}

var vecC = calcC(arrayXs)

var vecD = calcC(arrayXr)

var vecX = generateRandomV()
//vexX = zad1				// <- zamiast randoma odgornie zadany :)
print(vecX)

setInterval(function(){

	console.log("\n")
	//vecX = generateNextV(vecX, vecC) 				// <- tutaj w zaleznosci jaki to wektor ten lub nizej :)
	vecX = generateNextV2(vecX, vecC, vecD)
	print(vecX);

}, 1000);



