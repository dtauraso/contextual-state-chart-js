
//var createStore = require('redux')
//import createStore from 'redux'
var hcssm = require('./contextual_state_chart')
//import * as hcssm from './contextual_state_chart.js'
var cf = require('./common_functions')
//import * as cf from './common_functions.js'


var parseChar = (store, var_store, node) => {

	//console.log('in parseChar', node)
	let state_name = node
	let i = var_store['i']
	let input = var_store['input']
	//console.log(i, input.length)

	//console.log('here is var store', var_store)
	//console.log('parseChar', node, i)
	if (i < input.length)
	{
		//console.log(var_store)
		// console.log(state_name, var_store['parsing_checks'])
		if (var_store['parsing_checks'][state_name](store, var_store))
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

var getA = (store, var_store, node) => {
	// all chains start with this function
	var_store['operation_vars']['chain_length'] = 0

	//console.log(var_store['operation_vars']['kind_of_number'])
	let i = var_store['i']
	let input = var_store['input']
	var_store['operation_vars']['a'] = input[i]
	var_store['operation_vars']['chain_length'] += 1
	var_store['i'] += 1
	//console.log(var_store)

	return true
}

var getB = (store, var_store, node) => {

	//console.log(var_store['operation_vars']['kind_of_number'])
	let i = var_store['i']
	let input = var_store['input']
	var_store['operation_vars']['b'] = input[i]
	var_store['operation_vars']['chain_length'] += 1
	var_store['i'] += 1
	//console.log(var_store)

	return true
}

var isOp = (store, var_store, node) => {
	// check current operand with jth operand
	let i = var_store['i']
	let input = var_store['input']
	//console.log(input[i])
	let j = var_store['lex_vars']['j']
	let operators = var_store['lex_vars']['operators']
	return input[i] === operators[j]

}

var evaluate = (store, var_store, node) => {

	//console.log(var_store)

	let i = var_store['i']
	let input = var_store['input']
	var_store['operation_vars']['b'] = input[i]


	let a = Number(var_store['operation_vars']['a'])
	let b = Number(var_store['operation_vars']['b'])

	let j = var_store['lex_vars']['j']
	let operators = var_store['lex_vars']['operators']
	let operations = var_store['lex_vars']['operations']

	var_store['operation_vars']['a'] = operations[operators[j]] (a, b)
	var_store['operation_vars']['b'] = 0
	var_store['i'] += 1
	let str_a = String(var_store['operation_vars']['a'])


	let chain_length = var_store['operation_vars']['chain_length']

	let before_the_chain = var_store['input'].slice(0, i - 2)

	let before_the_chain_len = before_the_chain.length
	let the_chain = str_a

	let after_the_chain = var_store['input'].slice(i + 1, var_store['input'].length)

	var_store['input'] = before_the_chain

	var_store['input'].push(the_chain)
	for(var k in after_the_chain)
	{
		var_store['input'].push(after_the_chain[k])
	}

	var_store['i'] = before_the_chain_len

	return true
}

var ignoreOp = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	//console.log(input[i])
	let j = var_store['lex_vars']['j']
	let operators = var_store['lex_vars']['operators']
	//console.log(operators[j])
	//console.log((input[i] === operators[j]))
	// need to prove input[i] is an operator, but not operators[j]
	//console.log(input[i], operators.includes(input[i]))
	if (endOfInput(store, var_store, node))
	{
		return false
	}
	if (operators.includes(input[i]) && (input[i] !== operators[j]))
	{
		var_store['operation_vars']['a'] = 0
		return true
	}
	return false
}



var endOfInput = (store, var_store, node) => {

	//console.log(node)
	//console.log(var_store)
	let i = var_store['i']
	let input = var_store['input']
	//console.log(i, i >= input.length)
	return i >= input.length
}

var inputIsInvalid = (store, var_store, node) => {
	console.log('your input is invalid')
	return true
}

var noMoreInput = (store, var_store, node) => {

	//console.log('at noMoreInput')
	return endOfInput(store, var_store, node)

}


var saveDigit = (store, var_store, node) => {
	let char = cf.getChar(store, var_store)

	return (char >= '0' && char <= '9')


}





var isWhiteSpace = (store, var_store) => {

	return cf.getChar(store, var_store) === ' '
}



var mult = (a, b) => {

	return a * b
}
var divide = (a, b) => {

	return a / b
}
var plus = (a, b) => {
	//console.log(a, b)
	return a + b
}
var minus = (a, b) => {

	return a - b
}








var returnTrue = (store, var_store, node) => {
	return true
}
var returnFalse = (store, var_store, node) => {
	return false
}
var resetForNextRound = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	if (i >= input.length)
	{
		//console.log(node)
		var_store['lex_vars']['j'] += 1
		var_store['i'] = 0
		return true
	}

	return false
}

var showAndExit = (store, var_store, node) => {

	let input = var_store['input']
	if(input.length === 1)
	{
		console.log(input[0])
		return true
	}

	return false

}




var collectChar = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	//console.log(input[i])
	if (input[i] != ' ')
	{
		var_store['collected_string'] += input[i]
		var_store['i'] += 1
		return true

	}
	return false
}
var save = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	if (input[i] === ' ')
	{
		let collected_string = var_store['collected_string']
		var_store['expression'].push(collected_string)
		return true

	}
	return false
}
var init = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	if (input[i] != ' ')
	{
		var_store['collected_string'] = ''
		return true
	}
	return false
}

var lastToSave = (store, var_store, node) => {

	if (endOfInput(store, var_store, node))
	{
		let collected_string = var_store['collected_string']
		var_store['expression'].push(collected_string)
		var_store['input'] = var_store['expression']
		var_store['i'] = 0
		var_store['expression'] = []
		var_store['collected_string'] = ''
		return true
	}
	return false
}
var validOp = (store, var_store, node) => {

	let i = var_store['i']
	let input = var_store['input']
	if (isOp(store, var_store, node))
	{
		var_store['operation_vars']['a'] = input[i - 1]
		return true
	}
	return true
}
var validate = (store, var_store, node) => {

	// expressions list
	// len > 3
	// alternate # and op
	// make sure the alternate starts and ends with #
	var i = 1
	let input = var_store['input']
	//console.log(input)

	if (input.length >= 3)
	{
		if (Number(input[0]) === NaN)
		{

			return false
		}
		while (i < input.length)
		{
			// 2, 4, 6
			if (i % 2 === 1)
			{

				if (!var_store['lex_vars']['operators'].includes(input[i]))
				{
					return false
				}
			}
			// 1, 3, 5
			else
			{
				if (Number(input[i]) === NaN)
				{
					return false
				}
			}

			i += 1
		}
		if (Number(input[input.length - 1]) === NaN)
		{
			return false
		}

		return true



	}
	return false

}

var parsing_checks = {

	'op': isOp,
	'value_ignore': cf.isDigit,
	'op_ignore': ignoreOp,
	' ': isWhiteSpace,

}
/*
cases for state machine failures
these refer to when a submachine fails that started from a child of the supermachine(parent state)
cases 1, 2, 3 have 2 parts
	first part is for paths of length 2
	secon part is for paths of length > 2
1) the ith child was wrong and there is an (i+j)th correct child where j >= 1 (we can continue)(passes)
2) the ith child was wrong and it's the last child in list(passes)
	2.1)
		we can move to at least 1 other node in the parent list
		we can continue
	2.2)
		we can move to 0 other nodes in the parent list
		we have to stop
how the cases map to each other
1 -> 1
2 -> 1 | 3
3 -> 3
Most of the branches testing these cases will deviate from the graph solving the calculator problem

case 3 will be tested using an extra branch first, then will use input to allow the machine to work and test all cases

the length is referring to the distance from and including the currently tested state to the topmost state

it's not measuring the length of the parent linked list

case 3 is more like case 2.2

case a -> case b means case a is addressed first and is transformed into case b
*/

var vars = {
	'input' : /* passes '1 + 2 + 3 + 4',*//*'1 + 2 + 3 + 4 - 5 + 6 + 7 - 8 - 9 + 10 + 11 + 12',*//*'1+',*//*'1 +2',*/'1 + 2 + 3 + 4 - 5 + 6 * 7 - 8 - 9 + 10 * 11 + 12', // '1 '
	// 10 - 18 - 8 - 42
	'expression' : [],
	'collected_string' : '',
	'i' : 0,

	'operation_vars' : {

		'a' : 0,

		'b' : 0},

	'lex_vars' : {
		'operators' : ['*', '/', '-', '+'],
		'j' : 0,
		'operations' : {'*': mult, '/': divide, '+': plus, '-': minus}},
	// this control graph uses string for states and cases
	'node_graph2' : {

			// any state with no 'next' attribute means it's a finishing state
			/*
			parents
			name
			function
			next
			children
			*/

			'split 0': {
				'name'		: 	'split 0',
				'function'	: 	returnTrue,
				'next'		: 	['validate', 'invalid'],
				'children'	: 	[
									'partOfDeathPath 0'/* case 1 length 2 */,
									'partOfDeathPath 1'/* case 1 length > 2 */,
									'deadPathCanContinue root' /* case 2 length > 2 -> case 3 length > 2 */,
									'char',
									// 'deadPath0' /* case 2 length 2 -> case 3 length 2 */
								]
				// make a dead branch here 2 children levels minimum
			},

			/* case 1 length 2 */
			'partOfDeathPath 0': {
				'parents'	: 	['split'],
				'name'		: 	'partOfDeathPath 0',
				'function'	: 	returnFalse,
				'next'		: 	['deadEndState 0']
			},

			'deadEndState 0': {
				'parents'	: 	['split'],
				'name'		: 	'deadEndState 0',
				'function'	: 	returnFalse,
			},

			/* case 1 length > 2 */
			'partOfDeathPath 1': {
				'parents'	: 	['split'],
				'name'		: 	'partOfDeathPath 1',
				'function'	: 	returnTrue,
				'next'		: 	['deadEndState 1'],
				'children'	: 	['deadIntermediateState 0']
			},

			'deadEndState 1': {
				'parents'	: 	['split'],
				'name'		: 	'deadEndState 1',
				'function'	: 	returnFalse,
			},

			/* case 2 length > 2  we can continue the machine */
			'deadPathCanContinue root': {
				'parents'	: 	['split'],
				'name'		: 	'deadPathCanContinue root',
				'function'	: 	returnTrue,
				'children'	: 	['extra level']
			},
			'extra level' : {
				'parents' 	: 	['deadPathCanContinue root'],
				'name'		:	'extra level',
				'function'	: 	returnTrue,
				'children'	: 	['deadPath0 1', 'deadPath2 0']
			},
			'deadPath0 1': {
				'parents'	: 	['extra level'],
				'name'		: 	'deadPath0 1',
				'function'	: 	returnTrue,
				'next'		: 	['deadPath1 1']
			},
			'deadPath1 1': {
				'parents'	: 	['extra level'],
				'name'		: 	'deadPath1 1',
				'function'	: 	returnFalse,
			},
			'deadPath2 0': {
				'parents'	: 	['extra level'],
				'name'		: 	'deadPath2 0',
				'function'	: 	returnFalse,
			},
			

			/* case 2 length 2 -> case 3 length 2 */
			// can be used to fail the machine
			'deadPath0': {
				'parents'	: 	['split'],
				'name'		: 	'deadPath0',
				'function'	: 	returnTrue,
				'next'		: 	['deadPath1']
			},
			'deadPath1': {
				'parents'	: 	['split'],
				'name'		: 	'deadPath1',
				'function'	: 	returnFalse,
			},



			'deadIntermediateState 0': {
				'parents'	: 	['partOfDeathPath 1'],
				'name'		: 	'deadIntermediateState 0',
				'function'	: 	returnFalse
			},

			'validate': {
				'parents'	: 	[],
				'name'		: 	'validate',
				'function'	: 	validate,
				'next'		: 	['evaluate_expression']
			},
			'invalid': {
				'parents'	: 	[],
				'name'		: 	'invalid',
				'function'	: 	inputIsInvalid
			},
			'evaluate_expression': {
				'parents'	: 	[],
				'name'		: 	'evaluate_expression',
				'function'	: 	returnTrue,
				// 'next'		: 	['finalPath level 1'], // test for case 2 length > 2 -> case 3 length > 2
				'next'		: 	['input_has_1_value','evaluate_expression'],
				'children'	: 	['a']
			},
			

			
			// put a fake state between evaluate_expression -> input_has_1_value
			// to force machine to exit early without getting the answer
			// make death paths starting here to force entire machine to fail
			'input_has_1_value': {
				'parents'	: 	[],
				'name'		: 	'input_has_1_value',
				'function'	: 	showAndExit,

			},

			/*
				finalPath  level 2
					a branch level 3
						terminate state 1
						terminate state 2
					a terminal branch 0
			*/
			/* case 2 length > 2 -> case 3 length > 2 */
			'finalPath level 1': {
				// true
				'parents'	: 	[],
				'name'		: 	'finalPath level 1',
				'function'	: 	returnTrue,
				'next'		: 	['input_has_1_value','evaluate_expression'],
				'children'	: ['a branch level 3', 'a terminal branch 0']
			},

			'a branch level 3': {
				// true
				'parents'	: 	[],
				'name'		: 	'a branch level 3',
				'function'	: 	returnTrue,
				'children'	: 	['terminal state 1', 'terminal state 2']
			},
			'terminal state 1': {
				// reurn false
				'parents'	: 	[],
				'name'		: 	'terminal state 1',
				'function'	: 	returnFalse
			},
			'terminal state 2': {
				// return false
				'parents'	: 	[],
				'name'		: 	'terminal state 2',
				'function'	: 	returnTrue,
				'children'	: 	['final terminal state 1', 'final terminal state 2']
			},
			
			'final terminal state 1': {
				'parents'	: 	[],
				'name'		: 	'final terminal state 1',
				'function'	: 	returnFalse,

			},
			'final terminal state 2': {
				'parents'	: 	[],
				'name'		: 	'final terminal state 2',
				'function'	: 	returnFalse,

			},


			'a terminal branch 0': {
				// return false
				'parents'	: 	[],
				'name'		: 	'a terminal branch 0',
				'function'	: 	returnFalse
			},
				// split
				
				'char': {
					'parents'	: 	['split 0'],
					'name'		: 	'char',
					'function'	: 	collectChar,
					'next'		: 	['last_to_save', 'char', 'save']
				},



				'save': {
					'parents'	: 	['split 0'],
					'name'		: 	'save',
					'function'	: 	save,
					'next'		: 	[' ']
				},

				' ': {
					'parents'	: 	['split 0'],
					'name'		: 	' ',
					'function'	: 	parseChar,
					'next'		: 	[' ', 'init']
				},

				'init': {
					'parents'	: 	['split 0'],
					'name'		: 	'init',
					'function'	: 	init,
					'next'		: 	['char']
				},

				'last_to_save': {
					'parents'	: 	['split 0'],
					'name'		: 	'last_to_save',
					'function'	: 	lastToSave
				},


				// evaluate_expression

				'a': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'a',
					'function'	: 	getA,
					'next'		: 	['reset_for_next_round_of_input', 'op', 'op_ignore']
				},

				'op': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'op',
					'function'	: 	parseChar,
					'next'		: 	['error', 'b evaluate']
				},
				// add new step to save b?
				// make a result variable to show the result?
				'b evaluate': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'b evaluate',
					'function'	: 	evaluate,
					'next'		: 	['reset_for_next_round_of_input', 'a', 'op_ignore']
				},

				'op_ignore': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'op_ignore',
					'function'	: 	parseChar,
					'next'		: 	['error', 'value_ignore']
				},

				'value_ignore': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'value_ignore',
					'function'	: 	parseChar,
					'next'		: 	['reset_for_next_round_of_input', 'op_ignore', 'value_ignore valid_op']
				},

				'value_ignore valid_op': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'value_ignore valid_op',
					'function'	: 	validOp,
					'next'		: 	['op']
				},

				'error': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'error',
					'function'	: 	noMoreInput
				},

				'reset_for_next_round_of_input': {
					'parents'	: 	[],
					'name'		: 	'reset_for_next_round_of_input',
					'function'	: 	resetForNextRound,
					'next'		: 	['end_of_evaluating']
				},
				'end_of_evaluating': {
					'parents'	: 	[],
					'name'		: 	'end_of_evaluating',
					'function'	: 	returnTrue
				},
		},

	'parsing_checks' : parsing_checks
}
var nodeReducer4 = (state = {vars}, action) => {

    //console.log("got here", action.type, action)
    // set this false when the item enteres
    return hcssm.universalReducer(state, action, state.vars)

}

//var calculator_reducer = createStore(nodeReducer4)
// -1 so highest level of graph isn't printed with an indent
// ['split', '0'], ['input_has_1_value', '0'] define a the start point and end point
// through the state chart
// ['input_has_1_value', '0']
hcssm.visitRedux('split 0', vars, 1)

console.log('done w machine')
