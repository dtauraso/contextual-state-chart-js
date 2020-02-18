//var createStore = require('redux')
//import createStore from 'redux'
var hcssm = require('./contextual_state_chart')
//import * as hcssm from './contextual_state_chart.js'
var cf = require('./common_functions')
//import * as cf from './common_functions.js'



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
	if (operators.includes(input[i]) && (input[i] != operators[j]))
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



var parsing_checks = {

	'op' : {'0':isOp},
	'value_ignore' : {'0':cf.isDigit},
	'op_ignore' : {'0': ignoreOp},
	' ' : {'0':isWhiteSpace},

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

			// any next states having {} means it is a finishing state(but having no edges as true signals an error )
			// {'next': [], 'children':[], 'functions':[]}
			// {'next': {'0': {}}, 'children':{'0': {}}, 'functions':{'0'}}

			'split' :
				{'next': {'0': {'validate':'0', 'invalid':'0'}},
				'children': {'0': {'char':'0'}},
				'functions':{'0':returnTrue},
				'parents' :{'0':{'root':'0'}}},



			'validate' :
				{'next': {'0': {'evaluate_expression': '0'}},
				'children':{'0': {}}, 
				'functions':{'0': validate},
				'parents' :{'0':{}}},


			'evaluate_expression' :
				{'next': {'0': {'input_has_1_value':'0','evaluate_expression':'0'}},
				'children':{'0': {'a':'0'}},
				'functions':{'0': returnTrue},
				'parents' :{'0':{}}},



			'reset_for_next_round_of_input':
				{'next': {'0': {'end_of_evaluating': '0'}},
				'children':{'0':{}},
				'functions':{'0':resetForNextRound},
				'parents': {'0':{}}},


			'end_of_evaluating' :
				{'next': {'0': {}},
				'children':{'0': {}},
				'functions':{'0':returnTrue},
				'parents':	{'0':{}}},

			'input_has_1_value' :
				{'next': {'0': {}},
				'children':{'0': {}},
				'functions':{'0':showAndExit},
				'parents': {'0':{}}},


				// split
				'char':
					{'next': {'0': {'last_to_save': '0', 'char': '0', 'save': '0'}},
					'children':{'0': {}},
					'functions':{'0':collectChar},
					'parents': {'0':{'split':'0'}}}, // actually needs parents because it's the first state checked from split

				'save':
					{'next': {'0': {' ': '0'}},
					'children':{'0': {}},
					'functions':{'0':save},
					'parents': {'0':{}}},

				' ' :
					{'next': {'0':{' ':'0','init':'0'}},
					'children':{'0':{}},
					'functions':{'0':cf.parseChar},
					'parents': {'0':{}}},


				'init':
					{'next': {'0': {'char': '0'}},
					'children':{'0': {}},
					'functions':{'0': init},
					'parents': {'0':{}}},

				'last_to_save' :
					{'next': {'0': {}},
					'children':{'0': {}},
					'functions':{'0': lastToSave},
					'parents': {'0':{}}},



				// evaluate_expression
				'a' :
					{'next': {'0' : {'reset_for_next_round_of_input':'0', 'op':'0', 'op_ignore':'0'}},
					'children': { '0':{}},
					'functions' : {'0':getA/*  setKindOfNumberToA */},
					'parents': {'0':{'evaluate_expression': '0'}}},

				'op' :
					{'next': {'0':{'error': '0', 'b':'evaluate'}},
					'children': {'0':{}}, 
					'functions' : { '0': cf.parseChar},
					'parents': {'0':{}}},

				'b' :
					{'next': { 'evaluate':{'reset_for_next_round_of_input':'0', 'a':'0', 'op_ignore':'0'}},
					'children': {'evaluate':{}},
					'functions' : {'evaluate':evaluate},
					'parents': {'0':{}, 'evaluate':{}}},


				'op_ignore' :
					{'next': {'0':{'error': '0', 'value_ignore':'0'}},
					'children': {'0':{}},
					'functions' : {'0':cf.parseChar},
					'parents': {'0':{}}},

				'value_ignore' :
					{'next': {'0':{'reset_for_next_round_of_input':'0', 'op_ignore':'0', 'value_ignore': 'valid_op'},'valid_op': {'op':'0'}},
					'children': {'0':{}, 'valid_op': {}},
					'functions' : {'0':cf.parseChar, 'valid_op': validOp},
					'parents': {'0':{'ignore':'0'}, 'valid_op': {}}},




				'error' :
					{'next': {'0':{}},
					'children':{'0':{}},
					'functions':{'0':noMoreInput},
					'parents':{'0':{}}},


				'invalid' :
					{'next': {'0': {}},
					'children':{'0': {}},
					'functions':{'0': inputIsInvalid},
					'parents': {'0': {}}}





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
hcssm.visitRedux(['split', '0']/*, calculator_reducer*/, vars, -1)

console.log('done w machine')
