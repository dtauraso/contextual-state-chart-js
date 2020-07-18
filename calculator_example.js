
//var createStore = require('redux')
//import createStore from 'redux'
var hcssm = require('./contextual_state_chart')
// hcssm.getVariable

//import * as hcssm from './contextual_state_chart.js'
var cf = require('./common_functions')
//import * as cf from './common_functions.js'
var isNumber = (current_state, graph, parent_state) => {

	// if the token from parent_state is a number
	// convert to number
	// save to expression
}
// current_state, graph, parent_state
var parseChar = (current_state, graph, parent_state) => {

	//console.log('in parseChar', node)
	let state_name = current_state
	let i = graph['i']
	let input = graph['input']

	if(i >= input.length) {
		return false
	}
	if(graph['parsing_checks'][state_name](current_state, graph))
	{
		graph['i'] += 1
		return true
	}
	return false
}

var getA = (current_state, graph, nparent_stateode) => {

	// all chains start with this function
	graph['operation_vars']['chain_length'] = 0


	let i = graph['i']
	let input = graph['input']
	graph['operation_vars']['a'] = input[i]
	graph['operation_vars']['chain_length'] += 1
	graph['i'] += 1

	
	return true
}

var getB = (current_state, graph, parent_state) => {


	let i = graph['i']
	let input = graph['input']
	graph['operation_vars']['b'] = input[i]
	graph['operation_vars']['chain_length'] += 1
	graph['i'] += 1

	
	return true
}

var isOp = (current_state, graph, parent_state) => {

	// check current operand with jth operand
	let i = graph['i']
	let input = graph['input']

	let j = graph['lex_vars']['j']
	let operators = graph['lex_vars']['operators']
	return input[i] === operators[j]

}

var evaluate = (current_state, graph, parent_state) => {


	let i = graph['i']
	let input = graph['input']
	graph['operation_vars']['b'] = input[i]


	let a = Number(graph['operation_vars']['a'])
	let b = Number(graph['operation_vars']['b'])

	let j = graph['lex_vars']['j']
	let operators = graph['lex_vars']['operators']
	let operations = graph['lex_vars']['operations']

	graph['operation_vars']['a'] = operations[operators[j]] (a, b)
	graph['operation_vars']['b'] = 0
	graph['i'] += 1
	let str_a = String(graph['operation_vars']['a'])


	let chain_length = graph['operation_vars']['chain_length']

	let before_the_chain = graph['input'].slice(0, i - 2)

	let before_the_chain_len = before_the_chain.length
	let the_chain = str_a

	let after_the_chain = graph['input'].slice(i + 1, graph['input'].length)

	graph['input'] = before_the_chain

	graph['input'].push(the_chain)
	for(var k in after_the_chain)
	{
		graph['input'].push(after_the_chain[k])
	}

	graph['i'] = before_the_chain_len

	return true
}

var ignoreOp = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']

	let j = graph['lex_vars']['j']
	let operators = graph['lex_vars']['operators']

	// need to prove input[i] is an operator, but not operators[j]

	if(endOfInput(current_state, graph, parent_state))
	{
		return false
	}
	if(operators.includes(input[i]) && (input[i] !== operators[j]))
	{
		graph['operation_vars']['a'] = 0
		return true
	}
	return false
}



var endOfInput = (current_state, graph, parent_state) => {


	let i = graph['i']
	let input = graph['input']

	return i >= input.length
}

var inputIsInvalid = (current_state, graph, parent_state) => {
	console.log('your input is invalid')
	return true
}

var noMoreInput = (current_state, graph, parent_state) => {

	return endOfInput(current_state, graph, parent_state)

}


var saveDigit = (current_state, graph, parent_state) => {
	let char = cf.getChar(current_state, graph)

	return (char >= '0' && char <= '9')
}



var isWhiteSpace = (current_state, graph) => {

	return cf.getChar(current_state, graph) === ' '
}



var mult = (a, b) => {

	return a * b
}
var divide = (a, b) => {

	return a / b
}
var plus = (a, b) => {

	return a + b
}
var minus = (a, b) => {

	return a - b
}








var returnTrue = (current_state, graph, parent_state) => {
	return true
}
var returnFalse = (current_state, graph, parent_state) => {
	return false
}
var resetForNextRound = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']
	if(i < input.length) {
		return false
	}
	graph['lex_vars']['j'] += 1
	graph['i'] = 0
	return true
}

var showAndExit = (current_state, graph, parent_state) => {

	let input = graph['input']
	if(input.length > 1) {
		return false
	}
	console.log(input[0])
	return true

}




var collectChar = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']

	if(input[i] === ' ') {
		return false
	}
	graph['collected_string'] += input[i]
	graph['i'] += 1
	return true
}
var save = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']
	if(input[i] !== ' ') {
		return false
	}
	let collected_string = graph['collected_string']
	graph['expression'].push(collected_string)
	return true
}
var init = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']
	if(input[i] === ' ') {
		return false
	}
	graph['collected_string'] = ''
	return true
}

var lastToSave = (current_state, graph, parent_state) => {

	if(!endOfInput(current_state, graph, parent_state)) {
		return false
	}
	let collected_string = graph['collected_string']
	graph['expression'].push(collected_string)
	graph['input'] = graph['expression']
	graph['i'] = 0
	graph['expression'] = []
	graph['collected_string'] = ''
	return true
}
var validOp = (current_state, graph, parent_state) => {

	let i = graph['i']
	let input = graph['input']
	if(!isOp(current_state, graph, parent_state)) {
		return false
	}
	graph['operation_vars']['a'] = input[i - 1]
	return true
}
var validate = (current_state, graph, parent_state) => {

	// expressions list
	// len > 3
	// alternate # and op
	// make sure the alternate starts and ends with #
	var i = 1
	let input = graph['input']
	//console.log(input)
	if(input.length < 3) {
		return false
	}
	if(Number(input[0]) === NaN) {

		return false
	}
	while(i < input.length) {
		// check for the existence of an operator
		// 2, 4, 6
		if(i % 2 === 1)
		{

			if(!(input[i] in graph['lex_vars']['operations']))
			{
				return false
			}
		}
		// check for the existence of an integer
		// 1, 3, 5
		else
		{
			if(Number(input[i]) === NaN)
			{
				return false
			}
		}

		i += 1
	}
	if(Number(input[input.length - 1]) === NaN)
	{
		return false
	}

	return true

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

/*
input -> expresion 
expression -> 
*/


const copyInput = (machine, current_state_name) => {

	// console.log({parent_stateName, currentStateName})
	// machine = {graph, parent_state_head}
	// getVariable(machine, var_name)
	// setVariable(machine, var_name, new_value)
	const input = hcssm.getVariable(graph, parent_stateName, 'input').value
	hcssm.setVariable(graph, 'create expression', 'input_for_parsing', input)
	// console.log(graph)
	console.log({stuff: hcssm.getVariable(graph, 'create expression', 'input_for_parsing')})
	// fail
	// console.log(graph)
	return true

}

const getNumber = (machine, current_state_name) => {
	console.log({parent_state_name, current_state_name})
	fail
	return true
}
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
			variableNames
			value
			*/
			'root': {
				'name'			: 	'root',
				'function'		: 	returnTrue,
				'children'		: 	['create expression'],//['split'],
				'variableNames'	: 	['i_0', 'input', 'expression']

			},
				'i_0':	{
					'name'	: 'i_0',
					'value'	: 0
				},

				'input': {
					'name' 		: 	'input',
					'value'		: 	'1 + 2 + 3 + 4 - 5 + 6 * 7 - 8 - 9 + 10 * 11 + 12'
				},
				'expression': {
					'name' 		: 	'expression',
					'value'		: 	[]
				},

				// read through the input and makes an expression if one can be made
				'create expression': {
					'name'			: 	'create expression',
					'function'		: 	copyInput,
					'children' 		: 	['number'],
					'variableNames' : 	['token']
				},
					'token': {
						'name': 'token',
						'value': ''
					},
					'number' : {
						'name' 		: 	'number',
						'function'	: 	returnTrue,
						'next' 		: 	['operator', 'input is valid'],
						'children' : 	['number get chars']
					},
						'number get chars': {
							'name' 		: 	'get chars',
							'function'	: 	'getChars',
							'next'		: 	['get number'],

						},
						'get number': {
							'name' 		: 	'get number',
							'function'	: 	getNumber,
							// 'children'	: 	['get chars'],
						},
					'input is valid': {
						'name'	: 	'input is valid',
						'function'	: 'isInputValid'
						// returns true if we hit end of string
					},
					'operator' : {
						'name' 		: 	'operator',
						'function'	: 	returnTrue,
						'next' 		: 	['number'],
						'children' : 	['operator get chars'],

					},
						'operator get chars': {
							'name' 		: 	'get chars',
							'function'	: 	'getChars',
							'next'		: 	['get operator'],

						},
						'get operator': {
							'name' 		: 	'get operator',
							'function'	: 	'getOperator',
						},
						
			/*
			parse
				children
					get number
						next
							get operator
							is valid
						children
							get chars
					get operator
						next
							get number
						children
							get chars
			the data will be stored in an expression list when this is done

			*/
			'split': {
				'name'		: 	'split',
				'function'	: 	returnTrue,
				'next'		: 	['validate', 'invalid'],
				'children'	: 	['char'],
				'variableNames'	: 	['collected_string']

			},
				'collected_string': {
					'name'	: 	'collected_string',
					'value'	: 	''
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
				'next'		: 	['input_has_1_value','evaluate_expression'],
				'children'	: 	['a']
			},

			'input_has_1_value': {
				'parents'	: 	[],
				'name'		: 	'input_has_1_value',
				'function'	: 	showAndExit,

			},

				// split
				
				'char': {
					'parents'	: 	['split'],
					'name'		: 	'char',
					'function'	: 	collectChar,
					'next'		: 	['last_to_save', 'char', 'save']
				},



				'save': {
					'parents'	: 	['split'],
					'name'		: 	'save',
					'function'	: 	save,
					'next'		: 	[' ']
				},

				' ': {
					'parents'	: 	['split'],
					'name'		: 	' ',
					'function'	: 	parseChar,
					'next'		: 	[' ', 'init']
				},

				'init': {
					'parents'	: 	['split'],
					'name'		: 	'init',
					'function'	: 	init,
					'next'		: 	['char']
				},

				'last_to_save': {
					'parents'	: 	['split'],
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
// var nodeReducer4 = (state = {vars}, action) => {

//     //console.log("got here", action.type, action)
//     // set this false when the item enteres
//     return hcssm.universalReducer(state, action, state.vars)

// }
//var calculator_reducer = createStore(nodeReducer4)
// -1 so highest level of graph isn't printed with an indent
// ['split', '0'], ['input_has_1_value', '0'] define a the start point and end point
// through the state chart
// ['input_has_1_value', '0']
// hcssm.visitRedux(vars, 'root', 1)

console.log('done w machine')
