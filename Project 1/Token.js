// Token definitions

/* Constructor for token object
 * Parameter type defines rank of token 
 * Parameter kind defines name of token
 * Parameter line defines the line that the token was found
 * Parameter column defines position of first char of token
 */
var Token(type, kind, line, column) {
	this.type = type;
	this.kind = kind;
	this.line = line;
	this.column = column;
}

Token.is = function (check) {
	return this.type = check;
}