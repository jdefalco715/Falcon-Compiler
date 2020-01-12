// Parser file
// Takes token stream, validates tokens to class grammar
// Function for (almost) every rule in grammar
	var pErrors = 0;
function parse(tkns, progNumber) {
  console.log("parse")
	// Need to handle braces for levels of CST
	var scopeLvl = 0;

	// Parse errors - defined by unexpected token in grammar rule


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
	block(stream);

	if(stream[0].type == "EOP") {

		// Output token found
		outMessage("PARSER -- Found [EOP]");

		if (pErrors == 0) {

			// Output parser success
			outMessage("INFO - PARSING SUCCESS! Parsing succeeded with " + pErrors + " errors.");

			// Display CST

			// Move to semantic analysis
			// Not sure yet if using CST or token stream for anaylsis
		} else {

			// Output parser failed
			outMessage("INFO -- PARSER FAILED! Parsing failed with " + pErrors + " errors.");

			// Do NOT display CST

			// Do NOT move to semantic analysis

		}
	}
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
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_BRACE [{] was expected");

		// Add to errors
		pErrors++;
	}

	if(stream[0].type == "R_BRACE"){

		// Output token found
		outMessage("PARSER -- Found [R_BRACE]");

		// Remove from array
		stream.shift();

    	return;
	}
}

function stmtList(stream) {
	console.log("stmtList")
	console.log(stream[0].type)
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.

	switch(stream[0].type){
  		case "PRINT": //print
      		stream.shift();
			printStmt(stream);
			break;
		case "ASSIGN": //assignment
		    stream.shift();
	  		assignStmt(stream);
	  		break;
		case "IFSTMT": //if
		    stream.shift();
  			ifStmt(stream);
	  		break;
  		case "V_TYPE": //varDecl
        	stream.shift();
			varDecl(stream);
	  		break;
		case "WHILESTMT": //while
        	stream.shift();
			whileStmt(stream);
	  		break;
		case "L_BRACE": //block
        	stream.shift();
			block(stream);
	  		break;
		default:
    		break;
	}

	return;

	// finds print, assign, var, while, or if statement, or block (brace)
	// If not, then error

}

function printStmt(stream) {
	console.log("Print")
	// finds print keyword, then parenthesis, then expression
	// If not, then error
	outMessage("INFO    PARSER -- PRINT " + expr(stream));


}

function assignStmt(stream) {

	console.log("assignStmt")
	// finds ID, then assign, then expression
	// If not, then error

	expr(stream);
}

function varDecl(stream) {

	// finds type, then ID
	// If not, then error

}

function whileStmt(stream) {

	console.log("whileStmt")
	// finds while, then bool expression, then block
	// If not, then error

	boolExpr(stream);
	block(stream);
}

function ifStmt(stream) {

	console.log("ifStmt")
	// finds if, then bool expression, then block
	// If not, then error

	boolExpr(stream);
	block(stream);
}

function expr(stream) {
	console.log("expr")
	// finds int, string, or bool expression, or ID
	// If not, then error
	if(stream[0].type == "QUOTE") {
	  return stringExpr(stream);
	} else if(stream[0].type == "DIGIT_r") {
		return intExpr(stream);
	}else if(stream[0].kind == "(") {
		return boolExpr(stream);
	}
}

function intExpr(stream) {
	console.log("intExpr")
	// finds digit, then int operator, then expression
	// If not, then error

}

function stringExpr(stream) {

	console.log("stringExpr")
	console.log(stream[0].type)
	if(stream[0].type == "QUOTE") {
		// Print found token
		outMessage("PARSER -- Found [QUOTE]");
		// Get rid of element
		stream.shift();
	}
	return charList(stream);
}

function boolExpr(stream) {

	console.log("boolExpr")
	// finds paren, then expression, bool operator, then expression, then paren
	// If not, then error

	expr(stream);
	expr(stream);
}

function charList(stream) {
  var stringList = "";
	console.log(stream[0].type)
	while(stream[0].type != "QUOTE") {
		stringList += stream[0].kind;
		stream.shift();
  }
	// finds char, then charlist
	// OR finds space, then charlist
	// If not, no error. Charlist can accept empty string
  console.log(stringList)
	return stringList;
}