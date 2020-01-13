// Parser file
// Takes token stream, validates tokens to class grammar
// Function for (almost) every rule in grammar

// Parse errors - defined by unexpected token in grammar rule
var pErrors = 0;

var stream = [];

function parse(tkns, progNumber) {
	// Need to handle braces for levels of CST
	var scopeLvl = 0;

	// New array to edit through parser, so orignial stream of tokens remains intact
	stream = tkns;

	// Initialize error count
	pErrors = 0;

	// Define a new CST object
	var cst = new Tree();

	// Break in line
	outMessage("");

	// Output prasing programing #
	outMessage("INFO   PARSER -- Parsing program " + progNumber);

	// Start with program
  	program(stream);

  	if (pErrors == 0) {

		// Output parser success
		outMessage("INFO   PARSING SUCCESS! -- Parsing succeeded with " + pErrors + " errors.");

		// Display CST

		// Move to semantic analysis
		// Not sure yet if using CST or token stream for anaylsis

	} else {

		// Output parser failed
		outMessage("INFO   PARSER FAILED! -- Parsing failed with " + pErrors + " errors.");

		// Do NOT display CST

		// Do NOT move to semantic analysis

	}

}

function program(stream) {

	// Output found program
	outMessage("PARSER RULE -- Found [Program]");

	// Goes to block
	block(stream);

	// Check for EOP token
	if(stream[0].type == "EOP") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [EOP]");

	}

	return;
}

function block(stream) {
	// Finds a brace, goes to statement list
	// If no brace, then error

	// Display found block
	outMessage("PARSER RULE -- Found [Block]");

	if(stream[0].type == "L_BRACE") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [L_BRACE]");

		// If brace is found, remove from array
		stream.shift();

		// Call statement list
	  	stmtList(stream);

	  	if(stream[0].type == "R_BRACE") {

			// Output token found
			outMessage("PARSER TOKEN -- Found token [R_BRACE]");

			// Remove from array
			stream.shift();

		} else {

			// Output unexpected token found
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where R_BRACE [}] was expected");

			// Add to errors
			pErrors++;

			//Remove from array
			stream.shift();
		}

	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_BRACE [{] was expected");

		// Add to errors
		pErrors++;

		// Remove from array
		stream.shift();
	}

	return;
}

function stmtList(stream) {
	console.log("stmtList: " + stream[0].type);
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.

	// Display found block
	outMessage("PARSER RULE -- Found [StatementList]");

	// As long is there is not an empty statement, will call statement function
	// NOT SURE IF UNDEFINED IS CORRECT CALL
	if (stream[0].type != ' ') {
		stmt(stream);
	}

	return;
	// If not, then error

}

function stmt(stream) {
	// Print found rule
	outMessage("PARSER RULE -- Found [Statement]");

	switch(stream[0].type){

  		case "PRINT": //print
			printStmt(stream);
			stmt(stream);
			break;

		case "ASSIGN": //assignment
			assignStmt(stream);
			stmt(stream);
	  		break;

		case "IFSTMT": //if
			ifStmt(stream);
			stmt(stream);
	  		break;

  		case "V_TYPE": //varDecl
  			varDecl(stream);
			stmt(stream);
	  		break;

		case "WHILESTMT": //while
			whileStmt(stream);
			stmt(stream);
	  		break;

		case "L_BRACE": //block
			block(stream);
			stmt(stream);
	  		break;

	  	default: // empty statement, should return to break recursion
	  		return;
	  		break;

	}
}

function printStmt(stream) {
	// finds print keyword, then parenthesis, then expression
	// If not, then error
	outMessage("PARSER RULE -- Found [PrintStatement]");

	// Output found print token (found in stmtList)
	outMessage("PARSER TOKEN -- Found token [PRINT]")

	// Remove from array
	stream.shift();

	if (stream[0].type == "L_PAREN" ) {

		// Output found left paren token
		outMessage("PARSER TOKEN -- Found token [L_PAREN]");

		// Remove from array
		stream.shift();

		// Call expr
		expr(stream);

		if (stream[0].type == "R_PAREN") {

			// Output token found 
			outMessage("PARSER TOKEN -- Found token [R_PAREN]");

			// Remove from array
			stream.shift();

		} else {

			//Output error
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_PAREN [(] was expected");

			// Add to errors
			pErrors++;

			// Remove from array
			stream.shift();

		}

	} else {

		//Output error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_PAREN [(] was expected");

		// Add to errors
		pErrors++;

		// Remove from array
		stream.shift();
	}

	return;

}

function assignStmt(stream) {
	// finds ID, then assign, then expression
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [AssignStatement]");

	// Print found token 
	outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

	// Remove from array
	stream.shift();

	if(stream[0].type == "ASSIGN") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [ASSIGN]");

		// Remove from array
		stream.shift();

		// Call expression
		expr(stream);
	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ASSIGN was expected");

		// Add to error counter 
		pErrors++;

		// Remove from array
		stream.shift();
	}

	return;
}

function varDecl(stream) {
	// finds type, then ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [VarDeclaration]");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [V_TYPE] - " + stream[0].kind);

	// Remove from array 
	stream.shift();

	if (stream[0].type == "ID") {

		//Print found token
		outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

		// Remove from array
		stream.shift();

	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ID was expected");

		// Add to errors
		pErrors++;

		// Remove from array
		stream.shift();
	}

	return;
}

function whileStmt(stream) {
	// finds while, then bool expression, then block
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [WhileStatement]");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [WHILE]");

	// remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream);

	// Call block
	block(stream);

	return;
}

function ifStmt(stream) {
	// finds if, then calls bool expression, then calls block

	// Print found rule
	outMessage("PARSER RULE -- Found [IfStatement]");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [IF]");

	// remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream);

	// Call block
	block(stream);

	return;
}

function expr(stream) {
	// finds int, string, or bool expression, or ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [Expression]");

	if (stream[0].type == "QUOTE") {

		stringExpr(stream);

	} else if (stream[0].type == "DIGIT_r") {

		intExpr(stream);

	}else if (stream[0].type == "L_PAREN" || stream[0].type == "BOOL_T" || stream[0].type == "BOOL_F") {

		boolExpr(stream);

	} else if (stream[0].type == "ID") {
		
		// Print found token
		outMessage("PARSER TOKEN -- Found token [ID]");

		// Remove from stream
		stream.shift();

	}

	return;
}

function intExpr(stream) {
	// finds digit, then int operator, then expression
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [IntExpression]");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [DIGIT]");

	// Remove from array
	stream.shift();

	if (stream[0].type == "PLUS") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [PLUS]");

		// Remove from array
		stream.shift();

		expr(stream);
	}

	return;
}

function stringExpr(stream) {

	// Print found rule
	outMessage("PARSER RULE -- Found [StringExpression]");

	if(stream[0].type == "QUOTE") {
		// Print found token
		outMessage("PARSER TOKEN -- Found token [QUOTE]");

		// Get rid of element
		stream.shift();

		// Print found rule
		// Printing this here instead of inside charList because charList is recursive
		// Would print for every token within string
		outMessage("PARSER RULE -- Found [CharList]");

		// Call charList
		charList(stream);

		if (stream[0].type == "QUOTE") {
			// Print found token
			outMessage("PARSER TOKEN -- Found token [QUOTE]");

			// Get rid of element
			stream.shift();
		}

	} else {
		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where QUOTE [\"] was expected");

		// Add to errors
		pErrors++;

		// Remove from array 
		stream.shift();
	}

	return;
}

function boolExpr(stream) {
	// finds paren, then expression, bool operator, then expression, then paren
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [BooleanExpression]");

	// Check if it is conditional statement
	if (stream[0].type == "L_PAREN") {

		// Print found token 
		outMessage("PARSER TOKEN -- Found token [L_PAREN]");

		// Remove from array
		stream.shift();

		// Call expression
		expr(stream);

		// Expect boolop
		if (stream[0].type == "ISEQUAL" || stream[0].type == "NOTEQUAL") {

			// Print found token
			outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "]");

			// Remove from array
			stream.shift();
		} else {

			// Print error
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ISEQUAL [==] or NOTEQUAL [!=] was expected");

			// Add to error counter
			pErrors;

			// Remove from array
			stream.shift();
		}

		// Call expression (again)
		expr(stream);

		// Check for closing brace
		if (stream[0].type == "R_PAREN") {

			// Print found token
			outMessage("PARSER TOKEN -- Found token [R_PAREN]");

			// Remove from array
			stream.shift();

		} else {

			// Print error
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where R_PAREN [)] was expected");

			// Add to error counter
			pErrors;

			// Remove from array
			stream.shift();
		}

	} else if (stream[0].type == "BOOL_F" || stream[0].type== "BOOL_T") {
		// If not conditional statement, then check for bool value

		// Print found token
		outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "]");

		// Remove from array
		stream.shift();

	} else {
		// Shouldn't get here with how program is structured, but putting here to be safe

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where BOOLEXPR was expected");

		// Add to error counter
		pErrors++;

		// Remove from array
		stream.shift();
	}

	return;

}

function charList(stream) {

	if (stream[0].type == "CHAR" || stream[0].type == "SPACE") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "] - " + stream[0].kind);

		// Remove from array
		stream.shift();

		// call Charlist
		charList(stream);
	}

	return;
}