exports.isDigit = (store, var_store) => {
	let char = exports.getChar(store, var_store)
	//console.log(var_store, char)
	return char >= '0' && char <= '9'

}
exports.isNotDigit = (store, var_store) => {
	return !exports.isDigit(store, var_store)

}


exports.getChar = (store, var_store) => {
	let i = var_store['i']
	let input = var_store['input']
	let char = input[i]
	return char
}




