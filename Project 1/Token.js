// Defining tokens from the class grammar:
	
	// Print (lowercase r for regex)
	var PRINT_r = /print$/; 
	// While
	var WHILE_r = /while$/;
	// If
	var IF_r = /if$/;
	// Quotation mark
	var QUOTE_r = /"$/; 
	// Int
	var INT_r = /int$/;
	// String
	var STRING_r = /string$/;
	// Boolean
	var BOOLEAN_r = /boolean$/;
	// True
	var TRUE_r = /true$/;
	// False
	var FALSE_r = /false$/;
	// Char 
	var CHAR_r = /[a-z]$/;
	// Space
	var SPACE_r = /\s$/;
	// Digit
	var DIGIT_r = /[0-9]+$/;
	// Equals Boolean Op
	var EQUALS_r = /\=\=$/;
	// Not Equals Boolean Op
	var NOT_EQUALS = /\!\=$/;
	// Assign Operator
	var ASSIGN_r = /\=$/;
	// Comment Beginning 
	var COM_BEGIN = /\/\*$/;
	// Comment End
	var COM_END = /\*\/$/;

/* Constructor for token object
 * Parameter type defines rank of token 
 * Parameter kind defines name of token
 * Parameter line defines the line that the token was found
 * Parameter column defines position of first char of token
 */
function Token(type, kind, line, column) {
	this.type = type;
	this.kind = kind;
	this.line = line;
	this.column = column;
}

Token.is = function (check) {
	return this.type = check;
}

