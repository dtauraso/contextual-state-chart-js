// variables are implemented differently here. variables are keys
exports.getVariable = (graph, parentStateName, variableName) => {

    // The parent state should only be linked to one variable name at a time
    // in the below example:
    // You can say 'quantity 2' then call it 'quantity' when using it in the reducers
    // as long as the same parent doesn't also have a variable name called 'quantity 3'.
    // This is to allow the user to use variable names with this contextual state chart
    // at a simular level of detail they would use in a programming lnagugae

    let cell = graph['nodeGraph2'][parentStateName]//getCell(graph, parentStateName)

    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('variableNames')) {
        return null
    }
    let variable = null

	// console.log(cell.variableNames[variableName], cell.variableNames[variableName] !== undefined)
	if(cell.variableNames[variableName] !== undefined) {
		variable = graph['nodeGraph2'][variableName]
	}
    // let variableNameIsInCellVariableNamesCount = 0
    // let found = false
	// console.log(cell)
    // cell.variableNames.forEach(cellVariableName => {

	// 	console.log(cellVariableName, cellVariableName.search(variableName))
	// 	// this doesn't work if 1 vaiable name is a substring of the one we are loking for
    //     if(cellVariableName.search(variableName) === -1) {
    //         return null
    //     }

    //     variableNameIsInCellVariableNamesCount += 1
	// 	found = true
	// 	// console.log(cellVariableName, Object.keys(graph['nodeGraph2']))
	// 	variable = graph['nodeGraph2'][cellVariableName]
	// 	// console.log({variable})
    // })

    // if(variableNameIsInCellVariableNamesCount > 1) {
    //     console.log(`You cannot have more than 1 variable name that contains |${variableName}|`)
    //     return null
    // }
    // if(!found) {
    //     console.log(`A variable similarly called ${variableName} may exist but there is no link from |${parentStateName}| to |${variableName}|`)
    //     return null

    // }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
	// console.log({variable})

    return variable
}

exports.setVariable = (graph, parentStateName, variableName, newValue) => {

	// console.log({parentStateName, variableName, newValue})
    // parentStateName is an array of strings
    let variable = exports.getVariable(graph, parentStateName, variableName)
	// console.log({variable, newValue})
	graph['nodeGraph2'][variable.name]['value'] = newValue
}

function ListNode (currentParent, ithParent, grandParent) {

	this.currentParent = currentParent
	this.ithParent = ithParent
	this.grandParent = grandParent
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




exports.printLevelsBounds = (ithState, graph, stateName, indents) => {
	let ourString = graph['nodeGraph2']['expression'].value
	if(typeof ourString === 'object') {
		// console.log(ourString)

		ourString = ourString.join(' ')

	}
	console.log(`Round #: ${ithState} ${exports.getIndents(indents)} | state name = '${stateName}' | level = ${indents} | function = ${graph['nodeGraph2'][stateName]['function'].name} | a = ${graph['nodeGraph2']['a'].value} | expression = ${ourString}\n`)
}

exports.printVarStore = (graph) => {

	let m = graph['input']
	return '|' + graph['input'][m] + '|'

}

exports.visitNode = (graph, nextState, stateMetrics, parentStateHead) => {
	
	if(nextState === undefined) {
		console.log("the js syntax for the next states is wrong")
		return stateMetrics
	}
	// last round was a pass
	if(stateMetrics['passes']) { // and the state run isn't a parallel state
		return stateMetrics
	}
	let state =  graph['nodeGraph2'][nextState]
	if(!Object.keys(state).includes('function')) {
		console.log(state, "doesn't have a function")
		return stateMetrics
	}
	parentState = ''
	if(parentStateHead !== null) {
		parentState = parentStateHead.currentParent
	}
	else {
		parentState = null
	}
	// update to use a parent state
	// (current_state, graph, parent_state)
	let success = state['function'](graph, parentState, nextState)
	if(!success) {
		return stateMetrics
	}
	stateMetrics['passes'] = true
	stateMetrics['winningStateName'] = nextState
	return stateMetrics
}
exports.goDown1Level = (graph, machineMetrics, stateMetrics) => {

	let currentState = stateMetrics['winningStateName']
	let currentStateObject = graph['nodeGraph2'][currentState]
	// for nfa, we can't attach any state to a parent if that state doesn't link to the parent
	// avoid crossing the timelines and delete timeline if it tries to cross
	// if a next state is in a different timeline, we run it and delete the timeiine we are on
	// the state is "touched" but not linked up after being run
	// this way 1 timeline can influence a state from another timeline
	// state run threshold
	// chip away at the threshold without running the state
	// what hapens if the wrong timeline decreases the threshold to 0 instead of the correct timeline?
		// the state still needs to be run now and the proper timelines next states...
		// is the timeline aware of the states it's supposed to run?
		// 2 different timelines need to acces the same state but the state can only be run 1 time and only after it's been visited by both timelines
		// credit for successfulling running the state must be attributed to the timeline the state comes from
	machineMetrics['parent'] = new ListNode(currentStateObject.name, 0, machineMetrics['parent'])
	machineMetrics['indents'] += 1
	machineMetrics['nextStates'] = graph['nodeGraph2'][currentState]['children']
	return machineMetrics
}
exports.moveUpParentAndDockIndents = (graph, machineMetrics) => {

	let parent = machineMetrics['parent']
	// console.log('traveling up parent', machine_metrics)
	while(parent !== null) {
		machineMetrics['indents'] -= 1

		// console.log({parent})//, state: graph['node_graph2'][parent.current_parent]})
		if(graph['nodeGraph2'][parent.currentParent]['next'] !== undefined) {
			if(graph['nodeGraph2'][parent.currentParent]['next'].length > 0) {


				machineMetrics['nextStates'] = graph['nodeGraph2'][parent.currentParent]['next']
				machineMetrics['parent'] = parent.grandParent
	
				return machineMetrics
			}
		}
		
		else {
			// we are at a parent end state
			let temp = parent
			parent = parent.grandParent
			delete temp
		}
	}
	// guaranteed to have traversed up all end states at end of machine
	machineMetrics['parent'] = null
	machineMetrics['nextStates'] = []
	return machineMetrics
}
exports.backtrack = (graph, machineMetrics) => {

	// go through the parent linked list and look for any remaining unrun children to resume the visitor function on
	console.log(`${exports.getIndents(machineMetrics['indents'])} failed states L > 2 ${machineMetrics['nextStates']}`)

	let count = 0
	// the second to the nth round of the loop is case 2
	while(machineMetrics['parent'] !== null) {

		machineMetrics['parent'].ithParent += 1

		let ithParent = machineMetrics['parent'].ithParent
		let currentParent = machineMetrics['parent'].currentParent

		let children = graph['nodeGraph2'][currentParent]['children']

		// secondary loop exit
		// case 1
		// we are done if there is at least 1 unrun child
		if(ithParent < children.length) {

			machineMetrics['nextStates'] = children.slice(ithParent, children.length)

			return machineMetrics
		}
		else {
			// the first round of children will be failed children
			console.log(`${exports.getIndents(machineMetrics['indents'])} ${count === 0? 'failed': 'passed'} children ${children.join(', ')}`)

		}

		let temp = machineMetrics['parent']
		// case 2.1 can turn into case 2.2 if loop condition breaks
		machineMetrics['parent'] = machineMetrics['parent'].grandParent
		delete temp
		machineMetrics['indents'] -= 1
		count += 1
	}

	// case 2.2
	if(machineMetrics['parent'] === null) {
		// the current state on the highest parent level failed so we cannot continue
		machineMetrics['nextStates'] = []
	}
	return machineMetrics
}
exports.visitRedux = (graph, startState, indents) => {
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
	let machineMetrics = {
		nextStates: [startState],
		parent: null,
		indents: indents
	}
    while(machineMetrics['nextStates'].length > 0)
    {
    	//console.log(i)
        if(i == 110)
        {
			console.log('we are out of states')
			process.exit()
        }
		
		//console.log(getIndents(indents), 'next_states', next_states)
		let stateMetrics = {
			passes: false,
			winningStateName: ''
		}
		// if graph['nodeGraph2'][ machineMetrics['parent'] or the child ]['childrenAreParallel']
			// stateMetrics = {passes: [], winningStateName: []}

		// machine will stop running if all have failed(there must be more than 0 states for this to be possible) or error state runs
		// loop ends after the first state passes
		machineMetrics['nextStates'].forEach(nextState => {

			stateMetrics = exports.visitNode(	graph,
												nextState,
												stateMetrics,
												machineMetrics['parent'])
		})
		// Object.keys(user).forEach(userAttribute => {
		// 	console.log(userAttribute)
		// 	console.log(user[userAttribute])
		// })
		// console.log({machine_metrics, state_metrics, graph})
		// run 1 time for the dfa
		// run n times for the nfa(make a new branch when i > 0)
		// current state passes
		if(stateMetrics['passes']) {
			// console.log({mm: machineMetrics})
			exports.printLevelsBounds(i, graph, stateMetrics['winningStateName'], machineMetrics['indents'])

			let currentStateName = stateMetrics['winningStateName']
			let currentState = graph['nodeGraph2'][currentStateName]
			// console.log()
			// current state is a parent
			if(currentState['children']) {
				// console.log("here")
				machineMetrics = exports.goDown1Level(graph, machineMetrics, stateMetrics)
				// console.log({mm: machine_metrics})

			}
			// current state is not a parent but has next states
			else if(currentState['next']) {
				machineMetrics['nextStates'] = graph['nodeGraph2'][currentStateName]['next']
			}
			// curent state is not a parent and has no next states (end state)
			else {
				// console.log('done with machine')
				// console.log({machine_metrics})
				machineMetrics = exports.moveUpParentAndDockIndents(graph, machineMetrics)
			}
		}
		else {

			// console.log('submachine fails')
			// submachine fails
			// if this was recursive this case would return to the children check case above
			machineMetrics = exports.backtrack(graph, machineMetrics)
		}
        i += 1
    }
}