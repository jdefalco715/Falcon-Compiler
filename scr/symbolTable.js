// Symbol Table file

// Constructor for entry in symbol table
function Entry(name, type, line, scope) {
	this.name = name;
	this.type = type;
	this.line = line;
	this.scope = scope;
}