// Semantic Analyzer file

// Variable to keep current scope level
var scopeLvl = 0;

// Errors during symantic analysis
// Errors include type and scope mismatches
var aErrors = 0;

// Array for entries in symbol table
var symbolTable = [];

function analyze(tkns, progNumber) {

	outMessage("INFO   ANALYZER --- Analyzing program " + progNumber);

	// For loop cycles through stream of tokens
	for (var i = 0; i < tkns.length, i++) {
		// variable holder for current token
		var curToken = tkns[i];

		// Looks for left brace, increases scope level with brace
		// Also prints found BLOCK in AST
		if (curToken.type == "L_BRACE") {
			scopeLvl++;
			/* Found BLOCK for AST goes here */
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

function aVarDecl(stream, index) {
	// Print found variable declaration
	outMessage("ANALYZER --- Found Var Declaration");

	// Add VarDecl to AST
	/* Found VarDecl for AST goes here */



}

function aAssignStmt(stream, index) {
	// Print found assign statement
	outMessage("ANALYZER --- Found Assign Statement");

	// Add AssignStmt to AST
	/* Found AssignStmt for AST goes here */

}

function aPrintStmt(stream, index) {
	// Print found print statement
	outMessage("ANALYZER --- Found Print Statement");

	// Add PrintStmt to AST
	/* Found PrintStmt for AST goes here */

}

function aIfStmt(stream, index) {
	// Print found if statement
	outMessage("ANALYZER --- Found If Statement");

	// Add IfStmt to AST
	/* Found IfStmt for AST goes here */

}

function aWhileStmt(stream, index) {
	// Print found while statement
	outMessage("ANALYZER --- Found While Statement");

	// Add WhileStmt to AST
	/* Found WhileStmt for AST goes here */

}

function checkID(stream, index) {

}