// Symbol Table file

// Constructor for entry in symbol table
function Entry(name, type, line, scope, value) {
	this.name = name;
	this.type = type;
	this.line = line;
	this.scope = scope;
	this.value = value;
}