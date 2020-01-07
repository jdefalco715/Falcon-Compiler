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
			 		addToken("WHILESTMT", "while", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 5;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add ID token for letter 'w'
			 		addToken("CHAR", "w", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer++;
			 	}

			 }

			 // Check if the character at the pointer is equal to i 
			 if (line.charAt(tokenPointer) == 'i') {

			 	// Check to see if the following character matches the regex pattern for 'if' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 2)).match(IF_r)) {

			 		// Add IF token
			 		addToken("IFSTMT", "if", i + 1, tokenPointer + 1);

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
			 		tokenPointer++;

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
			 		tokenPointer++;

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
			 		tokenPointer++;

			 	}

			 }

			 // Check if the character at the pointer is equal to f
			 if (line.charAt(tokenPointer) == 'f') {

			 	// Check to see if the following characters matches the regex pattern for 'false' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 5)).match(FALSE_r)) {

			 		// Add FALSE token
			 		addToken("BOOL_F", "false", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 5;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 'f'
			 		addToken("CHAR", "f", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer++;

			 	}

			 }

			 // Check if the character at the pointer is equal to t
			 if (line.charAt(tokenPointer) == 't') {

			 	// Check to see if the following characters matches the regex pattern for 'true' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 4)).match(TRUE_r)) {

			 		// Add TRUE token
			 		addToken("BOOL_T", "true", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 4;

			 	} else {
			 		// If the character is present and not part of the keyword, it must be char token

			 		// Add CHAR token for letter 't'
			 		addToken("CHAR", "t", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer++;

			 	}

			 }

			 // Check if the character at the pointer is equal to p
			 if (line.charAt(tokenPointer) == 'p') {

			 	// Check to see if the following character matches the regex pattern for 'print' keyword
			 	if ((line.substring(tokenPointer, tokenPointer + 5)).match(PRINT_r)) {

			 		// Add PRINT token
			 		addToken("PRINT", "print", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer += 5;

			 	} else {

			 		// Add CHAR token for letter 'p'
			 		addToken("CHAR", "p", i + 1, tokenPointer + 1);

			 		// Move pointer
			 		tokenPointer++;

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

			   // Check for quotation symbol
			   if ((line.charAt(tokenPointer)).match(QUOTE_r)) {

			   	// Add QUOTE token
			   	addToken("QUOTE", "\"", i + 1, tokenPointer + 1);

			   	// If not already in a string, set isString to true
			   	if(!isString)
			   		isString = true;
			   	else // If in string, end it
			   		isString = false;

			   }

			   // Check to see if the character matches the regex pattern for the assign token
			   if ((line.charAt(tokenPointer)).match(ASSIGN_r)){

			   	// Check if in string, if not all good
			   	if(!isString) {

				   	// Differentiate between assign and compare
				   	if ((line.substring(tokenPointer, tokenPointer + 1)).match(EQUALS_r)) {

				   		// Add ISEQUAL token
				   		addToken("ISEQUAL", "==", i + 1, tokenPointer + 1);

				   		tokenPointer += 2;
				   	} else {
				   		// If the character is not followed by another '=', it must be ASSIGN

				   		// Add ASSIGN token
				   		addToken("ASSIGN", "=", i + 1, tokenPointer + 1);

				   		// Move pointer
				   		tokenPointer++;
				   	}

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check if the character is exclamation point
			   if ((line.charAt(tokenPointer)) == "!") {

					// Check if in string, if not all good
			   	if(!isString) {

				   	// See if the two characters match the regex pattern for not equals
				   	if ((line.substring(tokenPointer, tokenPointer + 1)).match(NOT_EQUALS)) {

				   		// Add NOTEQUAL token
				   		addToken("NOTEQUAUL", "!=", i + 1, tokenPointer + 1);

				   		// Move pointer
				   		tokenPointer += 2;
				   	} else {
				   		// Exclamation point by itself not valid in language
				   		// throws error

				   		Log(/*Error message here*/);

				   		error++;
				   	}

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check if character matches plus symbol
			   if((line.charAt(tokenPointer)) == '+') {
					
					// Check if in string, if not all good
			   	if(!isString) {

				   	// Add PLUS token
				   	addToken("PLUS", "+", i + 1, tokenPointer + 1);

				   	// Move pointer
				   	tokenPointer++;

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check for left paren
			   if((line.charAt(tokenPointer)) == '(') {
					
					// Check if in string, if not all good
			   	if(!isString) {

				   	// Add L_PAREN token
				   	addToken("L_PAREN", "(", i + 1, tokenPointer + 1);

				   	// Move pointer
				   	tokenPointer++;

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check for right paren
			   if((line.charAt(tokenPointer)) == ')') {
					
					// Check if in string, if not all good
			   	if(!isString) {

				   	// Add R_PAREN token
				   	addToken("R_PAREN", ")", i + 1, tokenPointer + 1);

				   	// Move pointer
				   	tokenPointer++;

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check for left brace
			   if((line.charAt(tokenPointer)) == '{') {
					
					// Check if in string, if not all good
			   	if(!isString) {

				   	// Add L_BRACE token
				   	addToken("L_BRACE", ")", i + 1, tokenPointer + 1);

				   	// Move pointer
				   	tokenPointer++;

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check for right brace
			   if((line.charAt(tokenPointer)) == '}') {
					
					// Check if in string, if not all good
			   	if(!isString) {

				   	// Add R_BRACE token
				   	addToken("R_BRACE", ")", i + 1, tokenPointer + 1);

				   	// Move pointer
				   	tokenPointer++;

				   } else {

				   	// symbol not valid in string
				   	// throws error

				   	Log(/*Error message here*/);

				   	// Add to error counter
				   	error++;

				   }
			   }

			   // Check for whitspace character
			   if((line.charAt(tokenPointer)) == ' ') {

			   	// Ignore and move pointer
			   	tokenPointer++;
			   	
			   }

		}

		// Check if the pointer has reached the last character in the source input
		// If this character is not equal to EOP, give warning and place EOP
		if (i == lines.length - 1 && line.charAt(line.length-1) != '$'){

			// Warning message
			Log( /*Warning message*/);

			// Add to warning counter
			warning++;

			// Add EOP token
			addToken("EOP", "$", line, tokenPointer);
		}
	}

	// If there were any errors, return nothing and display Lexer failed
	if (error > 0) {

		// Lexer failed message
		Log(/*Lexer failed message here*/);

		return false;

	} else {

		// Return token stream
		return tokens;
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

// Function added from 'Sonar' hall of fame program

function Log(lineText) {
	var lText = "<div class=\"lexer\"><span class=\"lexer-title\">LEXER</span> -- " + lineText + "</div>";
}
