// Lex file

// Array of tokens for parsing
var tokens = [];

//Function takes input as parameter
function lexer(){
	// Fetches source code from text box
	var source = document.getElementById("sc").value;

	// Trim whitespace
	source = trim(source);

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

	// Number of program currently lexing
	var progNumber = 1;

	// Clears the console log
	document.getElementById("op").value = "";

	// Check if the inputted entered is empty
	if (source.match(/^$/)) {

		// Output error that nothing was entered
		outMessage("ERROR  LEXER --- No source code found");

		// Stop lexing
		return false;
	}

	// Starting Lexer message
	// Staring with program 1
	outMessage("INFO    LEXER --- Start lexing program " + progNumber);

	// Split input into lines
	var lines = source.split("\n");

	// Go through the input line by line with for loop
	for (var i = 0; i < lines.length; i++) {
		// Current row
		var line = lines[i];

		// Reset pointer for every line
		tokenPointer = 0;

		while (tokenPointer < line.length) {

			// Temporary placement variable
			var testChar = line[tokenPointer];

			// Boolean variable to see if there was a token passed with each iteration of while loop
			// If not, error is logged as unrecognized token
			var hit = false;

			/*   TOKEN HEIRARCHY:
			 *   - KEYWORDS
			 *   - ID
			 *   - SYMBOLS
			 *   - DIGIT
			 *   - CHARACTERS
			 */

			// Check for comment start
			if ((line.slice(tokenPointer, tokenPointer + 2)).match(COM_BEGIN) || isComment) {
				tokenPointer += 2;
				isComment = true

				// Lexer will ignore and not add comments to token stream
				// This loop moves the pointer until end of comment is found
				while(!(line.slice(tokenPointer, tokenPointer + 2)).match(COM_END) && line[tokenPointer] != undefined) {

					tokenPointer++;
				}

				if((line.slice(tokenPointer, tokenPointer + 2)).match(COM_END)) {

					isComment = false;
					tokenPointer += 2;
				}

				hit = true;

				// Once end is found, lexer will start to recognize tokens
				continue;
			}


			/*
			 *
			 *	Keywords
		    *
		    */

		   // Keywords and IDs must be found outside of strings, otherwise CHAR tokens
		   if(!isString) {

				// Check if the character at the pointer is equal to w
				if (testChar == 'w') {

				 	// Check to see if the following characters match the regex pattern for 'while' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 5)).match(WHILE_r)) {

				 		// Add WHILE token
				 		addToken("WHILESTMT", "while", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 5;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)){
				 		// If the character is present, not part of string and not part of the keyword, it must be ID token

				 		// Add ID token for letter 'w'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to i
				if (testChar == 'i') {

				 	// Check to see if the following character matches the regex pattern for 'if' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 2)).match(IF_r)) {

				 		// Add IF token
				 		addToken("IFSTMT", "if", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 2;

				 		hit = true;

				 		continue;

				 	} else if ((line.slice(tokenPointer, tokenPointer + 3)).match(INT_r)) {
				 		// Check to see if the following characters matches the regex pattern for 'int' keyword

				 		// Add INT token
				 		addToken("V_TYPE", "int", i + 1, tokenPointer + 1);

						// Move pointer
				 		tokenPointer += 3;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)) {
				 		// If the character is present and not part of the keyword, it must be char token

				 		// Add ID token for letter 'i'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to s
				if (testChar == 's') {

				 	// Check to see if the following characters matches the regex pattern for 'string' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 6)).match(STRING_r)) {

				 		// Add STRING token
				 		addToken("V_TYPE", "string", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 6;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)) {
				 		// If the character is present and not part of the keyword, it must be char token
				 		// Add CHAR token for letter 's'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to b
				if (testChar == 'b') {

				 	// Check to see if the following characters matches the regex pattern for 'boolean' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 7)).match(BOOLEAN_r)) {

				 		// Add BOOLEAN token
				 		addToken("V_TYPE", "boolean", i + 1, tokenPointer + 1);

						// Move pointer
				 		tokenPointer += 7;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)) {
				 		// If the character is present and not part of the keyword, it must be char token
				 		// Add CHAR token for letter 'b'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to f
				if (testChar == 'f') {

				 	// Check to see if the following characters matches the regex pattern for 'false' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 5)).match(FALSE_r)) {
				 		// Add FALSE token
				 		addToken("BOOL_F", "false", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 5;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)){
				 		// If the character is present and not part of the keyword, it must be char token
				 		// Add CHAR token for letter 'f'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to t
				if (testChar == 't') {

				 	// Check to see if the following characters matches the regex pattern for 'true' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 4)).match(TRUE_r)) {
				 		// Add TRUE token
				 		addToken("BOOL_T", "true", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 4;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)) {
				 		// If the character is present and not part of the keyword, it must be char token
				 		// Add CHAR token for letter 't'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

				// Check if the character at the pointer is equal to p
				if (testChar == 'p') {
				 	// Check to see if the following character matches the regex pattern for 'print' keyword
				 	if ((line.slice(tokenPointer, tokenPointer + 5)).match(PRINT_r)) {

				 		// Add PRINT token
				 		addToken("PRINT", "print", i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer += 5;

				 		hit = true;

				 		continue;

				 	} else if (testChar.match(CHAR_r)) {

				 		// Add CHAR token for letter 'p'
				 		addToken("ID", testChar, i + 1, tokenPointer + 1);

				 		// Move pointer
				 		tokenPointer++;

				 		hit = true;

				 		continue;

				 	}

				}

			}

			/*
			 *
			 *	Symbols
			 *
			 */

			// Check for quotation symbol
			if ((testChar).match(QUOTE_r)) {
			   // Add QUOTE token
			   addToken("QUOTE", "\"", i + 1, tokenPointer + 1);

			   // If not already in a string, set isString to true
			   if(!isString)
			   	isString = true;
			   else // If in string, end it
			   	isString = false;

			   // Move pointer
			   tokenPointer++;

			   hit = true;

			   continue;

			}

			// Check to see if the character matches the regex pattern for the assign token
			if ((testChar).match(ASSIGN_r)){
			 	// Check if in string, if not all good
			  	if(!isString) {

			   		// Differentiate between assign and compare
			   		if ((line.slice(tokenPointer, tokenPointer + 2)).match(EQUALS_r)) {

			   			// Add ISEQUAL token
			   			addToken("ISEQUAL", "==", i + 1, tokenPointer + 1);

			   			tokenPointer += 2;

			   			hit = true;

			   			continue;

			   		} else {
			   			// If the character is not followed by another '=', it must be ASSIGN

			   			// Add ASSIGN token
			   			addToken("ASSIGN", "=", i + 1, tokenPointer + 1);

			   			// Move pointer
			   			tokenPointer++;

			    		hit = true;

			    		continue;
			   		}

				} else {

				  	// symbol not valid in string
				  	// throws error
				  	outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

			   		// Add to error counter
			   		error++;

			   		// Move pointer
			   		tokenPointer++;

			    	hit = true;

			   		continue;
			    }

			}

			// Check if the character is exclamation point
			if ((testChar) == "!") {

				// Check if in string, if not all good
			  	if(!isString) {

			   		// See if the two characters match the regex pattern for not equals
			   		if ((line.slice(tokenPointer, tokenPointer + 2)).match(NOT_EQUALS)) {

			   			// Add NOTEQUAL token
			   			addToken("NOTEQUAUL", "!=", i + 1, tokenPointer + 1);

			   			// Move pointer
			   			tokenPointer += 2;
			   		} else {

				  		// Exclamation point by itself not valid in language
				  		// throws error
				  		outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

				  		// Add to error counter
				  		error++;

			   			// Move pointer
			   			tokenPointer++;
				  	}

				} else {

				   	// symbol not valid in string
				   	// throws error
				   	outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

				   	// Add to error counter
				   	error++;

			   		// Move pointer
			   		tokenPointer++;
				}

				hit = true;

				continue;
			}

			// Check if character matches plus symbol
			if((testChar) == '+') {

				// Check if in string, if not all good
			  	if(!isString) {

			   		// Add PLUS token
			   		addToken("PLUS", "+", i + 1, tokenPointer + 1);

			   		// Move pointer
			   		tokenPointer++;

				} else {

			   		// symbol not valid in string
			   		// throws error
			   		outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

			   		// Add to error counter
			   		error++;

			   		// Move pointer
			   		tokenPointer++;
			   }

			   	hit = true;

			   	continue;
			}

			// Check for left paren
			if((testChar) == '(') {

				// Check if in string, if not all good
			   	if(!isString) {

				  	// Add L_PAREN token
				  	addToken("L_PAREN", "(", i + 1, tokenPointer + 1);

				  	// Move pointer
				  	tokenPointer++;

				} else {

				  	// symbol not valid in string
				  	// throws error
				  	outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

				  	// Add to error counter
				  	error++;

			   		// Move pointer
			   		tokenPointer++;
				}

				hit = true;

				continue;
			}

			// Check for right paren
			if((testChar) == ')') {

				// Check if in string, if not all good
			   if(!isString) {

				  	// Add R_PAREN token
				  	addToken("R_PAREN", ")", i + 1, tokenPointer + 1);

				  	// Move pointer
				  	tokenPointer++;

				} else {

				  	// symbol not valid in string
				  	// throws error
				  	outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

				  	// Add to error counter
				  	error++;

			   		// Move pointer
			   		tokenPointer++;
				}

				hit = true;

				continue;
			}

			// Check for left brace
			if((testChar) == '{') {

				// Check if in string, if not all good
			  	if(!isString) {

			   		// Add L_BRACE token
			   		addToken("L_BRACE", "{", i + 1, tokenPointer + 1);

			   		// Move pointer
			   		tokenPointer++;

			   	} else {

			   		// symbol not valid in string
			   		// throws error
			   		outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

			   		// Add to error counter
			   		error++;

			   		// Move pointer
			   		tokenPointer++;
			   	}

			   	hit = true;

			   	continue;
			}

			// Check for right brace
			if((testChar) == '}') {

				// Check if in string, if not all good
			  	if(!isString) {

			   		// Add R_BRACE token
			   		addToken("R_BRACE", "}", i + 1, tokenPointer + 1);

			   		// Move pointer
			   		tokenPointer++;

				} else {

			   		// symbol not valid in string
			   		// throws error
			   		outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

			   		// Add to error counter
			   		error++;

			   		// Move pointer
			   		tokenPointer++;
				}

				hit = true;

				continue;

		   	}

		   	// Check for EOP character
		   	if(testChar == "$") {

		   		// Found outside of string
		   		if (!isString) {

		   			// Add EOP token
			   		addToken("EOP", "$", i + 1, tokenPointer + 1);

		   			// If there were any errors, return nothing and display Lexer failed
					if (error > 0) {

						// Lexer failed message, including warning and error numbers
						outMessage("ERROR   LEXER --- Lexer failed with " + error + " error(s) and " + warning + " warning(s)");


					} else {

						// Lexer succeeded message, including warning and error numbers
						outMessage("INFO    LEXER --- Lexer succeeded with " + error + " error(s) and " + warning + " warning(s)");

						// Send token stream to parser
						parse(tokens, progNumber);

						tokens = [];

					}

					// Ensure not at end of program
					if (lines[i][tokenPointer + 1] != undefined || lines[i+1] != undefined)  {
						// Reset values for token stream, warning counter, and error counter
						tokens =[];
						warning = 0;
						error = 0;

						// Increase program number
						progNumber++;

						// Break between programs
						outMessage("");

						// Message announcing lexing next program
						outMessage( "INFO    LEXER --- Start lexing program " + progNumber);
					}

					// Move pointer
					tokenPointer++;

					hit = true;

					continue;
		    	}

		    	hit = true;

		    	continue;

			}

		   // Check for whitspace character
		   if(testChar == ' ') {

		   	// Ignore and move pointer
		   	tokenPointer++;

		   	hit = true;

		   	continue;

		   }

		   /*
		    *
		    *	Digits
		    *
		    */

		   	// Check if the character in question matches any digit 0-9
		   	if (testChar.match(DIGIT_r)) {

		   		if(!isString) {
			   		// Add DIGIT token
			   		addToken("DIGIT", testChar, i + 1, tokenPointer + 1);

			   		// Move pointer
			   		tokenPointer++;
				} else {

			   		// Digit not accepted in string in grammar
			   		// Throw error
			   		outMessage("ERROR   LEXER --- Nonvalid token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer+1));

			   		// Add to error counter
			   		error++;

			   		// Move pointer
			   		tokenPointer++;
				}

				hit = true;

				continue;	
		   	}

		   /*
		    *
		    *	Characters / ID
		    *
		    */

		   	// See if character matches CHAR/ID regex
		   	if (testChar.match(CHAR_r)) {

		   		// If not in string
		   		if (!isString) {

		   			// Add ID token
		   			addToken("ID", testChar, i + 1, tokenPointer + 1);

		   			// Move pointer
		   			tokenPointer++;

		   		} else {
		   			// If in string

		   			// Add CHAR token
		   			addToken("CHAR", testChar, i + 1, tokenPointer + 1);

		   			// Move pointer
		   			tokenPointer++;

		   		}

		   		hit = true;

		   		continue;
		   }


		   	// If no token is found, error that unrecognized token was found
		   	if (!hit) {

		   		// Warning message
		   		outMessage("ERROR   LEXER --- Unrecognized token [ " + testChar + " ] found at (" + (i+1) + ":" + (tokenPointer + 1) +")");

		   		error++;

		   		tokenPointer++;

		   		continue;

		   	}
		}

		// Check if the pointer has reached the last character in the source input
		// If this character is not equal to EOP, give warning and place EOP
		if (i == lines.length - 1 && line[line.length - 1] != '$'){

			// Warning message
			outMessage("WARNING	LEXER --- No EOP found at end of file. Adding one for you.");

			// Add to warning counter
			warning++;

			// Add EOP token to token stream
			addToken("EOP", "$", i + 1, tokenPointer + 1);

			// Add EOP to program
			line = line + '$';

			// If there were any errors, return nothing and display Lexer failed
			if (error > 0) {

				// Lexer failed message, including warning and error numbers
				outMessage("ERROR  LEXER --- Lexer failed with " + error + " error(s) and " + warning + " warning(s)");

				return false;

			} else {

				// Lexer succeeded message, including warning and error numbers
				outMessage("INFO    LEXER --- Lexer succeeded with " + error + " error(s) and " + warning + " warning(s)");

				// Send token stream to parser
				parse(tokens, progNumber);

			}

		}

	}

	return;
}


// Function added from 'Sonar' hall of fame program

function addToken(type, val, line, col) {

	// Sets temp token
	var temp = new Token(type, val, line, col);

	// Adds to the token list
	tokens.push(temp);

	// Outputs token to log
	outMessage("DEBUG   LEXER --- " + type + " [ " + val + " ] token found at (" + line + ":" + col +")");
}