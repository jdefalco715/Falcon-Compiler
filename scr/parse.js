// Takes token stream, validates tokens to class grammar

function parse(tkns) {

	// Need to handle braces for levels of CST
	var scopeLvl = 0;
	
	// Function for each rule in grammar, this program can be linear
	// Includes: 
	// Program
	// Block
	// Statement List
	// Statement
	// PrintStatement
	// AssignmentStatement
	// VarDecl
	// WhileStatement
	// IfStatement
	// Expr
	// IntExpr
	// StringExpr
	// BooleanExpr
	// ID
	// Charlist

	// Need to build CST -- look into js Tree object
	// may need to define your own

	// First and follow sets

	// Errors are when unexpected tokens appear on the wrong rules
	// If any errors, parse fails and CST is not displayed
}

function program() {

}

function block() {

}

function stmtList() {

}

function stmt() {

}

function printStmt() {

}

function assignStmt() {

}

function varDecl() {

}

function whileStmt() {

}

function ifStmt() {

}

function expr() {

}

function intExpr() {

}

function stringExpr() {

}

function boolExpr() {

}

function charList() {

}