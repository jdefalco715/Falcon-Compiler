// Semantic Analyzer file

// Variable to keep current scope level
var scopeLvl = 0;

// Errors during symantic analysis
// Errors include type and scope mismatches
var aErrors = 0;

// Array for entries in symbol table
var symbolTable = [];

function analyze(tkns, progNumber) {

	// Output starting analyzer
	outMessage("INFO   ANALYZER --- Analyzing program " + progNumber);

	block(tkns);

	// Check for errors
	if (aErrors == 0) {

		// Output successful analysis
		outMessage("INFO   ANALYZER --- Success! Analyzer passed with " + 0 + " errors.");

		// Display AST
		buildAST(tkns);

		// Display symbol table
	} else {

		// Output analyzer failed
		outMessage("INFO   ANALYZER --- Failed! Analyzer failed with " + aErrors + " errors.");

		// DO NOT display AST

		// DO NOT display symbol table
	}
}

function block(tkns) {

	// Print found block
	outMessage("ANALYZER --- Found Block");

	// Add Block to AST
	/* Found Block for AST goes here */
	
	// For loop cycles through stream of tokens
	// Var i will be incremented through function calls below
	for (var i = 0; i < tkns.length;) {
		// variable holder for current token
		var curToken = tkns[i];

		// Looks for left brace, increases scope level with brace
		if (curToken.type == "L_BRACE") {
			scopeLvl++;
		}

		// Looks for right brace, decreases scope level with brace
		if (curToken.type == "R_BRACE")
			scopeLvl--;

		// Checks for TYPE token,  if found sends to aVarDecl function
		if (curToken.type == "V_TYPE") {
			aVarDecl(tkns, i);
		}

		// Checks for ID token, if found sends to checkID function
		if (curToken.type == "ID") {
			checkID(tkns, i);
		}

		// Checks for IF token, if found sends to aIfStmt function
		if (curToken.type == "IF") {
			aIfStmt(tkns, i);
		}

		// Checks for WHILE token, if found sends to aWhileStmt function
		if (curtoken.type == "WHILE") {
			aWhileStmt(tkns, i)
		}
	}


}

function aVarDecl(tkns, index) {
	// Print found variable declaration
	outMessage("ANALYZER --- Found Var Declaration");

	// Add VarDecl to AST
	/* Found VarDecl for AST goes here */



}

function aAssignStmt(tkns, index) {
	// Print found assign statement
	outMessage("ANALYZER --- Found Assign Statement");

	// Add AssignStmt to AST
	/* Found AssignStmt for AST goes here */

}

function aPrintStmt(tkns, index) {
	// Print found print statement
	outMessage("ANALYZER --- Found Print Statement");

	// Add PrintStmt to AST
	/* Found PrintStmt for AST goes here */

}

function aIfStmt(tkns, index) {
	// Print found if statement
	outMessage("ANALYZER --- Found If Statement");

	// Add IfStmt to AST
	/* Found IfStmt for AST goes here */

}

function aWhileStmt(tkns, index) {
	// Print found while statement
	outMessage("ANALYZER --- Found While Statement");

	// Add WhileStmt to AST
	/* Found WhileStmt for AST goes here */

}

function checkID(tkns, index) {

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
	


	for (int y = 0; y < symbolTable.length, y++) {
		// Temporary var to hold current entry
		var curEnt = symbolTable[y];

		// Output current entry details
		// NEEDS TO BE BETTER FORMATTED FOR CLEANER OUTPUT
		outMessage(curEnt.name + "" + curEnt.type + "" + curEnt.line + "" + curEnt.scope);
	}

	return;

}