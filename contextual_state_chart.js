
/*
exports.universalReducer = (state, action, var_store) => {
	Object.assign(state, {action_succeded: false});

    if(action.type.includes('@@redux/INIT'))
    {
        console.log('state', action.type, 'case', action.case_, 'start',  action.type)
		return state
    }




    switch(action.type)
    {


		default:
		{

			Object.assign(state, {action_succeded: true});
		}

	}

	//console.log(state)
	if(!action.type.includes('@@redux/INIT'))
	{
		//console.log('in reducer', action.type, action.case_, state)
		// graph['dicts']['functions'][state][case_](graph['store'],
		//																	[state, case_])
		//console.log(var_store['node_graph2'])
		Object.assign(	state,
						{action_succeded: var_store['node_graph2'][action.type]['functions'][action.case_](state, var_store, [action.type, action.case_])
					});
		return state
		//console.log('not here')
		//console.log('action', state.action_succeded)

	}
}*/

exports.doesNextStatesExist = (next_states) => {

	return next_states.length > 0 && next_states[0].length > 0
}

exports.isParent = (children) => {

	// a parent isn't a child
	console.log(children)
	console.log(Object.keys(children).length, children.constructor === Object)
	return   !((Object.keys(children).length === 0 && children.constructor === Object))

}

exports.hasParent = (graph, state_name) => {
	//console.log(Object.keys(graph['node_graph2'][state]['parents'][case_]))
	return graph['node_graph2'][state_name]['parents'].length > 0//Object.keys(graph['parents'][state][case_]).length > 0
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

/*exports.*/ var printStack = (bottom) => {

	var tracker = bottom[0]
	var stack = []
	while (tracker !== null)
	{
		stack.unshift(tracker.child)
		tracker = tracker.parent
	}
	for(var i in stack)
	{
		console.log(stack[i])
	}
}



// the state printing algorithm
exports.printLevelsBounds = (ith_state, graph, state_name, indents) => {
	let our_string = graph['input']
	if(typeof our_string === 'object') {
		// console.log('object')
		// console.log(our_string)
		our_string = our_string.join(' ')
		// console.log(our_string)

	}
	// else {
	// 	console.log(our_string)

	// }
	// console.log(`${graph['input']}`)
	// let our_string = `${graph['input']}`
	// console.log(our_string.slice(','))
	console.log(`Round #: ${ith_state} ${exports.getIndents(indents)} | state name = '${state_name}' | level = ${indents} | function = ${graph['node_graph2'][state_name]['function'].name} | a = ${graph['operation_vars']['a']} | expression = ${our_string}\n`)
}

exports.printVarStore = (graph) => {

	let m = graph['input']
	return '|' + graph['input'][m] + '|'

}

exports.visitNode = (graph, next_state, state_metrics) => {
	
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
	let success = state['function'](next_state, graph, next_state)
	if(!success) {
		return state_metrics
	}
	state_metrics['passes'] = true
	state_metrics['winning_state_name'] = next_state
	return state_metrics
}
exports.moveUpParentAndDockIndents = (graph, machine_metrics) => {
	// doesn't work
	// only moves it up when there are no next states
	// what about the current parent being done by definition?

	// how do we know when the parent is supposed to move on or not?
	let parent = machine_metrics['parent']
	// console.log('traveling up parent', machine_metrics)
	while(parent !== null) {
		machine_metrics['indents'] -= 1
		// problem here
		// console.log({parent, state: graph['node_graph2'][parent.current_parent]})
		if(graph['node_graph2'][parent.current_parent]['next'].length > 0) {


			machine_metrics['next_states'] = graph['node_graph2'][parent.current_parent]['next']
			machine_metrics['parent'] = parent.grand_parent

			return machine_metrics
		}
		else {
			// we are at a parent end state

			parent = parent.grand_parent
		}
	}
	// guaranteed to have traversed up all end states at end of machine
	machine_metrics['parent'] = null
	machine_metrics['next_states'] = []
	return machine_metrics
}
/*
		'1',  '+', '2',  '+',  '3',
		'+',  '4', '-',  '5',  '+',
		'6',  '*', '7',  '-',  '8',
		'-',  '9', '+',  '10', '*',
		'11', '+', '12'

		['1',  '+', '2',  '+',  '3',
		'+',  '4', '-',  '5',  '+',
		'6'], '*', ['7',  '-',  '8',
		'-',  '9', '+',  '10'], '*', ['11', '+', '12']


		[['1',  '+', '2',  '+',  '3',
		'+',  '4'], '-',  ['5',  '+',
		'6']], '*', ['7',  '-',  '8',
		'-',  ['9', '+',  '10']], '*', ['11', '+', '12']
		*/
exports.visitRedux = (node, end_state/*, store*/, graph, indents, optional_parameter) => {
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
	let x = node[0]
	let y = node[1]
    // var next_states = [node]
    var action = {}
	var bottom = []
	// parent3 -> parent2 -> parent1 -> null
	// when we have a state that is a parent
		// add it to the head of the list
	// when machine is over
		// delete nodes from head till we find one with next states length > 0
	// assumes state_name actually runs
	// let parent = null//new ChildParent('root 0', null)
	// bottom.push(parent)
	var i = 0
	// to target a start point and end point
	// start from the state state
	// assume the end state is actually and end state
	//console.log(getIndents(indents), 'start state', node)
	// make a single js object holding all the variables and pass it into the functions
	let machine_metrics = {
		next_states: [node],
		parent: null,
		indents: indents
	}
    while(machine_metrics['next_states'].length > 0)
    {
    	//console.log(ii)
		//printStack(bottom)
		// 94th state run is last one correct
		// a 0, op_ignore 0
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
			// console.log(next_state)
			state_metrics = exports.visitNode(graph, next_state, state_metrics)
		})
		// console.log({machine_metrics, state_metrics, graph})

		// never left the split submachine
		// current state passes
		if(state_metrics['passes']) {
			exports.printLevelsBounds(i, graph, state_metrics['winning_state_name'], machine_metrics['indents'])

			let current_state = state_metrics['winning_state_name']
			let current_state_object = graph['node_graph2'][current_state]
			const state_keys = Object.keys(current_state_object)
			// current state is a parent
			if(state_keys.includes('children')) {
				// add current state as head
				// the state passed and it has chldren
				// make a brand new parent from nowhere and set metrics to it
				// test with machine failure
				machine_metrics['parent'] = new ListNode(current_state_object.name, 0, machine_metrics['parent'])
				// console.log('new parent', machine_metrics['parent'])
				machine_metrics['indents'] += 1
				machine_metrics['next_states'] = graph['node_graph2'][current_state]['children']
			}
			// current state is not a parent but has next states
			else if(state_keys.includes('next')) {
				// console.log('here')
				machine_metrics['next_states'] = graph['node_graph2'][current_state]['next']
				// console.log(machine_metrics)
			}
			// curent state is not a parent and has no next states (end state)
			else {
				// console.log('done with machine')
				// console.log({machine_metrics})
				machine_metrics = exports.moveUpParentAndDockIndents(graph, machine_metrics)
			}
		}
		else {

			console.log('submachine fails')
			// submachine fails
			// if this was recursive this case would return to the children check case above
			
			console.log({machine_metrics})

			// the second to the nth round of the loop is case 2
			while(machine_metrics['parent'] !== null) {

				machine_metrics['parent'].ith_parent += 1

				let ith_parent = machine_metrics['parent'].ith_parent
				let current_parent = machine_metrics['parent'].current_parent
				// console.log({machine_metrics, current_parent})

				let children = graph['node_graph2'][current_parent]['children']
				// secondary loop exit
				// case 1
				// we are done if there is at least 1 unrun child
				if(ith_parent < children.length) {
	
					machine_metrics['next_states'] = children.slice(ith_parent, children.length)
					break
					// return machine_metrics
				}
				else {
					console.log(`${exports.getIndents(machine_metrics['indents'])} failed states L > 2 ${machine_metrics['next_states']}`)

				}
				// console.log(machine_metrics['parent'])
				// console.log('here')
				// case 2.1 can turn into case 2.2 if loop condition breaks
				machine_metrics['parent'] = machine_metrics['parent'].grand_parent
				machine_metrics['indents'] -= 1
			}

			// case 2.2
			if(machine_metrics['parent'] === null) {
				// the current state on the highest parent level failed so we cannot continue
				machine_metrics['next_states'] = []
			}
			
			
			// return machine_metrics

		}
        i += 1
    }

    //console.log(getIndents(indents), '1state machine is finished', '|'+ state + '|', case_)
	//console.log(getIndents(indents), 'exit visit', node)
	//console.log(graph)

}
