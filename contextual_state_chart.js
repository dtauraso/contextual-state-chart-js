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
	let j = graph['nodeGraph2']['j'].value
	console.log(`Round #: ${ithState} ${exports.getIndents(indents)} | state name = '${stateName}' | level = ${indents} | function = ${graph['nodeGraph2'][stateName]['function'].name} | operator = \'${graph['nodeGraph2']['operators'].value[j]}\' | a = ${graph['nodeGraph2']['a'].value} | expression = ${ourString}\n`)
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
		// {[nextStateName]: {'active parents': [], actualParents: {}}}
		// active parents intersect 'actualParents' =  active parents to receive credit for running the next state
		// only thing the timelines array will have in common with the doubly nested next state names is index value
		// deep engineering problem for the starbucks state chart test program
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
			console.log(`${exports.getIndents(machineMetrics['indents'])} ${count === 0? 'failed': 'passed'} children ${children}`)

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
        if(i == 170)
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
/*


bottom = {parent names: bottom object}

timelines for next states
assumes each state has a parents: {parentNames} attributes
parent : {
	"next state name": {
		threshold: 2,
		count: 3
		parentIsAlsoParentInStateChart: false,
		timelineWeAreIntrudingOn: correctTimelineParentName
	}
}

edges
{edgeName: "next state name",
isFromCorrecttimeline: 0}

is the parent a parent of the state in the state chart?
stateChart["next state name"]["parents"][parent] === undefined


how to we find out what timeline and what state to rerun
in the editor provide the timeline tree for all visible timelines
	if the user wants to connect to a state in a different timeline they have to click on the state
	nearest answestor algorithm is now only considering the number of visible timelines
O(# of timelines the user is paying attention to)

edge (stateName, if the timeline of that state is different from this one then timelineName)
edges: [edge]


parentTree = {
	'bottom': {
		parent12: {'edges': [a, state1, c]]
		parent2: {	'different timeline': {state1: parent12},
					'edges': [state1, state2],
					'winning states': [state1, state2],
					'indents': 0},
	}
	'graph': {
		parent3: {nextParent: null, prevParentCount: 2, ithChild: 3},
		parent2: {nextParent: parent3, prevParentCount: 1, ithChild: 1},
		parent12: {nextParent: parent3, prevParentCount: 1, ithChild: 1}
	}

}
How do we know we need to restart the machine vs stopping the machine after we run the end state?
	Have a queue of each unit of data the machine uses. Once the machine has finished processing the data at each level it quits
The timeline is the one currently in use from the current state
	the current state can have several timeilines connecting to it but each one will run separately
what if the timeline attribute is true for each node in the path?
is the data from the 'bottom' just being lifted from the graph? if so then the data there is temporary


No threshold becuase the same incomming edge can get run over and over again without all the incomming edges getting run
at least 1 time.
each state that can only run after the incomming edges get run once
	store the incoming state names so we can check if all incoming edges have been run 1 time


If state y has not succeeded in moving to the next state because it was unable to run any of it's next states it is a spin state
After it moves to the next state it's no longer a spin state. What if it's next states are empty? Does the timeline get removed?

t1 runs and can't run state y as prev state = '' and state y needs state x to run first
t2 runs an succeeds
	t2 is linked to t1 at state y, so t2 sends t1 it's state x to t1's prev state only if state y is not a spin state
t1 uses prev state = state x to activate it's state y

diference between same state repeating trial runs and rerunning it after some other states?
We can't assume any syncronized time the prevs come in from any other timeline to the timeline of consideration.
They can come in at any time and some may come in at the same time.

The keys for unlocking the states must come from different timelines(they define the idea of syncronizing multiple asyncronious processes at certain points in time)


while (we have not hit the chosen end state) or (the input queue with the top state is not empty)
	for each timeline
		set parallel processing flag
		for each next state
			if we have already successfully run a state
				if we are not doing parallel processing
					break
				else
					unlock state if possible
					run unlocked state if possible
					any still locked state or state that can be unlocked and run successfully gets to be in the next round
			else
				unlock state if possible
				run unlocked state if possible
				any still locked state or state that can be unlocked and run successfully gets to be in the next round


		for each winner
			if the winner is in range [2, n]
				the winner is a sibling timeline
			else
				the winne is a continuation of the current timeline at the current machine level or
				a new branch in the current timeline that goes 1 level below the current machine level
state = {
	name:
	functionName:
	inputQueue:
	nextStates:
	children:
	isVariable:
	value:
	isParallel:
	locks: { 	'parent a': {'state a': 0, 'locks active': []}, 
				'parent b': {'state b': 0, 'locks active': []}, 'timelines unlocked': []}
}
locks:
	deterministic:
		a state can have n locks from only 1 timeline but only 1 lock opens the state
	nondeterminstic:
		a state can have n locks from n timelines and at least 1 lock per timeline for all timelines must be opened to run the state
*/