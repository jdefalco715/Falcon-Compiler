// Semantic Analyzer file

// Variable to keep current scope level
var scopeLvl = 0;

// Errors during semantic analysis
// Errors include type and scope mismatches
var aErrors = 0;

// Warnings during semantic analysis
// Warnings are declared variables that are not used
var aWarnings = 0;

// Array for entries in symbol table
var symbolTable = [];

function analyzer(list, progNumber) {

	symbolTable = [];

	aErrors = 0;

	aWarnings = 0;

	// Output starting analyzer
	outMessage("INFO   ANALYZER --- Analyzing program " + progNumber);

	aBlock(list);

	// Check for errors
	if (aErrors == 0) {

		// Output successful analysis
		outMessage("INFO   ANALYZER --- Success! Analyzer passed with " + 0 + " errors and " + aWarnings + " warnings.");

		// Display symbol table
		printTable(symbolTable, progNumber);

	} else {

		// Output analyzer failed
		outMessage("INFO   ANALYZER --- Failed! Analyzer failed with " + aErrors + " errors and " + aWarnings + " warnings.");


		// DO NOT display symbol table

	}

}

function aBlock(list) {

	// For loop cycles through stream of tokens
	// Var i will be incremented through function calls below
	for (var i = 0; i < list.length;) {
		// variable holder for current token
		var curElement = list[i];

		// Looks for left brace, increases scope level with brace
		if (curElement.name == "{") {

			// Print found block
			outMessage("ANALYZER --- Found Block");

			scopeLvl++;
			i++;
		}

		// Looks for right brace, decreases scope level with brace
		if (curElement.name == "}") {
			scopeLvl--;
			i++;
		}

		if (curElement.type == "statement") {

			// Checks for TYPE token,  if found sends to aVarDecl function
			if (curElement.name == "VarDeclaration") {
				aVarDecl(list, i + 1);

				// Increment index by three to get to next statement
				// skips over type and id
				i += 3;
			}

			// Checks for ID token, if found sends to checkID function
			if (curElement.name == "AssignStatement") {
				// Check to see if ID is already in symbol table
				aAssignStmt(list, i+1);

				// Increment index by three to get to next statement
				// skips over id and value
				i += 3;
			}

			// Checks for IF token, if found sends to aIfStmt function
			if (curElement.name == "IfStatement") {
				aIfStmt(list, i);

				// Increment index by three to get to next statement
				// skips over expr, boolop, and expr
				i += 4;
			}

			// Checks for WHILE token, if found sends to aWhileStmt function
			if (curElement.name == "WhileStatement") {
				aWhileStmt(list, i)

				// Increment index by three to get to next statement
				// skips over expr, boolop, and expr
				i += 4;
			}

		}

	}


}

function aVarDecl(list, index) {
	// Print found variable declaration
	outMessage("ANALYZER --- Found Var Declaration");

	// Parameters for entry object
	var na = "";
	var ty = "";
	var li = "";
	var sc = "";

	if (list[index].type == "V_TYPE") {
		// Assign type as the type found at index
		ty = list[index].name;


		// Ensure next token is infact an ID
		if (list[index + 1].type == "ID") {

			// Assign name as ID name
			na = list[index + 1].name;

			// Assign line as ID line
			li = list[index + 1].line;

			// Assign scope as current scope level
			sc = scopeLvl;

			// Check to make sure ID is not found in symbol table
			if ((checkID(list, index + 1 )) == -1) {

				outMessage("ANALYZER --- Assigning variable [" + na + "] found on line (" + li + ") to type: " + ty);

				// Add entry to symbol table
				addSymbol(na, ty, li, sc);
			} else {

				// Error, variable trying to be declared has already been declared
				outMessage("ANALYZER --- ERROR! Variable [" + na + "] has already been declared");

				// Add to error counter
				aErrors++;

			}

		}

	}

	return;

}

function aAssignStmt(list, index) {

	// Print found assign statement
	outMessage("ANALYZER --- Found Assign Statement");

	// Parameters for entry object
	var na = "";
	var sc = "";



	// Check for ID
	if(list[index].type == "ID") {

		// Variables for information on ID found by analyzer
		na = list[index].name;
		sc = scopeLvl;

		// Variable to validate ID in symbol table
		// Will return index of found ID, or -1 if no ID was found
		var hit = checkID(na, sc);

		// Check to see if the ID is in the symbol table
		if (hit != -1) {

			// Variable to hold value in question for type checking
			var testVal = list[index+1];

			// Output found value
			outMessage("ANALYZER --- Found value (" + testVal.name + ") of type \"" + testVal.type + "\" on line " + testVal.line);

			// Ensure the types match
			if (checkType(testVal.type, symbolTable[hit].type)) {

				// Set found ID's value to new value
				symbolTable[hit].value = testVal.name;

				// Output changed value
				outMessage("ANALYZER --- Setting the value of variable [" + na + "] to: " + testVal.name);

			} else {

				// Error for type mismatch
				outMessage("ANALYZER --- ERROR! Type mismatch with variable [" + na + "] to value: " + testVal.name);

				// Add to error counter
				aErrors++;

			}



		} else {

			// Error for undeclared variable
			outMessage("ANALYZER --- ERROR! Variable [" + na + "] found on line " + list[index].line + " not previously defined.");

			// Add to error counter
			aErrors++;
		}

	}

}

function aPrintStmt(list, index) {

	// Print found print statement
	outMessage("ANALYZER --- Found Print Statement");



}

function aIfStmt(list, index) {

	// Print found if statement
	outMessage("ANALYZER --- Found If Statement");



}

function aWhileStmt(list, index) {

	// Print found while statement
	outMessage("ANALYZER --- Found While Statement");




}

// This function is to check if the entry of an ID is already in symbol table
// Ensures that at least the ID name and the scope are different
// Will return true or false
function checkID(idName, idScope) {
	// Variable to see if variable is already in table
	var match = -1;

	// Element at index of list will always be an ID
	// Go through elements, and check if the ID in question matches any of them
	// NOTE: Name and scope must be different
	for (var y = 0; y < symbolTable.length; y++) {
		// Element in symbol table we are checking
		var check = symbolTable[y];

		// Compare the names between the two IDs
		if (idName == check.name) {

			// Compare the current scope with the elements scope
			if (idScope == check.scope) {
				match = y;
			}
		}
	}

	return match;

}

// This function takes the type of a proposed value, and compares it to the list type of the variable we are trying to assign the value to
// Will return true or false
function checkType(valType, testID) {

	/* In AST array, values are given as so:
	*	int = DIGIT
	*	string = STRING
	*	bool = BOOL_T or BOOL_F
	*/

	/* In Symbol table, types are as listed:
	*	int
	*	string
	*	boolean
	*/

	// Boolean variable to be returned by function
	var typeMatch = false

	// Check int type
	if (testID == "int" && valType == "DIGIT")
		typeMatch = true;

	// Check string type
	if (testID == "string" && valType == "STRING")
		typeMatch = true;

	// Check boolean type
	if (testID == "boolean" && (valType == "BOOL_F" || valType == "BOOL_T"))
		typeMatch = true;

	return typeMatch;

}

// Add entry to symbol table
function addSymbol(name, type, line, scope) {
	// Creates a var that holds the entry value
	var temp = new Entry(name, type, line, scope, undefined, false);

	// Add entry to the symbol table
	symbolTable.push(temp);

	return;
}

// Function to call a symbol in question and alter its parameters
function getSymbol(name, type, scope) {

}

// Print entries of symbol table
function printTable(symbolTable, progNumber) {

	// Output header of symbol table
	outMessage("");
	outMessage("Symbol Table for program " + progNumber);
	outMessage("---------------------------");
	outMessage("Name   Type   Line   Scope ");
	outMessage("===========================");



	for (var z = 0; z < symbolTable.length; z++) {
		// Temporary var to hold current entry
		var curEnt = symbolTable[z];

		// Output current entry details
		// NEEDS TO BE BETTER FORMATTED FOR CLEANER OUTPUT
		outMessage(curEnt.name + "      " + curEnt.type + "    " + curEnt.line + "       " + curEnt.scope);
	}

	return;

}