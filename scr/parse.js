// Parser file
// Takes token stream, validates tokens to class grammar
// Function for (almost) every rule in grammar

// Parse errors - defined by unexpected token in grammar rule
var pErrors = 0;

var stream = [];

var braceLvl = 0;



function parse(tkns, progNumber) {
	// Need to handle braces for levels of CST
	var scopeLvl = 0;

	// New array to edit through parser, so orignial stream of tokens remains intact
	stream = tkns;

	// Initialize error count
	pErrors = 0;

	// Define a new CST object
	var cst = new Tree();

	// Add node
	cst.addNode("Root", "branch");

	// Break in line
	outMessage("");

	// Output prasing programing #
	outMessage("INFO   PARSER -- Parsing program " + progNumber);

	// Start with program
  	program(stream , cst);

  	if (pErrors == 0) {

		// Output parser success
		outMessage("INFO   PARSING SUCCESS! -- Parsing succeeded with " + pErrors + " errors.");

		// Break in log
		outMessage("");

		// Display CST
		outMessage(cst.toString());

		// Move to semantic analysis
		// Not sure yet if using CST or token stream for anaylsis

	} else {

		// Output parser failed
		outMessage("INFO   PARSER FAILED! -- Parsing failed with " + pErrors + " errors.");

		// Do NOT display CST

		// Do NOT move to semantic analysis

	}

}

function program(stream, cst) {

	// Output found program
	outMessage("PARSER RULE -- Found [Program]");

	cst.addNode("Program", "branch");

	// Goes to block
	block(stream, cst);

	// Check for EOP token
	if(stream[0].type == "EOP") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [EOP]");

		// Add node for token
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

	}

	cst.endChild();

	return;
}

function block(stream, cst) {
	// Finds a brace, goes to statement list
	// If no brace, then error

	// Display found block
	outMessage("PARSER RULE -- Found [Block]");


	if(stream[0].type == "L_BRACE") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [L_BRACE]");

		// Add node for token
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Increment brace level
		braceLvl++;

		// Ouptut brace level
		outMessage("INFO   PARSER -- current scope level is : " + braceLvl);

		cst.addNode("Block", "branch");

		// If brace is found, remove from array
		stream.shift();

		// Call statement list
	  	stmtList(stream, cst);

	  	if(stream[0].type == "R_BRACE") {

			// Output token found
			outMessage("PARSER TOKEN -- Found token [R_BRACE]");

			// Add node for token
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

			// Increment brace level
			braceLvl--;

			// Ouptut brace level
			outMessage("INFO   PARSER -- current scope level is : " + braceLvl);

			// Move branch
			cst.endChild();

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

function stmtList(stream, cst) {
	console.log("stmtList: " + stream[0].type);
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.

	// Display found block
	outMessage("PARSER RULE -- Found [StatementList]");

	// Add node to cst
	cst.addNode("StatementList", "branch");

	// As long is there is not an empty statement, will call statement function
	// NOT SURE IF UNDEFINED IS CORRECT CALL
	if (stream[0].type != ' ') {
		stmt(stream, cst);
	}

	cst.endChild();

	return;
	// If not, then error

}

function stmt(stream, cst) {
	// Print found rule
	outMessage("PARSER RULE -- Found [Statement]");

	// Add node to cst
	cst.addNode("Statement", "branch");

	switch(stream[0].type){

  		case "PRINT": // Print
			printStmt(stream, cst);
			stmt(stream, cst);
			break;

	  	case "ID":      // ID
	  		cst.addNode("ID", "branch");
	  		assignStmt(stream, cst);
	  		stmt(stream, cst);
	  		break;

		case "ASSIGN": // Assignment
			assignStmt(stream, cst);
			stmt(stream, cst);
	  		break;

		case "IFSTMT": // If
			ifStmt(stream, cst);
			stmt(stream, cst);
	  		break;

  		case "V_TYPE": // varDecl
  			varDecl(stream, cst);
			stmt(stream, cst);
	  		break;

		case "WHILESTMT": // While
			whileStmt(stream, cst);
			stmt(stream, cst);
	  		break;

		case "L_BRACE": // Block
			block(stream, cst);
			stmt(stream, cst);
	  		break;



	  	default: // Empty statement, should return to break recursion
	  		cst.endChild();
	  		return;
	  		break;

	}
}

function printStmt(stream, cst) {
	// Finds print keyword, then parenthesis, then expression
	// If not, then error
	outMessage("PARSER RULE -- Found [PrintStatement]");

	// Add node to cst
	cst.addNode("PrintStatement", "branch");

	// Output found print token (found in stmtList)
	outMessage("PARSER TOKEN -- Found token [PRINT]")

	// Add token to token
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	if (stream[0].type == "L_PAREN" ) {

		// Output found left paren token
		outMessage("PARSER TOKEN -- Found token [L_PAREN]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

		// Call expr
		expr(stream, cst);

		if (stream[0].type == "R_PAREN") {

			// Output token found 
			outMessage("PARSER TOKEN -- Found token [R_PAREN]");

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

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

function assignStmt(stream, cst) {
	// Finds ID, then assign, then expression
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [AssignStatement]");

	// Add node to cst
	cst.addNode("AssignStatement", "branch");

	// Print found token 
	outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	if(stream[0].type == "ASSIGN") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [ASSIGN]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

		// Call expression
		expr(stream, cst);
	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ASSIGN was expected");

		// Add to error counter 
		pErrors++;

		// Remove from array
		stream.shift();
	}

	endChild();

	return;
}

function varDecl(stream, cst) {
	// Finds type, then ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [VarDeclaration]");

	// Add node to cst
	cst.addNode("VarDeclaration", "branch");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [V_TYPE] - " + stream[0].kind);

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array 
	stream.shift();

	if (stream[0].type == "ID") {

		//Print found token
		outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

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

	endChild();

	return;
}

function whileStmt(stream, cst) {
	// Finds while, then bool expression, then block
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [WhileStatement]");

	// Add node to cst
	cst.addNode("WhileStatement", "branch");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [WHILE]");

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream, cst);

	// Call block
	block(stream, cst);

	endChild();

	return;
}

function ifStmt(stream, cst) {
	// Finds if, then calls bool expression, then calls block

	// Print found rule
	outMessage("PARSER RULE -- Found [IfStatement]");

	// Add node to cst
	cst.addNode("IfStatement", "branch");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [IF]");

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream, cst);

	// Call block
	block(stream, cst);

	// Move branches
	cst.endChild();

	return;
}

function expr(stream, cst) {
	// Finds int, string, or bool expression, or ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [Expression]");

	// Add node to cst
	cst.addNode("Expression", "branch");

	if (stream[0].type == "QUOTE") {

		stringExpr(stream, cst);

	} else if (stream[0].type == "DIGIT_r") {

		intExpr(stream, cst);

	}else if (stream[0].type == "L_PAREN" || stream[0].type == "BOOL_T" || stream[0].type == "BOOL_F") {

		boolExpr(stream, cst);

	} else if (stream[0].type == "ID") {
		
		// Print found token
		outMessage("PARSER TOKEN -- Found token [ID]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from stream
		stream.shift();

	}

	cst.endChild();

	return;
}

function intExpr(stream, cst) {
	// Finds digit, then int operator, then expression
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [IntExpression]");

	// Add node to cst
	cst.addNode("IntExpression", "branch");

	// Print found token
	outMessage("PARSER TOKEN -- Found token [DIGIT]");

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	if (stream[0].type == "PLUS") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [PLUS]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

		expr(stream, cst);
	}

	return;
}

function stringExpr(stream, cst) {

	// Print found rule
	outMessage("PARSER RULE -- Found [StringExpression]");

	// Add node to cst
	cst.addNode("StringExpression", "branch");

	if(stream[0].type == "QUOTE") {
		// Print found token
		outMessage("PARSER TOKEN -- Found token [QUOTE]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Get rid of element
		stream.shift();

		// Print found rule
		// Printing this here instead of inside charList because charList is recursive
		// Would print for every token within string

		//Output found rule
		outMessage("PARSER RULE -- Found [CharList]");

		// Add node to cst
		cst.addNode("CharList", "branch");

		// Call charList
		charList(stream, cst);

		if (stream[0].type == "QUOTE") {
			// Print found token
			outMessage("PARSER TOKEN -- Found token [QUOTE]");

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

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

function boolExpr(stream, cst) {
	// Finds paren, then expression, bool operator, then expression, then paren
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [BooleanExpression]");

	// Check if it is conditional statement
	if (stream[0].type == "L_PAREN") {

		// Print found token 
		outMessage("PARSER TOKEN -- Found token [L_PAREN]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

		// Call expression
		expr(stream, cst);

		// Expect boolop
		if (stream[0].type == "ISEQUAL" || stream[0].type == "NOTEQUAL") {

			// Print found token
			outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "]");

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

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
		expr(stream, cst);

		// Check for closing brace
		if (stream[0].type == "R_PAREN") {

			// Print found token
			outMessage("PARSER TOKEN -- Found token [R_PAREN]");

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

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

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

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

function charList(stream, cst) {

	if (stream[0].type == "CHAR" || stream[0].type == "SPACE") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "] - " + stream[0].kind);

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

		// call Charlist
		charList(stream, cst);
	}

	return;
}