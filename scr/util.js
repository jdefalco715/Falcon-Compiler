// Utility functions


// Trim function used from example js compiler
function trim(str) {
	// Removes leading and trailing whitespaces in selected string
	// For this project, the string would be the source code meant to compile
	return str.replace(/^\s|\s+$/gm, "");
}

// Output function
function outMessage(line) {
	document.getElementById("op").value += line + "\n";
}