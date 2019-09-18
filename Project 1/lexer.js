// Lex file

// Array of tokens for parsing
var tokens = [];

//Function takes input as parameter
function lexer(){
	// Variable that recieves source code as string
	// Id is marked as 'Source Code', will be defined in HTML file
	// HTML file has not been implemented yet
	var source = document.getElementById("sc").value;

	// Trim whitespace
	source = trim(source);

	// Defining tokens from the class grammar
	// EOP
	var EOP = /'\$$'/;
	// Left brace
	var L_BRACE = /'{$'/;
	// Right brace
	var R_BRACE = /'}$'/;
	// Left paren
	var L_PAREN = /'\($'/;
	// Right paren
	var R_PAREN = /'\)$'/;
	// Print
	var PRINT = /'print$'/;
	// While
	var WHILE = /'while$'/;
	// If
	var IF = /'if$'/;
	// Quotation mark
	var QUOTE = /'"$'/; 
	// Int
	var INT = /'int$'/;
	// String
	var STRING = /'string$'/;
	// Boolean
	var BOOLEAN = /'boolean$'/;
	// Char 
	var CHAR = /'[a-z]$'/;
	// Id
	var ID = /'[a-z]$'/;
	// Space
	var SPACE = /'\s$'/;
	// Digit
	var DIGIT = /'[0-9]+$'/;
	// Equals Boolean Op
	var EQUALS = /'\=\=$'/;
	// Not Equals Boolean Op
	var NOT_EQUALS = /'\!\=$'/;
	// Addition Operator
	var ADD = /'\+$'/;
	// Assign Operator
	var ASSIGN = /'\='/;
}