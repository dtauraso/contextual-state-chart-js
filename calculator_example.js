
//var createStore = require('redux')
//import createStore from 'redux'
var hcssm = require('./contextual_state_chart')
// hcssm.getVariable

//import * as hcssm from './contextual_state_chart.js'
var cf = require('./common_functions')
//import * as cf from './common_functions.js'
var isNumber = (currentState, graph, parentState) => {

	// if the token from parent_state is a number
	// convert to number
	// save to expression
}
// current_state, graph, parent_state
var parseChar = (currentState, graph, parentState) => {

	//console.log('in parseChar', node)
	let stateName = currentState
	let i = graph['i']
	let input = graph['input']

	if(i >= input.length) {
		return false
	}
	if(graph['parsingShecks'][stateName](currentState, graph))
	{
		graph['i'] += 1
		return true
	}
	return false
}

var getA = (currentState, graph, parentState) => {

	// all chains start with this function
	graph['operationVars']['chainLength'] = 0


	let i = graph['i']
	let input = graph['input']
	graph['operationVars']['a'] = input[i]
	graph['operationVars']['chainLength'] += 1
	graph['i'] += 1

	
	return true
}

var getB = (currentState, graph, parentState) => {


	let i = graph['i']
	let input = graph['input']
	graph['operationVars']['b'] = input[i]
	graph['operationVars']['chainLength'] += 1
	graph['i'] += 1

	
	return true
}

var isOp = (currentState, graph, parentState) => {

	// check current operand with jth operand
	let i = graph['i']
	let input = graph['input']

	let j = graph['lexVars']['j']
	let operators = graph['lexVars']['operators']
	return input[i] === operators[j]

}

var evaluate = (currentState, graph, parentState) => {


	let i = graph['i']
	let input = graph['input']
	graph['operationVars']['b'] = input[i]


	let a = Number(graph['operationVars']['a'])
	let b = Number(graph['operationVars']['b'])

	let j = graph['lexVars']['j']
	let operators = graph['lexVars']['operators']
	let operations = graph['lexVars']['operations']

	graph['operationVars']['a'] = operations[operators[j]] (a, b)
	graph['operationVars']['b'] = 0
	graph['i'] += 1
	let strA = String(graph['operationVars']['a'])


	let chainLength = graph['operationVars']['chainLength']

	let beforeTheChain = graph['input'].slice(0, i - 2)

	let beforeTheChainLen = beforeTheChain.length
	let theChain = strA

	let afterTheChain = graph['input'].slice(i + 1, graph['input'].length)

	graph['input'] = beforeTheChain

	graph['input'].push(theChain)
	for(var k in afterTheChain)
	{
		graph['input'].push(afterTheChain[k])
	}

	graph['i'] = beforeTheChainLen

	return true
}

var ignoreOp = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']

	let j = graph['lexVars']['j']
	let operators = graph['lexVars']['operators']

	// need to prove input[i] is an operator, but not operators[j]

	if(endOfInput(currentState, graph, parentState))
	{
		return false
	}
	if(operators.includes(input[i]) && (input[i] !== operators[j]))
	{
		graph['operationVars']['a'] = 0
		return true
	}
	return false
}



var endOfInput = (currentState, graph, parentState) => {


	let i = graph['i']
	let input = graph['input']

	return i >= input.length
}

var inputIsInvalid = (currentState, graph, parentState) => {
	console.log('your input is invalid')
	return true
}

var noMoreInput = (currentState, graph, parentState) => {

	return endOfInput(currentState, graph, parentState)

}


var saveDigit = (currentState, graph, parentState) => {
	let char = cf.getChar(currentState, graph)

	return (char >= '0' && char <= '9')
}



var isWhiteSpace = (currentState, graph) => {

	return cf.getChar(currentState, graph) === ' '
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








var returnTrue = (graph, parentStateName, currentStateName) => {
	return true
}
var returnFalse = (graph, parentStateName, currentStateName) => {
	return false
}
var resetForNextRound = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']
	if(i < input.length) {
		return false
	}
	graph['lexVars']['j'] += 1
	graph['i'] = 0
	return true
}

var showAndExit = (currentState, graph, parentState) => {

	let input = graph['input']
	if(input.length > 1) {
		return false
	}
	console.log(input[0])
	return true

}




var collectChar = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']

	if(input[i] === ' ') {
		return false
	}
	graph['collectedString'] += input[i]
	graph['i'] += 1
	return true
}
var save = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']
	if(input[i] !== ' ') {
		return false
	}
	let collectedString = graph['collectedString']
	graph['expression'].push(collectedString)
	return true
}
var init = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']
	if(input[i] === ' ') {
		return false
	}
	graph['collectedString'] = ''
	return true
}

var lastToSave = (currentState, graph, parentState) => {

	if(!endOfInput(currentState, graph, parentState)) {
		return false
	}
	let collectedString = graph['collectedString']
	graph['expression'].push(collectedString)
	graph['input'] = graph['expression']
	graph['i'] = 0
	graph['expression'] = []
	graph['collectedString'] = ''
	return true
}
var validOp = (currentState, graph, parentState) => {

	let i = graph['i']
	let input = graph['input']
	if(!isOp(currentState, graph, parentState)) {
		return false
	}
	graph['operationVars']['a'] = input[i - 1]
	return true
}
var validate = (currentState, graph, parentState) => {

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

			if(!(input[i] in graph['lexVars']['operations']))
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

var parsingChecks = {

	'op': isOp,
	'valueIgnore': cf.isDigit,
	'opIgnore': ignoreOp,
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

// currentState, graph, parentState
// const copyInput = (graph, parentStateName, currentStateName) => {

// 	console.log('copy input')
// 	// console.log({parentStateName, currentStateName})
// 	// machine = {graph, parent_state_head}
// 	// getVariable(machine, var_name)
// 	// setVariable(machine, var_name, new_value)
// 	const input = hcssm.getVariable(graph, parentStateName, 'input').value
// 	console.log({input})
// 	// hcssm.setVariable(graph, 'create expression', 'inputForParsing', input)
// 	// console.log(graph)
// 	console.log({stuff: hcssm.getVariable(graph, 'create expression', 'inputForParsing')})
// 	// fail
// 	// console.log(graph)
// 	return true

// }

const numberGetDigit = (graph, parentStateName, currentStateName) => {

	const input = hcssm.getVariable(graph, 'root', 'input').value
	let i = hcssm.getVariable(graph, 'root', 'i0').value
	let token = hcssm.getVariable(graph, 'create expression', 'token').value

	// console.log({input, i, token})
	if(i >= input.length) {
		return false
	}
	if(!(input[i] >= '0' && input[i] <= '9')) {
		return false
	}

	hcssm.setVariable(graph, 'create expression', 'token', token + input[i])
	hcssm.setVariable(graph, 'root', 'i0', i + 1)

	return true


}
const saveNumber = (graph, parentStateName, currentStateName) => {
	console.log('saveNumber')
	console.log({parentStateName, currentStateName})
	let token = hcssm.getVariable(graph, 'create expression', 'token').value
	if(Number(token) === NaN) {
		return false
	}
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	expression.push(Number(token))

	
	hcssm.setVariable(graph, 'root', 'expression', expression)
	// console.log(graph['nodeGraph2']['expression'])
	
	// fail
	return true
}

const isInputValid = (graph, parentStateName, currentStateName) => {
	
	// will only return true after we have read in all the input and it's a valid expression
	const input = hcssm.getVariable(graph, 'root', 'input').value
	let i = hcssm.getVariable(graph, 'root', 'i0').value

	if(i >= input.length) {
		return true
	}
	return false
}
var vars = {
	'input' : /* passes '1 + 2 + 3 + 4',*//*'1 + 2 + 3 + 4 - 5 + 6 + 7 - 8 - 9 + 10 + 11 + 12',*//*'1+',*//*'1 +2',*/'1 + 2 + 3 + 4 - 5 + 6 * 7 - 8 - 9 + 10 * 11 + 12', // '1 '
	// 10 - 18 - 8 - 42
	'expression' : [],
	'collectedString' : '',
	'i' : 0,

	'operationVars' : {

		'a' : 0,

		'b' : 0},

	'lexVars' : {
		'operators' : ['*', '/', '-', '+'],
		'j' : 0,
		'operations' : {'*': mult, '/': divide, '+': plus, '-': minus}},
	// this control graph uses string for states and cases
	'nodeGraph2' : {

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
				// i0 instead of i so the variable name search will not pick the wrong one
				'variableNames'	: 	['i0', 'input', 'expression']

			},
				'i0':	{
					'name'	: 'i0',
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
					'function'		: 	returnTrue,
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
						'next' 		: 	['input is valid', 'operator'],
						'children' : 	['number get digit']
					},
						// we need to prove it's a number

						'number get digit': {
							'name' 		: 	'number get digit',
							'function'	: 	numberGetDigit,
							'next'		: 	['number get digit', 'save number'],

						},
						'save number': {
							'name' 		: 	'save number',
							'function'	: 	saveNumber,
						},
					'input is valid': {
						'name'	: 	'input is valid',
						'function'	: isInputValid
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
				'variableNames'	: 	['collectedString']

			},
				'collectedString': {
					'name'	: 	'collectedString',
					'value'	: 	''
				},


			'validate': {
				'parents'	: 	[],
				'name'		: 	'validate',
				'function'	: 	validate,
				'next'		: 	['evaluateExpression']
			},
			'invalid': {
				'parents'	: 	[],
				'name'		: 	'invalid',
				'function'	: 	inputIsInvalid
			},
			'evaluateExpression': {
				'parents'	: 	[],
				'name'		: 	'evaluateExpression',
				'function'	: 	returnTrue,
				'next'		: 	['inputHas1Value','evaluateExpression'],
				'children'	: 	['a']
			},

			'inputHas1Value': {
				'parents'	: 	[],
				'name'		: 	'inputHas1Value',
				'function'	: 	showAndExit,

			},

				// split
				
				'char': {
					'parents'	: 	['split'],
					'name'		: 	'char',
					'function'	: 	collectChar,
					'next'		: 	['lastToSave', 'char', 'save']
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

				'lastToSave': {
					'parents'	: 	['split'],
					'name'		: 	'lastToSave',
					'function'	: 	lastToSave
				},


				// evaluate_expression

				'a': {
					'parents'	: 	['evaluate_expression'],
					'name'		: 	'a',
					'function'	: 	getA,
					'next'		: 	['resetForNextRoundOfInput', 'op', 'opIgnore']
				},

				'op': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'op',
					'function'	: 	parseChar,
					'next'		: 	['error', 'b evaluate']
				},
				// add new step to save b?
				// make a result variable to show the result?
				'b evaluate': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'b evaluate',
					'function'	: 	evaluate,
					'next'		: 	['resetForNextRoundOfInput', 'a', 'opIgnore']
				},

				'opIgnore': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'opIgnore',
					'function'	: 	parseChar,
					'next'		: 	['error', 'valueIgnore']
				},

				'valueIgnore': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'valueIgnore',
					'function'	: 	parseChar,
					'next'		: 	['resetForNextRoundOfInput', 'opIgnore', 'valueIgnore validOp']
				},

				'valueIgnore validOp': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'valueIgnore validOp',
					'function'	: 	validOp,
					'next'		: 	['op']
				},

				'error': {
					'parents'	: 	['evaluateExpression'],
					'name'		: 	'error',
					'function'	: 	noMoreInput
				},

				'resetForNextRoundOfInput': {
					'parents'	: 	[],
					'name'		: 	'resetForNextRoundOfInput',
					'function'	: 	resetForNextRound,
					'next'		: 	['endOfEvaluating']
				},
				'endOfEvaluating': {
					'parents'	: 	[],
					'name'		: 	'endOfEvaluating',
					'function'	: 	returnTrue
				},
		},

	'parsingChecks' : parsingChecks
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
hcssm.visitRedux(vars, 'root', 1)

console.log('done w machine')
