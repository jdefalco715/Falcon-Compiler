// Lex file

function startLex(input) {
	// Trim whitespace
	input = trim(input);

	// Array of programs within source
	var progs = input.split("$");

	// Cycle through each program entered
	for (int i = 0; i < progs.length; i++) {
		lexer(progs[i] + "$", i + 1);
	}


}


//Function takes input as parameter
function lexer(source, progNum){
	// Array of tokens for parsing
	var tokens = [];

	// Beginning pointer
	var tokenPointer = 0;

	// Pointer for end of the token
	var endTokenPointer = 1;

	// Split input into lines
	var lines = source.split("\n");

	// Pointer to check if file is complete
	var outProgram = 0;

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
	// Print (lowercase r for regex)
	var PRINT_r = /'print$'/; 
	// While
	var WHILE_r = /'while$'/;
	// If
	var IF_r = /'if$'/;
	// Quotation mark
	var QUOTE_r = /'"$'/; 
	// Int
	var INT_r = /'int$'/;
	// String
	var STRING_r = /'string$'/;
	// Boolean
	var BOOLEAN_r = /'boolean$'/;
	// Char 
	var CHAR_r = /'[a-z]$'/;
	// Id
	var ID_r = /'[a-z]$'/;
	// Space
	var SPACE_r = /'\s$'/;
	// Digit
	var DIGIT_r = /'[0-9]+$'/;
	// Equals Boolean Op
	var EQUALS_r = /'\=\=$'/;
	// Not Equals Boolean Op
	var NOT_EQUALS = /'\!\=$'/;
	// Addition Operator
	var ADD_r = /'\+$'/;
	// Assign Operator
	var ASSIGN_r = /'\=$'/;
	// Comment Beginning 
	var COM_BEGIN = /'\/\*$'/;
	// Comment End
	var COM_END = /'\*\/$'/;


	// Check if the inputted entered is empty
	if (/'^$'/.match(source)) {
		// Output error that nothing was entered

		// Stop lexing
		return false;
	}

		
	while (endTokenPointer <= source.length) {
		// TODO go through the characters of the inputted program
		// Move the two pointers throughout, outputting a line for console with each token processed
		// Have lexer check for warnings/errors
		// Output both warnings and errors, stop only on errors
		// Have lexer output number of program (if multiple programs are entered in one test case)

		/*   TOKEN HEIRARCHY:
		 *   - KEYWORDS
		 *   - ID
		 *   - SYMBOLS
		 *   - DIGIT
		 *   - CHARACTERS
		 */

		 // Check if the character at the pointer is equal to w 
		 if (source.charAt(tokenPointer) == 'w') {
		 	// Check to see if the character i and the following character
		 	// match the regex pattern for 'while' keyword
		 	if ((source.charAt(tokenPointer) + source.charAt(tokenPointer+1) + source.charAt(tokenPointer+2) + source.charAt(tokenPointer+3) + source.charAt(tokenPointer+4)) == WHILE_r) {
		 		// Add WHILE token
		 		addToken("WHILE", "while", , tokenPointer)
		 	}

		 }

	}
}


// Function added from 'Sonar' hall of fame program

function addToken(type, val, line, col) {
	//Sets temp token
	var temp = new Token(type, val, line, col);
	//Addes to the token list
	tokens.push(temp);
	//sets the text
	var text = type + " [ <span class=\"code-words\">" + val + "</span> ] found on line <span class=\"line\">" + line + "</span>, <span class=\"line\">" + col + "</span>...";
	//Outputs new token to log
	Log(text);
}

function Log(lineText) {

}
