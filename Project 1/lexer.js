// Lex file

//Function takes input as parameter
function lexer(source){

	// Array of tokens for parsing
	var tokens = [];

	// Character pointer
	var tokenPointer = 0;

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

		// Reset pointer and end pointer for every line
		tokenPointer = 0;
		endTokenPointer = 1;

		
		while (tokenPointer < line.length) {
			/*   TOKEN HEIRARCHY:
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
			 if (line.charAt(tokenPointer) == 'w') {

			 	// Check to see if the following characters match the regex pattern for 'while' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 5)).match(WHILE_r)) {

			 		// Add WHILE token
			 		addToken("KEYWORD", "while", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 5;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add ID token for letter 'w'
			 		addToken("CHAR", "w", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 1;
			 	}

			 }

			 // Check if the character at the pointer is equal to i 
			 if (line.charAt(tokenPointer) == 'i') {

			 	// Check to see if the following character matches the regex pattern for 'if' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 2)).match(IF_r)) {

			 		// Add IF token
			 		addToken("KEYWORD", "if", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 2;

			 	} else if ((line.substring(tokenPointer, tokenPointer + 3)).match(INT_r)) {
			 		// Check to see if the following characters matches the regex pattern for 'int' keyword

			 		// Add INT token
			 		addToken("V_TYPE", "int", i + 1, tokenPointer + 1);

					// Move pointer
			 		tokenPointer += 3;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add ID token for letter 'i'
			 		addToken("CHAR", "i", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to s
			 if (line.charAt(tokenPointer) == 's') {

			 	// Check to see if the following characters matches the regex pattern for 'string' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 6)).match(STRING_r)) {

			 		// Add STRING token
			 		addToken("V_TYPE", "string", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 6;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 's'
			 		addToken("CHAR", "s", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 1;

			 	}

			 }

			 // Check if the character at the pointer is equal to b
			 if (line.charAt(tokenPointer) == 'b') {

			 	// Check to see if the following characters matches the regex pattern for 'boolean' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 7)).match(BOOLEAN_r)) {

			 		// Add BOOLEAN token
			 		addToken("V_TYPE", "boolean", i + 1, tokenPointer + 1);

					// Move pointer
			 		tokenPointer += 7;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 'b'
			 		addToken("CHAR", "b", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 2;

			 	}

			 }

			 // Check if the character at the pointer is equal to f
			 if (line.charAt(tokenPointer) == 'f') {

			 	// Check to see if the following characters matches the regex pattern for 'false' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 5)).match(FALSE_r)) {

			 		// Add FALSE token
			 		addToken("BOOLOP", "false", i + 1, tokenPointer + 1);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 5;
			 		endTokenPointer = tokenPointer + 1;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 'f'
			 		addToken("CHAR", "f", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 2;

			 	}

			 }

			 // Check if the character at the pointer is equal to t
			 if (line.charAt(tokenPointer) == 't') {

			 	// Check to see if the following characters matches the regex pattern for 'true' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 4)).match(TRUE_r)) {

			 		// Add TRUE token
			 		addToken("BOOLOP", "true", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 4;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 't'
			 		addToken("CHAR", "t", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 2;

			 	}

			 }

			 // Check if the character at the pointer is equal to p
			 if (line.charAt(tokenPointer) == 'p') {

			 	// Check to see if the following character matches the regex pattern for 'print' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 5)).match(PRINT_r)) {

			 		// Add PRINT token
			 		addToken("KEYWORD", "print", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 5;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 	// Check to see if there is nothing following the character at pointer
			 	if((line.charAt(tokenPointer + 1)).match(SPACE_r)) {

			 		// Add CHAR token for letter 'p'
			 		addToken("CHAR", "p", , tokenPointer);

			 		// Move starting pointer and end pointer
			 		tokenPointer += 2;
			 		endTokenPointer = tokenPointer + 1;

			 	}

			 }

			 /*
			  *
			  *	End of Keywords
			  *
			  */

			  /*
			   *
			   *	Symbols
			   *
			   */

			   // Check to see if the character matches the regex pattern for the assign token
			   if ((line.charAt(tokenPointer)).match(ASSIGN_r)){

			   	// Differentiate between assign and compare
			   	if ((line.substring(tokenPointer, tokenPointer + 1)).match(EQUALS_r)) {

			   		// Add EQUALS token
			   		addToken("BOOLOP", "==", line, tokenPointer);

			   		tokenPointer += 2;
			   	}

			   	// Be certain that character in question is ASSIGN token
			   	if ((line.charAt(tokenPointer + 1)).match(SPACE_r)){

			   		// Add ASSIGN token
			   		addToken("ASSIGN", "=", line, tokenPointer);


			   	}
			   }

		}

		// Check if the pointer has reached the last character in the source input
		// If this character is not equal to EOP, give warning and place EOP
		if (i == lines.length - 1 && line.charAt(line.length-1) != '$'){
			Log( /*Warning message*/);

			warning++;

			addToken("EOP", "$", line, tokenPointer);
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
