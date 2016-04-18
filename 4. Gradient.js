var cVal = 0.01;
var epsVal = 0.000001;

function calcFirstX(vec){

	return 4.0*vec[0] - 2.0* vec[1] - 2.0;
}
function calcFirstY(vec){

	return 4.0*vec[1] - 2.0* vec[0] - 2.0*vec[2];
}
function calcFirstZ(vec){

	return 2.0* vec[2] - 2.0*vec[1];
}
function calcSecondX(vec){

	return 12 * vec[0]*vec[0]*vec[0] + 12 * vec[0]*vec[0] - 24 * vec[0];
}
function calcSecondY(vec){

	return 24 * vec[1] - 24;
}

function wbz(wart){
	if(wart < 0){
		return -wart
	}
	return wart
}

function gradientFirst(input) {
	var vectorNew = [0.0,0.0,0.0];
	var flag = true;
	var max = 0.0;

	while (flag) {
		//nowy vector x - c * pochodna cząstkowa (metoda gradientu)
		vectorNew[0] = input[0] - cVal * calcFirstX(input);
		vectorNew[1] = input[1] - cVal * calcFirstY(input);
		vectorNew[2] = input[2] - cVal * calcFirstZ(input);

		max = 0.0;
		//szukam maximum
		for (var i=0; i<3; i++) {
			if (wbz(vectorNew[i] - input[i]) > max) {
				max = wbz(vectorNew[i] - input[i]);
			}
		}
		//sprawdzam warunek -> jezeli spelniony to wypisuje i stopuje petle ew lece dalej 
		if (max < epsVal) {
			console.log("Punkt: [" + vectorNew[0]+","+ vectorNew[1]+","+  vectorNew[2]+"] ma wartość: "+ String( 2 * vectorNew[0]*vectorNew[0] + 2 * vectorNew[1]*vectorNew[1] + vectorNew[2]*vectorNew[2] - 2 * vectorNew[0] * vectorNew[1] - 2 * vectorNew[2] *vectorNew[1] - 2* vectorNew[0] + 3));
			flag = false;
		}
		input = vectorNew;	
	}
}

function gradientSecond(input) {
	var vectorNew = [0.0,0.0];
	var flag = true;
	var max = 0.0;


	while (flag) {
		//IMMUTABLE DATA - do not override it!!!!!!!!
		var localInput = [input[0],input[1]]

		vectorNew[0] = input[0] - cVal * calcSecondX(input);
		vectorNew[1] = input[1] - cVal * calcSecondY(input);

		input = localInput

		max = 0.0;
		for (var i=0; i<2; i++) {
			if (Math.abs(vectorNew[i] - input[i]) > max) {
				max = Math.abs(vectorNew[i] - input[i]);
			}
		}

		if (max < epsVal) {

			console.log("Punkt: ["+ vectorNew[0]+","+ vectorNew[1]+"] ma wartość: "+ String(vectorNew[0]*vectorNew[0]*vectorNew[0]*vectorNew[0] * 3 + 4* vectorNew[0]*vectorNew[0]*vectorNew[0] - 12 * vectorNew[0]*vectorNew[0] + 12*vectorNew[1] * vectorNew[1] - 24 * vectorNew[1]));
			flag = false;
		}
		input = vectorNew;	
	}
}

gradientFirst([1.0,1.0,1.0]);

gradientSecond([4.0,4.0]);


