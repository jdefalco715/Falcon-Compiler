// Lex file

//Function takes input as parameter
function lexer(source){

	// Array of tokens for parsing
	var tokens = [];

	// Beginning pointer
	var tokenPointer = 0;

	// Pointer for end of the token
	var endTokenPointer = 1;

	// Pointer to check if file is complete
	var outProgram = 0;

	// Boolean var to see if string is active
	var isString = false;

	// Boolean var to see if comment is active
	var isComment = false;

	//Number of warnings in lex
	var warning = 0;

	//Number of errors in lex
	var error = 0;

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
	// True
	var TRUE_r = /'true$'/;
	// False
	var FALSE_r = /'false$'/;
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

	// Trim whitespace
	source = trim(source);

	// Check if the inputted entered is empty
	if (/'^$'/.match(source)) {

		// Output error that nothing was entered
		Log( /*Error message here*/ );

		// Stop lexing
		return false;
	}

	// Split input into lines
	var lines = source.split("\n");

	// Go through the input line by line with for loop
	for (var i = 0; i < lines.length; i++) {
		// Current row
		var line = lines[i];


		
		while (endTokenPointer <= line.length) {
			// TODO go through the characters of the inputted program
			// Move the two pointers throughout, outputting a line for console with each token processed
			// Have lexer check for warnings/errors
			// Output both warnings and errors, stop only on errors
			// Have lexer output number of program (if multiple programs are entered in one test case)

			/*   
			 * 	TOKEN HEIRARCHY:
			 *   - KEYWORDS
			 *   - ID
			 *   - SYMBOLS
			 *   - DIGIT
			 *   - CHARACTERS
			 */


			 /*
			  *
			  *	Keywords
			  *
			  */


			 // Check if the character at the pointer is equal to w 
			 if (source.charAt(tokenPointer) == 'w') {

			 	// Check to see if the following characters match the regex pattern for 'while' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 5)).match(WHILE_r)) {

			 		// Add WHILE token
			 		addToken("KEYWORD", "while", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 5;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add ID token for letter 'w'
			 		addToken("CHAR", "w", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to i 
			 if (source.charAt(tokenPointer) == 'i') {

			 	// Check to see if the following character matches the regex pattern for 'if' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 2)).match(IF_r)) {

			 		// Add IF token
			 		addToken("KEYWORD", "if", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 2;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if the following characters matches the regex pattern for 'int' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 3)).match(INT_r)) {

			 		// Add INT token
			 		addToken("V_TYPE", "int", , tokenPointer);

					// Move starting pointer and end pointer
			 		tokenPointer += 3;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add ID token for letter 'i'
			 		addToken("CHAR", "i", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the chracter at the pointer is equal to s
			 if (source.charAt(tokenPointer) == 's') {

			 	// Check to see if the following characters matches the regex pattern for 'string' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 6)).match(STRING_r)) {

			 		// Add STRING token
			 		addToken("V_TYPE", "string", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 6;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 's'
			 		addToken("CHAR", "s", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to b
			 if (source.charAt(tokenPointer) == 'b') {

			 	// Check to see if the following characters matches the regex pattern for 'boolean' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 7)).match(BOOLEAN_r)) {

			 		// Add BOOLEAN token
			 		addToken("V_TYPE", "boolean", , tokenPointer);

					// Move starting pointer and end pointer
			 		tokenPointer += 7;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 'b'
			 		addToken("CHAR", "b", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to f
			 if (source.charAt(tokenPointer) == 'f') {

			 	// Check to see if the following characters matches the regex pattern for 'false' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 5)).match(FALSE_r)) {

			 		// Add FALSE token
			 		addToken("BOOLOP", "false", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 5;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 'f'
			 		addToken("CHAR", "f", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to t
			 if (source.charAt(tokenPointer) == 't') {

			 	// Check to see if the following characters matches the regex pattern for 'true' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 4)).match(TRUE_r)) {

			 		// Add TRUE token
			 		addToken("BOOLOP", "true", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 4;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 't'
			 		addToken("CHAR", "t", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to p
			 if (source.charAt(tokenPointer) == 'p') {

			 	// Check to see if the following character matches the regex pattern for 'print' keyword
			 	if ((source.substring(tokenPointer, tokenPointer + 5)).match(PRINT_r)) {

			 		// Add PRINT token
			 		addToken("KEYWORD", "print", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 5;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((source.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 'p'
			 		addToken("CHAR", "p", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 1;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 /*
			  *
			  *	End of Keywords
			  *
			  */

		}
	}

	return tokens;
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

// Function added from 'Sonar' hall of fame program

function Log(lineText) {
	var lText = "<div class=\"lexer\"><span class=\"lexer-title\">LEXER</span> -- " + lineText + "</div>";
}
