// Parser file
// Takes token stream, validates tokens to class grammar
// Function for (almost) every rule in grammar

function parse(tkns, progNumber) {
  console.log("parse")
	// Need to handle braces for levels of CST
	var scopeLvl = 0;

	// Parse errors - defined by unexpected token in grammar rule
	var pErrors = 0;

	// New array to edit through parser, so orignial stream of tokens remains intact
	var stream = tkns;

	// Define a new CST object
	var cst = new Tree();

	// Break in line 
	outMessage("");

	// Output prasing programing #
	outMessage("INFO    PARSER -- Parsing program " + progNumber);

	// Start with program
  	program(stream);

}

function program(stream) {

	// Output found program
	outMessage("PARSER -- Found [Program]");

	// Goes to block
	block(tkns);
}

function block(stream) {
	// Finds a brace, goes to statement list
	// If no brace, then error
	if(stream[0].type == "L_BRACE"){

		// Output token found
		outMessage("PARSER -- Found [L_BRACE]");

		// If brace is found, remove from array
		stream.shift();

		// Call statement list
	  	stmtList(stream);
	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token [" + stream[0].kind +"] found where left brace was expected");

		// Add to errors
		pErrors++;
	}

	if(stream[0].type == "R_BRACE"){
    	return;
	}
}

function stmtList(stream) {
	console.log("stmtList")
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.
  	console.log(tkns[curToke].type)

	switch(tkns[curToke].type){
  		case "PRINT": //print
	  		printStmt(stream);
			break;
		case "ASSIGN": //assignment
	  		assignStmt(stream);
	  		break;
		case "IFSTMT": //if
  			ifStmt(stream);
	  		break;
  		case "V_TYPE": //varDecl
	  		varDecl(stream);
	  		break;
		case "WHILESTMT": //while
	  		whileStmt(stream);
	  		break;
		case "L_BRACE": //block
	  		block(stream);
	  		break;
	default:
    break;
  }

	// finds print, assign, var, while, or if statement, or block (brace)
	// If not, then error






}

function printStmt(stream) {
	var printStr = "";
	// finds print keyword, then parenthesis, then expression
	// If not, then error
	if(tkns[0].type == "QUOTE") {
		// Print found token
		outMessage("PARSER -- Found [QUOTE]");

		// Get rid of element
		stream.shift();

	  	while(tkns[0].type != "QUOTE") {
      		printStr += tkns[curToke].kind;
			curToke++
		}
	}
	outMessage("INFO    PARSER -- PRINT " + printStr);

	return;
}

function assignStmt(tkns) {
	curToke++;
	console.log("assignStmt")
	// finds ID, then assign, then expression
	// If not, then error

	expr(tkns);
}

function varDecl(tkns) {
	curToke++;
	if(tkns[curToke].type == "ID") {
		IDs[numIDs] = tkns[curToke].kind;
	}
	numIDs++;
	console.log(IDs)
	// finds type, then ID
	// If not, then error

}

function whileStmt(tkns) {
	curToke++;
	console.log("whileStmt")
	// finds while, then bool expression, then block
	// If not, then error

	boolExpr(tkns);
	block(tkns);
}

function ifStmt(tkns) {
	curToke++;
	console.log("ifStmt")
	// finds if, then bool expression, then block
	// If not, then error

	boolExpr(tkns);
	block(tkns);
}

function expr(tkns) {
	curToke++;
	console.log("expr")
	// finds int, string, or bool expression, or ID
	// If not, then error

	intExpr(tkns);
	stringExpr(tkns);
	boolExpr(tkns);
}

function intExpr(tkns) {
	curToke++;
	console.log("intExpr")
	// finds digit, then int operator, then expression
	// If not, then error

	expr(tkns);
}

function stringExpr(tkns) {
	curToke++;
	console.log("stringExpr")
	// finds quote, then charlist, then end quote
	// If not, then error

	charList(tkns);
}

function boolExpr(tkns) {
	curToke++;
	console.log("boolExpr")
	// finds paren, then expression, bool operator, then expression, then paren
	// If not, then error

	expr(tkns);
	expr(tkns);
}

function charList(tkns) {
	curToke++;
	console.log("charList")
	// finds char, then charlist
	// OR finds space, then charlist
	// If not, no error. Charlist can accept empty string

	charList(tkns);
}