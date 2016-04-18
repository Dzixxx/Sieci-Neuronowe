
function multiplyVectorsThree(weights, values){
	var localArrayOfResults = []
	for (var i=0; i<4; i++) {
		if (weights[0] * values[i][0] + weights[1] * values[i][1] + weights[2] * values[i][2] >= 0.0) {
			localArrayOfResults.push(1)
		} else {
			localArrayOfResults.push(0)
		}
	}
	return localArrayOfResults
}

function multiplyVectorsTwo(weights, values){
	var localArrayOfResults = []
	for (var i=0; i<2; i++) {
		if (weights[0] * values[i][0] + weights[1] * values[i][1] >= 0.0) {
			localArrayOfResults.push(1)
		} else {
			localArrayOfResults.push(0)
		}
	}
	return localArrayOfResults
}


function executeTwo(weightVector){
	var localVectorOfValues = [],
		temporaryVector;

	temporaryVector = [0.0,1.0];
	localVectorOfValues.push(temporaryVector);
	temporaryVector = [1.0,0.0];
	localVectorOfValues.push(temporaryVector);

	return multiplyVectorsTwo(weightVector, localVectorOfValues);
}

function executeThree(weightVector){
	var localVectorOfValues = [],
		temporaryVector;

	temporaryVector = [0.0,0.0,1.0];
	localVectorOfValues.push(temporaryVector);
	temporaryVector = [1.0,0.0,1.0];
	localVectorOfValues.push(temporaryVector);
	temporaryVector = [0.0,1.0,1.0];
	localVectorOfValues.push(temporaryVector);
	temporaryVector = [1.0,1.0,1.0];
	localVectorOfValues.push(temporaryVector);

	return multiplyVectorsThree(weightVector, localVectorOfValues);
}

var NOT  = [-0.5, 0.5],
	AND  = [0.25,0.25,-0.5],
	OR   = [0.33,0.33,-0.33],
	NAND = [-0.25,-0.25,0.4];


console.log("NOT:      "  + executeTwo(NOT));
console.log("AND:  "  + executeThree(AND));
console.log("OR:   "  + executeThree(OR));
console.log("NAND: "  + executeThree(NAND));
