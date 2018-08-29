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

exports.parseChar = (store, var_store, node) => {

	//console.log('in parseChar', node)
	let state = node[0]
	let case_ = node[1]
	let i = var_store['i']
	let input = var_store['input']
	//console.log(i, input.length)

	//console.log('here is var store', var_store)
	//console.log('parseChar', node, i)
	if (i < input.length)
	{
		//console.log(var_store)
		//console.log(state, case_, var_store['parsing_checks'])
		if (var_store['parsing_checks'][state][case_](store, var_store))
		{
			var_store['i'] += 1
			//var_store['validate_vars']['k'] += 1
			//var_store['validate_vars']['input_i'] += 1
			//var_store['operation_vars']['chain_length'] += 1
			return true

		}

	}

	return false
}



