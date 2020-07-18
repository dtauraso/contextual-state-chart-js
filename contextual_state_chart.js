
exports.getVariable = (machine, variable_name) => {

    // The parent state should only be linked to one variable name at a time
    // in the below example:
    // You can say 'quantity 2' then call it 'quantity' when using it in the reducers
    // as long as the same parent doesn't also have a variable name called 'quantity 3'.
    // This is to allow the user to use variable names with this contextual state chart
	// at a simular level of detail they would use in a programming lnagugae
	// don't need to know exactly what parent the varaible is a child of
	// don't need to copy entire variables or references to them into new variables lower down the machine
	// this is not going to be productive for machines of > 100 levels deep
	// var_name -> state parent
	// look for it at graph[parent_state_head.current_parent]
	// if it's not there, traverse up the parent linked list untill it's found or not found
	let graph = machine['graph']
	let parent_state_head = machine['parent_state_head']
    let cell = graph['node_graph2'][parentStateName]//getCell(graph, parentStateName)

    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('variableNames')) {
        return null
    }
    let variable = null

    let variableNameIsInCellVariableNamesCount = 0
    let found = false

    cell.variableNames.forEach(cellVariableName => {

		// this doesn't work if 1 vaiable name is a substring of the one we are loking for
        if(cellVariableName.search(variable_name) === -1) {
            return null
        }

        variableNameIsInCellVariableNamesCount += 1
		found = true
		// console.log(cellVariableName, Object.keys(graph['node_graph2']))
		variable = graph['node_graph2'][variable_name]
		// console.log({variable})
    })

    if(variableNameIsInCellVariableNamesCount > 1) {
        console.log(`You cannot have more than 1 variable name that contains |${variableName}|`)
        return null
    }
    if(!found) {
        console.log(`A variable similarly called ${variableName} may exist but there is no link from |${parentStateName}| to |${variableName}|`)
        return null

    }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
	// console.log({variable})

    return variable
}

exports.setVariable = (machine, variableName, newValue) => {

	// console.log({parentStateName, variableName, newValue})
    // parentStateName is an array of strings
    let variable = exports.getVariable(machine, variableName)
	// console.log({variable, newValue})
	variable.value = newValue
}

function ListNode (current_parent, ith_parent, grand_parent) {

	this.current_parent = current_parent
	this.ith_parent = ith_parent
	this.grand_parent = grand_parent
}
exports.getIndents = (count) => {

	var indent = ''

	while (count > 0)
	{
		indent += '    '
		count -= 1
	}
	return indent
}




exports.printLevelsBounds = (ith_state, graph, state_name, indents) => {
	let our_string = graph['input']
	if(typeof our_string === 'object') {
		our_string = our_string.join(' ')

	}
	console.log(`Round #: ${ith_state} ${exports.getIndents(indents)} | state name = '${state_name}' | level = ${indents} | function = ${graph['node_graph2'][state_name]['function'].name} | a = ${graph['operation_vars']['a']} | expression = ${our_string}\n`)
}

exports.printVarStore = (graph) => {

	let m = graph['input']
	return '|' + graph['input'][m] + '|'

}

exports.visitNode = (graph, next_state, state_metrics, parent_state) => {
	
	if(next_state === undefined) {
		console.log("the js syntax for the next states is wrong")
		return state_metrics
	}
	// last round was a pass
	if(state_metrics['passes']) {
		return state_metrics
	}
	let state =  graph['node_graph2'][next_state]
	if(!Object.keys(state).includes('function')) {
		console.log(state, "doesn't have a function")
		return state_metrics
	}
	// update to use a parent state
	// (current_state, graph, parent_state)
	let machine = {graph, parent_state}
	let success = state['function'](machine, next_state)
	if(!success) {
		return state_metrics
	}
	state_metrics['passes'] = true
	state_metrics['winning_state_name'] = next_state
	return state_metrics
}
exports.goDown1Level = (graph, machine_metrics, state_metrics) => {

	let current_state = state_metrics['winning_state_name']
	let current_state_object = graph['node_graph2'][current_state]
	// variable_name_value_table_from_parents
	/*
	{parent_name : [variable state names]}

	{variable_name: variable state reference}

	would have to assume each path has unique variable names we can refer to the user defined part
	of the variable name without accidentally picking the wrong variable
	in case user violates this, delete the variable so they can't access it at all

	do a linear search with the search function to find if they entered in a similar variable name
	
	*/
	// get references to all values from the current parent
	machine_metrics['parent'] = new ListNode(current_state_object.name, 0, machine_metrics['parent'])
	machine_metrics['indents'] += 1
	machine_metrics['next_states'] = graph['node_graph2'][current_state]['children']
	return machine_metrics
}
exports.moveUpParentAndDockIndents = (graph, machine_metrics) => {

	let parent = machine_metrics['parent']
	// console.log('traveling up parent', machine_metrics)
	while(parent !== null) {
		machine_metrics['indents'] -= 1

		// console.log({parent, state: graph['node_graph2'][parent.current_parent]})
		if(graph['node_graph2'][parent.current_parent]['next'].length > 0) {


			machine_metrics['next_states'] = graph['node_graph2'][parent.current_parent]['next']
			machine_metrics['parent'] = parent.grand_parent

			return machine_metrics
		}
		else {
			// we are at a parent end state
			let temp = parent
			parent = parent.grand_parent
			delete temp
		}
	}
	// guaranteed to have traversed up all end states at end of machine
	machine_metrics['parent'] = null
	machine_metrics['next_states'] = []
	return machine_metrics
}
exports.backtrack = (graph, machine_metrics) => {

	// go through the parent linked list and look for any remaining unrun children to resume the visitor function on
	console.log(`${exports.getIndents(machine_metrics['indents'])} failed states L > 2 ${machine_metrics['next_states']}`)

	let count = 0
	// the second to the nth round of the loop is case 2
	while(machine_metrics['parent'] !== null) {

		machine_metrics['parent'].ith_parent += 1

		let ith_parent = machine_metrics['parent'].ith_parent
		let current_parent = machine_metrics['parent'].current_parent

		let children = graph['node_graph2'][current_parent]['children']

		// secondary loop exit
		// case 1
		// we are done if there is at least 1 unrun child
		if(ith_parent < children.length) {

			machine_metrics['next_states'] = children.slice(ith_parent, children.length)

			return machine_metrics
		}
		else {
			// the first round of children will be failed children
			console.log(`${exports.getIndents(machine_metrics['indents'])} ${count === 0? 'failed': 'passed'} children ${children.join(', ')}`)

		}

		let temp = machine_metrics['parent']
		// case 2.1 can turn into case 2.2 if loop condition breaks
		machine_metrics['parent'] = machine_metrics['parent'].grand_parent
		delete temp
		machine_metrics['indents'] -= 1
		count += 1
	}

	// case 2.2
	if(machine_metrics['parent'] === null) {
		// the current state on the highest parent level failed so we cannot continue
		machine_metrics['next_states'] = []
	}
	return machine_metrics
}
exports.visitRedux = (graph, start_state, indents) => {
	// does depth first tranversal for each subgraph(each subgraph is a state name that has children)
	// does breath first traversal for within each subgraph

	/*
	3 planes
	plane 1) the parent linked list
	plane 2) a machine defined by the parent state and it's child states 
	plane 3) the layers of machines(plain 2) linked to by the parent states in the linked list
		the layers may changed based on what the parent is at the ith level(you can have a machine where more than
			1 child state is also a parent will eventually be in the parent linked list)
	*/
	// parent3 -> parent2 -> parent1 -> null
	// when we have a state that is a parent
		// add it to the head of the list
	// when machine is over
		// delete nodes from head till we find one with next states length > 0
	// assumes state_name actually runs

	var i = 0
	// start from the state state
	let machine_metrics = {
		next_states: [start_state],
		parent: null,
		variable_references_from_parent_path: {
			parent_variable_names: {},
			variable_name_value: {}
		},
		indents: indents
	}
    while(machine_metrics['next_states'].length > 0)
    {
    	//console.log(i)
        if(i == 210)
        {
			console.log('we are out of states')
			process.exit()
        }
		
		//console.log(getIndents(indents), 'next_states', next_states)
		let state_metrics = {
			passes: false,
			winning_state_name: ''
		}
		// machine will stop running if all have failed(there must be more than 0 states for this to be possible) or error state runs
		// loop ends after the first state passes
		machine_metrics['next_states'].forEach(next_state => {

			state_metrics = exports.visitNode(	graph,
												next_state,
												state_metrics//,
												// machine_metrics['parent']
												)
		})
		// console.log({machine_metrics, state_metrics, graph})
		// current state passes
		if(state_metrics['passes']) {
			// console.log({mm: machine_metrics})
			exports.printLevelsBounds(i, graph, state_metrics['winning_state_name'], machine_metrics['indents'])

			let current_state_name = state_metrics['winning_state_name']
			let current_state = graph['node_graph2'][current_state_name]

			// current state is a parent
			if(current_state['children']) {
				// console.log("here")
				machine_metrics = exports.goDown1Level(graph, machine_metrics, state_metrics)
				// console.log({mm: machine_metrics})

			}
			// current state is not a parent but has next states
			else if(current_state['next']) {
				machine_metrics['next_states'] = graph['node_graph2'][current_state_name]['next']
			}
			// curent state is not a parent and has no next states (end state)
			else {
				// console.log('done with machine')
				// console.log({machine_metrics})
				machine_metrics = exports.moveUpParentAndDockIndents(graph, machine_metrics)
			}
		}
		else {

			// console.log('submachine fails')
			// submachine fails
			// if this was recursive this case would return to the children check case above
			machine_metrics = exports.backtrack(graph, machine_metrics)
		}
        i += 1
    }
}
