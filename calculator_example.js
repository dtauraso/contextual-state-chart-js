
//var createStore = require('redux')
//import createStore from 'redux'
var hcssm = require('./contextual_state_chart')
// hcssm.getVariable

//import * as hcssm from './contextual_state_chart.js'
var cf = require('./common_functions')

// tokenizer

// todo: fix the broken parent state -> variable name connections

// saveOperator
const numberGetDigit = (graph, parentStateName, currentStateName) => {

	const input = hcssm.getVariable(graph, 'root', 'input').value
	let i1 = hcssm.getVariable(graph, 'parse to tokens', 'i1').value
	let token = hcssm.getVariable(graph, 'create expression', 'token').value

	// console.log(currentStateName)
	// console.log({input, i, token})
	if(i1 >= input.length) {
		return false
	}
	if(!(input[i1] >= '0' && input[i1] <= '9')) {
		return false
	}

	hcssm.setVariable(graph, 'create expression', 'token', token + input[i1])
	hcssm.setVariable(graph, 'parse to tokens', 'i1', i1 + 1)

	return true


}
const saveNumber = (graph, parentStateName, currentStateName) => {
	// console.log('saveNumber')
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// console.log({parentStateName, currentStateName, expression})
	let token = hcssm.getVariable(graph, 'create expression', 'token').value
	if(Number(token) === NaN) {
		return false
	}

	expression.push(Number(token))
	console.log({expression})

	let i1 = hcssm.getVariable(graph, 'parse to tokens', 'i1').value
	let input = hcssm.getVariable(graph, 'root', 'input').value

	while(input[i1] === ' ') {i1 += 1}
	hcssm.setVariable(graph, 'root', 'expression', expression)
	hcssm.setVariable(graph, 'create expression', 'token', '')
	hcssm.setVariable(graph, 'parse to tokens', 'i1', i1)
	// console.log(graph['nodeGraph2']['expression'])
	
	// fail
	return true
}

const operatorGetOperator = (graph, parentStateName, currentStateName) => {

	const input = hcssm.getVariable(graph, 'root', 'input').value
	let i1 = hcssm.getVariable(graph, 'parse to tokens', 'i1').value
	let token = hcssm.getVariable(graph, 'create expression', 'token').value
	// console.log({input, i, token})
	if(i1 >= input.length) {
		return false
	}
	const operators = ['*', '/', '+', '-']
	if(!(operators.includes(input[i1]))) {
		return false
	}

	hcssm.setVariable(graph, 'create expression', 'token', token + input[i1])
	hcssm.setVariable(graph, 'parse to tokens', 'i1', i1 + 1)

	return true
}

const saveOperator = (graph, parentStateName, currentStateName) => {
	// console.log('saveOperator')
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// console.log({parentStateName, currentStateName, expression})
	let token = hcssm.getVariable(graph, 'create expression', 'token').value
	const operators = ['*', '/', '+', '-']

	if(!(operators.includes(token))) {
		return false
	}
	// let expression = hcssm.getVariable(graph, 'root', 'expression').value

	expression.push(token)

	let i1 = hcssm.getVariable(graph, 'parse to tokens', 'i1').value
	let input = hcssm.getVariable(graph, 'root', 'input').value

	while(input[i1] === ' ') {i1 += 1}

	hcssm.setVariable(graph, 'root', 'expression', expression)
	hcssm.setVariable(graph, 'create expression', 'token', '')
	hcssm.setVariable(graph, 'parse to tokens', 'i1', i1)

	// console.log(graph['nodeGraph2']['expression'])
	
	// fail
	return true
}



const isInputValid = (graph, parentStateName, currentStateName) => {
	
	// will only return true after we have read in all the input and it's a valid expression
	const input = hcssm.getVariable(graph, 'root', 'input').value
	let i1 = hcssm.getVariable(graph, 'parse to tokens', 'i1').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	if(i1 >= input.length) {
		console.log({expression})
		return true
	}
	return false
}


// evaluator

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

const getA2 = (graph, parentState, currentState) => {

	// all chains start with this function


	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value
	hcssm.setVariable(graph, 'evaluateExpression', 'a', expression[i2])
	hcssm.setVariable(graph, 'evaluateExpression', 'i2', i2 + 1)
	
	return true
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

var getB2 = (graph, parentState, currentState) => {


	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value
	hcssm.setVariable(graph, 'evaluateExpression', 'b', expression[i2])
	hcssm.setVariable(graph, 'evaluateExpression', 'i2', i2 + 1)

	
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

var isOp2 = (graph, parentState, currentState) => {

	// check current operand with jth operand
	// let i = graph['i']
	// let input = graph['input']
	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value
	let j = hcssm.getVariable(graph, 'evaluateExpression', 'j').value
	let operators = hcssm.getVariable(graph, 'evaluateExpression', 'operators').value

	// let j = graph['lexVars']['j']
	// let operators = graph['lexVars']['operators']
	if(expression[i2] === operators[j]) {
		hcssm.setVariable(graph, 'evaluateExpression', 'i2', i2 + 1)
		return true

	}
	return false
	// increment

}


var isOp = (currentState, graph, parentState) => {

	// check current operand with jth operand
	let i = graph['i']
	let input = graph['input']

	let j = graph['lexVars']['j']
	let operators = graph['lexVars']['operators']
	return input[i] === operators[j]

}


var evaluate2 = (graph, parentState, currentState) => {


	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// let input = graph['input']
	hcssm.setVariable(graph, 'evaluateExpression', 'b', expression[i2])

	// graph['operationVars']['b'] = input[i]


	let a = hcssm.getVariable(graph, 'evaluateExpression', 'a').value
	let b = hcssm.getVariable(graph, 'evaluateExpression', 'b').value


	// let j = graph['lexVars']['j']
	// let operators = graph['lexVars']['operators']
	let j = hcssm.getVariable(graph, 'evaluateExpression', 'j').value
	let operators = hcssm.getVariable(graph, 'evaluateExpression', 'operators').value
	let operations = hcssm.getVariable(graph, 'evaluateExpression', 'operatorFunctions').value
	// let operations = graph['lexVars']['operations']

	hcssm.setVariable(graph, 'evaluateExpression', 'a', operations[operators[j]] (a, b))
	hcssm.setVariable(graph, 'evaluateExpression', 'b', 0)

	// update array to account for the changes
	// console.log(i2)
	// graph['operationVars']['a'] = operations[operators[j]] (a, b)
	// graph['operationVars']['b'] = 0
	// hcssm.setVariable(graph, 'root', 'iExpression', i + 1)
	// i2 += 1
	// graph['i'] += 1

	let strA = hcssm.getVariable(graph, 'evaluateExpression', 'a').value
	// String(graph['operationVars']['a'])


	// let chainLength = graph['operationVars']['chainLength']

	let beforeTheChain = expression.slice(0, i2 - 2)
	// console.log(beforeTheChain)
	// graph['input'].slice(0, i - 2)

	let beforeTheChainLen = beforeTheChain.length
	let theChain = strA

	let afterTheChain = expression.slice(i2 + 1, expression.length)

	expression = beforeTheChain
	// graph['input'] = beforeTheChain
	expression.push(theChain)
	// graph['input'].push(theChain)
	for(var k in afterTheChain)
	{
		expression.push(afterTheChain[k])
		// graph['input'].push(afterTheChain[k])
	}
	hcssm.setVariable(graph, 'evaluateExpression', 'i2', beforeTheChainLen)
	hcssm.setVariable(graph, 'root', 'expression', expression)
	// graph['i'] = beforeTheChainLen
	// console.log(hcssm.getVariable(graph, 'root', 'expression').value)
	return true
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


var ignoreOp2 = (graph, parentState, currentState) => {

	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	let j = hcssm.getVariable(graph, 'evaluateExpression', 'j').value
	let operators = hcssm.getVariable(graph, 'evaluateExpression', 'operators').value

	// let i = graph['i']
	// let input = graph['input']

	// let j = graph['lexVars']['j']
	// let operators = graph['lexVars']['operators']

	// need to prove input[i] is an operator, but not operators[j]

	if(endOfInput2(graph, parentState, currentState))
	{
		return false
	}
	if(operators.includes(expression[i2]) && expression[i2] !== operators[j]) {
	// if(operators.includes(input[i]) && (input[i] !== operators[j]))
	// {
		hcssm.setVariable(graph, 'evaluateExpression', 'a', 0)
		hcssm.setVariable(graph, 'evaluateExpression', 'i2', i2 + 1)
		// graph['operationVars']['a'] = 0
		return true
	}
	return false
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

var endOfInput2 = (graph, parentState, currentState) => {

	let i2 = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// let i = graph['i']
	// let input = graph['input']

	return i2 >= expression.length
}


var endOfInput = (currentState, graph, parentState) => {


	let i = graph['i']
	let input = graph['input']

	return i >= input.length
}


var inputIsInvalid2 = (graph, parentState, currentState) => {
	console.log('your input is invalid')
	return true
}

var inputIsInvalid = (currentState, graph, parentState) => {
	console.log('your input is invalid')
	return true
}

var noMoreInput2 = (graph, parentState, currentState) => {

	return endOfInput2(graph, parentState, currentState)

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







var returnTrue2 = (graph, parentStateName, currentStateName) => {
	return true
}

var returnTrue = (graph, parentStateName, currentStateName) => {
	return true
}
var returnFalse2 = (graph, parentStateName, currentStateName) => {
	return false
}

var returnFalse = (graph, parentStateName, currentStateName) => {
	return false
}

var resetForNextRound2 = (graph, parentState, currentState) => {

	let i = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// let i = graph['i']
	// let input = graph['input']
	if(i < expression.length) {
		return false
	}
	let j = hcssm.getVariable(graph, 'evaluateExpression', 'j').value
	hcssm.setVariable(graph, 'evaluateExpression', 'j', j + 1)
	// graph['lexVars']['j'] += 1
	hcssm.setVariable(graph, 'evaluateExpression', 'i2', 0)

	// graph['i'] = 0
	return true
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

var showAndExit2 = (graph, parentState, currentState) => {

	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// let input = graph['input']
	if(expression.length > 1) {
		return false
	}
	console.log(expression[0])
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




// var collectChar = (currentState, graph, parentState) => {

// 	let i = graph['i']
// 	let input = graph['input']

// 	if(input[i] === ' ') {
// 		return false
// 	}
// 	graph['collectedString'] += input[i]
// 	graph['i'] += 1
// 	return true
// }
// var save = (currentState, graph, parentState) => {

// 	let i = graph['i']
// 	let input = graph['input']
// 	if(input[i] !== ' ') {
// 		return false
// 	}
// 	let collectedString = graph['collectedString']
// 	graph['expression'].push(collectedString)
// 	return true
// }
// var init = (currentState, graph, parentState) => {

// 	let i = graph['i']
// 	let input = graph['input']
// 	if(input[i] === ' ') {
// 		return false
// 	}
// 	graph['collectedString'] = ''
// 	return true
// }

// var lastToSave = (currentState, graph, parentState) => {

// 	if(!endOfInput(currentState, graph, parentState)) {
// 		return false
// 	}
// 	let collectedString = graph['collectedString']
// 	graph['expression'].push(collectedString)
// 	graph['input'] = graph['expression']
// 	graph['i'] = 0
// 	graph['expression'] = []
// 	graph['collectedString'] = ''
// 	return true
// }

var validOp2 = (graph, parentState, currentState) => {

	let i = hcssm.getVariable(graph, 'evaluateExpression', 'i2').value
	let expression = hcssm.getVariable(graph, 'root', 'expression').value

	// let i = graph['i']
	// let input = graph['input']
	if(!isOp2(currentState, graph, parentState)) {
		return false
	}
	hcssm.setVariable(graph, 'evaluateExpression', 'a', expression[i - 1])
	// graph['operationVars']['a'] = input[i - 1]
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
root
	input
	expression

parse to tokens
	i1
create expression
	token

evaluateExpression
	i2
	a
	b
	operators
	j
	operatorFunctions
*/
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

// no substring variable names
// no duplicate variable names
// no adding context names to index variables

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
				'children'		: 	['parse to tokens'],//['split'],

		  		'variableNames'	: 	{input: 'input', expression: 'expression'}

			},
				'input': {
					'name' 		: 	'input',
					'value'		: 	'1 + 2 + 3 + 4 - 5 + 6 * 7 - 8 - 9 + 10 * 11 + 12'
				},
				'expression': {
					'name' 		: 	'expression',
					'value'		: 	[]
				},

				'parse to tokens': {
					'name'		: 	'parse to tokens',
					'function'	: 	returnTrue,
					'next'		: 	['evaluateExpression'],
					'children'	: 	['create expression'],
					'variableNames': {i1: 'i1'}
				},
					'i1':	{
						'name'	: 'i1',
						'value'	: 0
					},				

				// read through the input and makes an expression if one can be made
				'create expression': {
					'name'			: 	'create expression',
					'function'		: 	returnTrue,
					'children' 		: 	['number'],
					'variableNames' : 	{token: 'token'}
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
						// returns true if we hit end of input and it's a valid expression
					},
					'operator' : {
						'name' 		: 	'operator',
						'function'	: 	returnTrue,
						'next' 		: 	['number'],
						'children' : 	['operator get operator'],

					},
						'operator get operator': {
							'name' 		: 	'operator get operator',
							'function'	: 	operatorGetOperator,
							'next'		: 	['get operator'],

						},
						'get operator': {
							'name' 		: 	'get operator',
							'function'	: 	saveOperator,
						},

				'evaluateExpression': {
					'name'		: 	'evaluateExpression',
					'function'	: 	returnTrue,
					'next'		: 	['inputHas1Value'/*,'evaluateExpression'*/],
					'children'	: 	['a0'],
					'variableNames':{i2: 'i2', a: 'a', b: 'b', operators: 'operators', j: 'j', operatorFunctions: 'operatorFunctions'}
				},
					'i2': {
						'name': 'i2',
						'value' : 0
					},
					'a': {
						'name': 'a',
						'value' : 0
					},
					'b': {
						'name': 'b',
						'value' : 0
					},
					'operators': {
						'name': 'operators',
						'value': ['*', '/', '-', '+']
					},
					'j': {
						'name': 'j',
						'value' : 0
					},
					'operatorFunctions' : {
						'name': 'operatorFunctions',
						'value': {'*': mult, '/': divide, '+': plus, '-': minus}
					},
					// get, save, increment or update the array
					'a0': {
						'name'		: 	'a0',
						'function'	: 	getA2, // increment
						'next'		: 	['resetForNextRoundOfInput', 'op', 'opIgnore']
					},

					'op': {
						'name'		: 	'op',
						'function'	: 	isOp2, // increment
						'next'		: 	['b evaluate']
					},
					// add new step to save b?
					// make a result variable to show the result?
					// the item 'b evaluate' put in is the same item 'a0' starts on
					'b evaluate': {
						'name'		: 	'b evaluate',
						'function'	: 	evaluate2, // updates the array
						'next'		: 	['a0']
					},

					'opIgnore': {
						'name'		: 	'opIgnore',
						'function'	: 	ignoreOp2, // increment
						'next'		: 	['a0']
					},

					// some of this is wrong
					'resetForNextRoundOfInput': {
						'name'		: 	'resetForNextRoundOfInput',
						'function'	: 	resetForNextRound2,
						'next'		: 	[/*'endOfEvaluating'*/'inputHas1Value', 'a0']
					},
					// should only return true if we can't evaluate anymore
					// 'endOfEvaluating': {
					// 	'name'		: 	'endOfEvaluating',
					// 	'function'	: 	returnTrue
					// },
				'inputHas1Value': {
					'name'		: 	'inputHas1Value',
					'function'	: 	showAndExit2,


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
