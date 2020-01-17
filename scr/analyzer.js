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

	// Output starting analyzer
	outMessage("INFO   ANALYZER --- Analyzing program " + progNumber);

	aBlock(list);

	// Check for errors
	if (aErrors == 0) {

		// Output successful analysis
		outMessage("INFO   ANALYZER --- Success! Analyzer passed with " + 0 + " errors.");

		// Display symbol table

	} else {

		// Output analyzer failed
		outMessage("INFO   ANALYZER --- Failed! Analyzer failed with " + aErrors + " errors.");


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
			if (curElement.type == "ID") {
				// Check to see if ID is already in symbol table
				checkID(list, i);
			}

			// Checks for IF token, if found sends to aIfStmt function
			if (curElement.name == "IfStatement") {
				aIfStmt(list, i);
			}

			// Checks for WHILE token, if found sends to aWhileStmt function
			if (curElement.name == "WhileStatement") {
				aWhileStmt(list, i)
			}
		}
	}


}

function aVarDecl(list, index) {
	// Print found variable declaration
	outMessage("ANALYZER --- Found Var Declaration");

	// Parameters for entry object
	var na, ty, li, sc;

	if (list[index].type == "V_TYPE") {
		// Assign type as the type found at index
		ty = list[index].kind;

		// Ensure next token is infact an ID
		if (list[index + 1].type == "ID") {

			// Check to make sure ID is not found in symbol table
			/* checkID */

			// Assign name as ID name
			na = list[index + 1].kind;

			// Assign line as ID line
			li = list[index + 1].kind;

			// Assign scope as current scope level
			sc = scopeLvl;

			// Add entry to symbol table
			addSymbol(na, ty, li, sc);

		} else {
			// Error 
		}

	} else {
		// Error
	}

	return;

}

function aAssignStmt(list, index) {
	// Print found assign statement
	outMessage("ANALYZER --- Found Assign Statement");

	

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
function checkID(list, index) {

}

// Add entry to symbol table
function addSymbol(name, type, line, scope) {
	// Creates a var that holds the entry value
	var temp = new Entry(name, type, line, scope);

	// Add entry to the symbol table
	symbolTable.push(temp);

	return;
}

// Print entries of symbol table
function printTable(symbolTable, progNumber) {

	// Output header of symbol table
	outMessage("Symbol Table for program " + progNumber);
	outMessage("---------------------------");
	outMessage("Name   Type   Line   Scope ");
	outMessage("===========================");
	


	for (var y = 0; y < symbolTable.length; y++) {
		// Temporary var to hold current entry
		var curEnt = symbolTable[y];

		// Output current entry details
		// NEEDS TO BE BETTER FORMATTED FOR CLEANER OUTPUT
		outMessage(curEnt.name + " " + curEnt.type + " " + curEnt.line + " " + curEnt.scope);
	}

	return;

}