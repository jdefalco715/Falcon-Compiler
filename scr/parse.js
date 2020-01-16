// Parser file
// Takes token stream, validates tokens to class grammar
// Function for (almost) every rule in grammar

// Parse errors - defined by unexpected token in grammar rule
var pErrors = 0;

var stream = [];

var braceLvl = 0;

// Array of nodes from ast, sent to semantic analyzer for analysis
var analyseList = [];


function parse(tkns, progNumber) {

	// New array to edit through parser, so orignial stream of tokens remains intact
	stream = tkns;

	// Initialize error count
	pErrors = 0;

	// Define a new CST object
	var cst = new Tree();

	// Define a new AST object
	var ast = new Tree();

	// Add node
	cst.addNode("Root", "branch");

	// Break in line
	outMessage("");

	// Output prasing programing #
	outMessage("INFO   PARSER -- Parsing program " + progNumber);

	outMessage("INFO   PARSER -- current scope level is : " + braceLvl);

	// Start with program
  	program(stream, cst, ast);

  	if (pErrors == 0) {

		// Output parser success
		outMessage("INFO   PARSING SUCCESS! -- Parsing succeeded with " + pErrors + " errors.");

		// Break in log
		outMessage("");

		// Output header for CST
		outMessage("INFO   CST - Displaying CST for program " + progNumber);

		// Display CST
		outMessage(cst.toString());

		// Move to semantic analysis
		// Not sure yet if using CST or token stream for anaylsis
		analyze(analyseList, progNumber);

		// Test AST
		outMessage("");
		outMessage("INFO   AST - Displaying AST for program " + progNumber);
		outMessage(ast.toString());

	} else {

		// Output parser failed
		outMessage("INFO   PARSER FAILED! -- Parsing failed with " + pErrors + " errors.");

		// Do NOT display CST

		// Do NOT move to semantic analysis

	}

}

function program(stream, cst, ast) {

	// Output found program
	outMessage("PARSER RULE -- Found [Program]");

	cst.addNode("Program", "branch");

	// Goes to block
	block(stream, cst, ast);

	// Check for EOP token
	if(stream[0].type == "EOP") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [EOP]");

		// Add node for token
		cst.addNode(stream[0].kind, "leaf");

	}

	cst.endChild();

	return;
}

function block(stream, cst, ast) {
	// Finds a brace, goes to statement list
	// If no brace, then error

	// Display found block
	outMessage("PARSER RULE -- Found [Block]");

	// Add node to CST
	cst.addNode("Block", "branch");

	// Add node to AST
	ast.addNode("BLOCK", "branch");

	addAnalyseEntry("Block", "statement", stream[0].line);

	if(stream[0].type == "L_BRACE") {

		// Output token found
		outMessage("PARSER TOKEN -- Found token [L_BRACE]");

		// Add node for token
		cst.addNode(stream[0].kind, "leaf");

		// Increment brace level
		braceLvl++;

		// Ouptut brace level
		outMessage("INFO   PARSER -- current scope level is : " + braceLvl);

		// If brace is found, remove from array
		stream.shift();

		// Call statement list
	  	stmtList(stream, cst, ast);

	  	if(stream[0].type == "R_BRACE") {

			// Output token found
			outMessage("PARSER TOKEN -- Found token [R_BRACE]");

			cst.endChild();

			// Add node for token
			cst.addNode(stream[0].kind, "leaf");

			// Move branches
			cst.endChild();

			// Increment brace level
			braceLvl--;

			// Ouptut brace level
			outMessage("INFO   PARSER -- current scope level is : " + braceLvl);

			// Remove from array
			stream.shift();

		} else {

			// Output unexpected token found
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where R_BRACE [}] was expected at (" + stream[0].line + ":" + stream[0].column +")");

			// Add to errors
			pErrors++;

			//Remove from array
			stream.shift();
		}

	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_BRACE [{] was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to errors
		pErrors++;

		// Remove from array
		stream.shift();
	}

	// Move branches
	cst.endChild();

	return;
}

function stmtList(stream, cst, ast) {
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.

	// Display found block
	outMessage("PARSER RULE -- Found [StatementList]");

	// Add node to cst
	cst.addNode("StatementList", "branch");

	// As long is there is not an empty statement, will call statement function
	// NOT SURE IF UNDEFINED IS CORRECT CALL
	if (stream[0].type != ' ') {
		stmt(stream, cst, ast);
	}

	cst.endChild();

	return;
	// If not, then error

}

function stmt(stream, cst, ast) {

	switch(stream[0].type){

  		case "PRINT": // Print
  			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
			printStmt(stream, cst, ast);
			stmt(stream, cst, ast);
			break;

	  	case "ID":      // ID
	  		// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
	  		cst.addNode("ID", "branch");
	  		assignStmt(stream, cst, ast);
	  		stmt(stream, cst, ast);
	  		break;

		case "ASSIGN": // Assignment
			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
			assignStmt(stream, cst, ast);
			stmt(stream, cst, ast);
	  		break;

		case "IFSTMT": // If
			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
			ifStmt(stream, cst, ast);
			stmt(stream, cst, ast);
	  		break;

  		case "V_TYPE": // varDecl
  			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
  			varDecl(stream, cst, ast);
			stmt(stream, cst, ast);
	  		break;

		case "WHILESTMT": // While
			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
			whileStmt(stream, cst, ast);
			stmt(stream, cst, ast);
	  		break;

		case "L_BRACE": // Block
			// Print found rule
			outMessage("PARSER RULE -- Found [Statement]");
			// Add node to cst
			cst.addNode("Statement", "branch");
			block(stream, cst, ast);
			stmt(stream, cst, ast);
	  		break;

	  	default: // Empty statement, should return to break recursion
	  		return;
	  		break;

	}
}

function printStmt(stream, cst, ast) {
	// Finds print keyword, then parenthesis, then expression
	// If not, then error
	outMessage("PARSER RULE -- Found [PrintStatement]");

	// Add node to CST
	cst.addNode("PrintStatement", "branch");

	// Add node to AST
	ast.addNode("PrintStatement", "branch");

	addAnalyseEntry("PrintStatement", "statement", stream[0].line);

	// Output found print token (found in stmtList)
	outMessage("PARSER TOKEN -- Found token [PRINT]")

	// Add token to token
	cst.addNode(stream[0].kind, "leaf");

	// Remove from array
	stream.shift();

	if (stream[0].type == "L_PAREN" ) {

		// Output found left paren token
		outMessage("PARSER TOKEN -- Found token [L_PAREN]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Remove from array
		stream.shift();

		// Call expr
		expr(stream, cst, ast);

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
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_PAREN [(] was expected at (" + stream[0].line + ":" + stream[0].column +")");

			// Add to errors
			pErrors++;

			// Remove from array
			stream.shift();

		}

	} else {

		//Output error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where L_PAREN [(] was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to errors
		pErrors++;

		// Remove from array
		stream.shift();
	}

	// Move branches
	cst.endChild();

	ast.endChild();

	return;

}

function assignStmt(stream, cst, ast) {
	// Finds ID, then assign, then expression
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [AssignStatement]");

	// Add node to cst
	cst.addNode("AssignStatement", "branch");

	// Add node to AST
	ast.addNode("AssignStatement", "branch");

	addAnalyseEntry("AssignStatement", "statement", stream[0].line);

	// Print found token 
	outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Add ID value to ast
	ast.addNode(stream[0].kind, "leaf");

	addAnalyseEntry(stream[0].kind, "token", stream[0].line);

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
		expr(stream, cst, ast);
	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ASSIGN was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to error counter 
		pErrors++;

		// Remove from array
		stream.shift();
	}

	ast.endChild();

	return;
}

function varDecl(stream, cst, ast) {
	// Finds type, then ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [VarDeclaration]");

	// Add node to cst
	cst.addNode("VarDeclaration", "branch");

	// Add node to ast
	ast.addNode("VarDeclaration", "branch");

	addAnalyseEntry("VarDeclaration", "statement", stream[0].line);

	// Print found token
	outMessage("PARSER TOKEN -- Found token [V_TYPE] - " + stream[0].kind);

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Add type value to ast
	ast.addNode(stream[0].kind, "leaf");

	addAnalyseEntry(stream[0].kind, "token", stream[0].line);

	// Remove from array
	stream.shift();

	if (stream[0].type == "ID") {

		//Print found token
		outMessage("PARSER TOKEN -- Found token [ID] - " + stream[0].kind);

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Add ID value to ast
		ast.addNode(stream[0].kind, "leaf");

		addAnalyseEntry(stream[0].kind, "token", stream[0].line);

		// Remove from array
		stream.shift();

	} else {

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ID was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to errors
		pErrors++;
	}

	// Move branches
	cst.endChild();

	cst.endChild();

	ast.endChild();

	return;
}

function whileStmt(stream, cst, ast) {
	// Finds while, then bool expression, then block
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [WhileStatement]");

	// Add node to cst
	cst.addNode("WhileStatement", "branch");

	// Add node to ast
	ast.addNode("WhileStatement", "branch");

	addAnalyseEntry("WhileStatement", "statement", stream[0].line);

	// Print found token
	outMessage("PARSER TOKEN -- Found token [WHILE]");

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream, cst, ast);

	// Call block
	block(stream, cst, ast);

	cst.endChild();

	ast.endChild();

	return;
}

function ifStmt(stream, cst, ast) {
	// Finds if, then calls bool expression, then calls block

	// Print found rule
	outMessage("PARSER RULE -- Found [IfStatement]");

	// Add node to cst
	cst.addNode("IfStatement", "branch");

	// Add node to ast
	ast.addNode("IfStatement", "branch");

	addAnalyseEntry("IfStatement", "statement", stream[0].line);

	// Print found token
	outMessage("PARSER TOKEN -- Found token [IF]");

	// Add token to cst
	cst.addNode(stream[0].kind, "leaf");

	// Move branches
	cst.endChild();

	// Remove from array
	stream.shift();

	// Call boolean expression
	boolExpr(stream, cst, ast);

	// Call block
	block(stream, cst, ast);


	// Move branches
	cst.endChild();

	ast.endChild();

	return;
}

function expr(stream, cst, ast) {
	// Finds int, string, or bool expression, or ID
	// If not, then error

	// Print found rule
	outMessage("PARSER RULE -- Found [Expression]");

	// Add node to cst
	cst.addNode("Expression", "branch");

	if (stream[0].type == "QUOTE") {

		stringExpr(stream, cst, ast);

	} else if (stream[0].type == "DIGIT") {

		intExpr(stream, cst, ast);

	}else if (stream[0].type == "L_PAREN" || stream[0].type == "BOOL_T" || stream[0].type == "BOOL_F") {

		boolExpr(stream, cst, ast);

	} else if (stream[0].type == "ID") {
		
		// Print found token
		outMessage("PARSER TOKEN -- Found token [ID]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Add ID value to ast
		ast.addNode(stream[0].kind, "leaf");

		addAnalyseEntry(stream[0].kind, "token", stream[0].line);

		// Remove from stream
		stream.shift();

	}

	cst.endChild();

	return;
}

function intExpr(stream, cst, ast) {
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

	// Add digit value to ast
	ast.addNode(stream[0].kind, "leaf");

	addAnalyseEntry(stream[0].kind, "token", stream[0].line);

	// Remove from array
	stream.shift();

	if (stream[0].type == "PLUS") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [PLUS]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Remove from array
		stream.shift();

		expr(stream, cst, ast);
	}

	ast.endChild();

	return;
}

function stringExpr(stream, cst, ast) {

	// Print found rule
	outMessage("PARSER RULE -- Found [StringExpression]");

	// Add node to cst
	cst.addNode("StringExpression", "branch");

	if(stream[0].type == "QUOTE") {
		// Print found token
		outMessage("PARSER TOKEN -- Found token [QUOTE]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Get rid of element
		stream.shift();

		// Print found rule
		// Printing this here instead of inside charList because charList is recursive
		// Would print for every token within string

		//Output found rule
		outMessage("PARSER RULE -- Found [CharList]");

		// Add node to cst
		cst.addNode("CharList", "branch");

		// Variable to hold string for ast
		var stringValue = "";

		// Call charList
		charList(stream, cst, stringValue);

		// Add string to ast
		ast.addNode(stringValue, "leaf");

		addAnalyseEntry(stringValue, "token", stream[0].line);

		if (stream[0].type == "QUOTE") {
			// Print found token
			outMessage("PARSER TOKEN -- Found token [QUOTE]");

			// Move branches
			cst.endChild();

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Get rid of element
			stream.shift();
		}

	} else {
		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where QUOTE [\"] was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to errors
		pErrors++;
	}

	ast.endChild();

	return;
}

function boolExpr(stream, cst, ast) {
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
		expr(stream, cst, ast);

		// Expect boolop
		if (stream[0].type == "ISEQUAL" || stream[0].type == "NOTEQUAL") {

			// Print found token
			outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "]");

			// Add token to cst
			cst.addNode(stream[0].kind, "leaf");

			// Remove from array
			stream.shift();
		} else {

			// Print error
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where ISEQUAL [==] or NOTEQUAL [!=] was expected at (" + stream[0].line + ":" + stream[0].column +")");

			// Add to error counter
			pErrors;
		}

		// Call expression (again)
		expr(stream, cst, ast);

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
			outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where R_PAREN [)] was expected at (" + stream[0].line + ":" + stream[0].column +")");

			// Add to error counter
			pErrors;
		}

	} else if (stream[0].type == "BOOL_F" || stream[0].type== "BOOL_T") {
		// If not conditional statement, then check for bool value

		// Print found token
		outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "]");

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Add token value to ast
		ast.addNode(stream[0].kind, "leaf");

		addAnalyseEntry(stream[0].kind, "token", stream[0].line);

		// Move branches
		cst.endChild();

		// Remove from array
		stream.shift();

	} else {
		// Shouldn't get here with how program is structured, but putting here to be safe

		// Print error
		outMessage("PARSER ERROR!-- Unexpected token " + stream[0].type + " [" + stream[0].kind +"] found where BOOLEXPR was expected at (" + stream[0].line + ":" + stream[0].column +")");

		// Add to error counter
		pErrors++;
	}

	ast.endChild();

	return;

}

function charList(stream, cst, stringValue) { 

	if (stream[0].type == "CHAR" || stream[0].type == "SPACE") {

		// Print found token
		outMessage("PARSER TOKEN -- Found token [" + stream[0].type + "] - " + stream[0].kind);

		// Add token to cst
		cst.addNode(stream[0].kind, "leaf");

		// Add char found to string
		stringValue = stringValue + stream[0].kind;

		// Remove from array
		stream.shift();

		// call Charlist
		charList(stream, cst, stringValue);
	}

	return;
}

// Add entry to analyseList array
function addAnalyseEntry(name, type, line) {
	// Temporary value to add to array of ast entries
	var temp = new astObject(name, type line);

	// Add entry to array
	analyseList.push(temp);
}