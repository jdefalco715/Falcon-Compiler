// Takes token stream, validates tokens to class grammar

function parse(tkns, progNumber) {

	// Need to handle braces for levels of CST
	var scopeLvl = 0;

	// Parse errors - defined by unexpected token in grammar rule
	var pErrors = 0;

	// Define a new CST object 
	var cst = new Tree();

	// Break in output
	outMessage("");

	// Output prasing programing #
	outMessage("INFO    PARSER -- Parsing program " + progNumber);
	
	// Start with program
	// program();

}

function program() {
	// Goes to block
	block();

	// Looks for EOP
}

function block() {
	// Finds a brace, goes to statement list
	// If no brace, then error

	// Looks for left brace

	// Looks for stmtList
	stmtList();

	// Looks for right brace

}

function stmtList() {
	// finds a statment
	// If not, no error. Statement list can accept empty string. Find brace.

	stmt();
}

function stmt() {
	// finds print, assign, var, while, or if statement, or block (brace)
	// If not, then error

	printStmt();
	assignStmt();
	varDecl();
	whileStmt();
	ifStmt();
	block();

}

function printStmt() {
	// finds print keyword, then parenthesis, then expression
	// If not, then error

	expr();
}

function assignStmt() {
	// finds ID, then assign, then expression
	// If not, then error

	expr();
}

function varDecl() {
	// finds type, then ID
	// If not, then error


}

function whileStmt() {
	// finds while, then bool expression, then block
	// If not, then error

	boolExpr();
	block();
}

function ifStmt() {
	// finds if, then bool expression, then block
	// If not, then error

	boolExpr();
	block();
}

function expr() {
	// finds int, string, or bool expression, or ID
	// If not, then error

	intExpr();
	stringExpr();
	boolExpr();
}

function intExpr() {
	// finds digit, then int operator, then expression
	// If not, then error

	expr();
}

function stringExpr() {
	// finds quote, then charlist, then end quote
	// If not, then error

	charList();
}

function boolExpr() {
	// finds paren, then expression, bool operator, then expression, then paren
	// If not, then error

	expr();
	expr();
}

function charList() {
	// finds char, then charlist
	// OR finds space, then charlist
	// If not, no error. Charlist can accept empty string

	charList();
}