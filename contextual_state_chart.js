
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
function ListNode (current_parent, grand_parent) {

	this.current_parent = current_parent
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

exports.isBottomAtTheParentOfCurrentState = (parents, bottom_state_name) => {

	// parents is a list of strings
	for(var p in parents)
	{
		let parent = parents[p]

		// let parent_case = parent_cases[p][1]
		//console.log(bottom_state, parent, bottom_case, parent_case)
		//console.log(bottom_state == parent, bottom_case == parent_case)
		//console.log(bottom_state === parent, bottom_case === parent_case)
		//console.log(typeof(bottom_state), typeof(parent), typeof(bottom_case), typeof(parent_case))

		if(bottom_state_name === parent)
		{
			return true
		}
	}
	return false
}
exports.getNextStates = (parent/*tracker*/, continuing_next_states, indents, graph) => {

	console.log({parent, continuing_next_states, indents})
	if(parent === null)
	{
		return [null, [], indents]
	}
	var state_name = parent.current_parent
	// var case1 = tracker.child[1]
	//console.log("tracker")
	//console.log(tracker)
	/*
	old idea
		move up and check

	doens't work as we need to check first

	while we are on a valid node
		if it has what we want
			return node and next states
		else
			move to the next node
	return null and next states as empty list

	*/
	// todo: need to delete the bottom of the list as we ascend it, not ignore it
	// continues untill there are no next states to obtain
	while (parent !== null)
	{
		indents -= 1 // is this the right place for it?
		if(graph['node_graph2'][state_name]['next'].length > 0)
		{
			return [parent, graph['node_graph2'][state_name]['next'], indents]
		}
		
		console.log({parent}, parent.current_parent)
		parent = parent.grand_parent
		state_name = parent.current_parent
		// case1 = tracker.child[1]
		//console.log(tracker)
		//console.log(state1, case1)			

		// need to exit the main loop
		// if (state_name === 'root 0')
		// {
		// 	//console.log("here")

		// 	continuing_next_states = []
		// 	return [tracker, continuing_next_states, indents]
		// }

		// continuing_next_states = graph['node_graph2'][state_name]['next']//Object.entries(graph['node_graph2'][state1]['next'][case1])
		//console.log(continuing_next_states)
		//console.log(tracker)

	}
	return [null, [], indents]

}
exports.makeNextStates = (next_states) => {
	var new_nex_states = []


	console.log('here', {next_states})
	for(var n in next_states)
	{
		if (typeof(next_states[n][1]) === 'object')
		{
			let next_state = next_states[n][0]
			for(var o in next_states[n][1])
			{
				new_nex_states.push([next_state, next_states[n][1][o]])

			}

		}
		else
		{
			new_nex_states.push([next_states[n][0], next_states[n][1]])
		}

	}

	return new_nex_states
}
exports.printLevel = (graph, state_name, indents, m, chosen_level) => {

	if (indents === chosen_level)
	{
		console.log(exports.getIndents(indents), '|'+ state_name + '|', 'passed', 'i', '|' + graph['input'][m] + '|', m)

	}

}

exports.printLevels = (graph, state_name, indents, m, chosen_level) => {

	if (indents >= chosen_level)
	{
		console.log(exports.getIndents(indents), '|'+ state_name + '|', 'passed', 'i', '|' + graph['input'][m] + '|', m)

	}

}

exports.printLevelsBounds = (graph, state_name, indents, m, input_length, chosen_start_level, chosen_end_level) => {

	if (indents >= chosen_start_level && indents <= chosen_end_level)
	{
		console.log(exports.getIndents(indents), '('+''+ state_name + '' + ')', 'passed', '|' + graph['input'][m] + '|'/*,'i ='*/, m/*, input_length*/)
		//console.log()

	}
	else if (indents >= chosen_start_level && chosen_end_level === -1)
	{
		console.log(exports.getIndents(indents), '('+ state_name + ',', 'f=' + graph['node_graph2'][state_name]['function'].name + ',', indents + ')')//, '|' + graph['input'][m] + '|'/*,'i ='*/, m/*, input_length*/)
		//console.log()

	}

}

exports.printVarStore = (graph) => {

	let m = graph['input']
	return '|' + graph['input'][m] + '|'

}
exports.visitRedux = (node, end_state/*, store*/, graph, indents, optional_parameter) => {
	// does depth first tranversal for each subgraph(each subgraph is a state name that has children)
	// does breath first traversal for within each subgraph
	let x = node[0]
	let y = node[1]
    var next_states = [node]
    var action = {}
	var bottom = []
	// parent3 -> parent2 -> parent1 -> null
	// when we have a state that is a parent
		// add it to the head of the list
	// when machine is over
		// delete nodes from head till we find one with next states length > 0
	// assumes state_name actually runs
	let parent = null//new ChildParent('root 0', null)
	// bottom.push(parent)
	var ii = 0
	// to target a start point and end point
	// start from the state state
	// assume the end state is actually and end state
	//console.log(getIndents(indents), 'start state', node)
    while(next_states.length != 0)
    {

		
    	//console.log(ii)
		//printStack(bottom)
        if(ii == 150)
        {
			console.log('we are out of states')
			process.exit()
        }

		//console.log(getIndents(indents), 'next_states', next_states)

		// var state = ''
		// var case_ = 0
		var state_changed = false

		let passes = false
        let winningStateName = ''

		// machine will stop running if all have failed(there must be more than 0 states for this to be possible) or error state runs
		// loop ends after the first state passes
		next_states.forEach(next_state => {

			if(next_state === undefined) {
                console.log("the js syntax for the next states is wrong")
                return null

            }

			if(passes) {
                return null
			}
			let state =  graph['node_graph2'][state_name]
			if(!Object.keys(state).includes('function')) {
				console.log(state, "doesn't have a function")
                return null
			}

			let success = state['function'](state_name, graph, state_name)
			if(!success) {
				return null
			}
			passes = true
			winningStateName = next_state
		})
		// current state is an end state
		if(next_states.length === 0) {
			// we are at an end state
			// traverse up the parent list to get to the next level
		}
        // current state is not an end state

		else if (passes) {
			// if the state is a parent
				// add to parent list
				// setup next states with children
			// else
				// setup next states with state's next states
		}
        for(var j = 0, len = next_states.length ; j < len; j++)
        {
			state_name = next_states[j]
			// case_ = next_states[j][1]

			/*
			if(state === 'root' && case_ === '0')
			{

			}
			*/
            //action = {type: state, case_: case_}
            //store.dispatch(action)
            //console.log('state, case')
            //console.log(state, case_)
            // should be children, then check if they have a parent?
			// will only work for nodes that have children
			console.log( state_name )

			// let children = graph['node_graph2'][ state_name ]['children']
			// let recursive_option = graph['recursive_option']

			// seems to work on functions of the form f(x)
			// https://stackoverflow.com/questions/11107823/what-happens-if-i-dont-pass-a-parameter-in-a-javascript-function
			let did_function_pass = graph['node_graph2'][state_name]['function'](state_name, graph, state_name)

			/*
			if !state passed
				exit
			
			if the top of stack has an empty item
				state is a child and put it in the item

			if state is parent
				push empty item to stack
				(the next state is a child then so it's added to the empty item next round)
			*/
			if (did_function_pass)
			{
				// if state is parent
					// add it as head
					// next states =  children states
				// else
					// next states = state's next states
				
				// special early exit state
				if (state_name == 'error')
	            {
	            	console.log('you have invalid input')
	            	process.exit()
				}
				
				// can we assume the state is a parent if it has children?
				// that idea worked for redux
				// needs to always check before the isParent
				// is this node a child of the last state run?
				// if (exports.hasParent(graph, state, case_))
				// {
				// 	// push the state to the bottom if bottom happens to be one of state's parents
				// 	// only checks the state and not the case
				// 	let bottom_state = bottom[0].child[0]
				// 	let bottom_case = bottom[0].child[1]
				// 	// change
				// 	let parent_cases = Object.entries(graph['node_graph2'][state]['parents'][case_])//Object.entries(graph['parents'][state][case_])
				// 	//console.log(parent_cases)
				// 	parent_cases = exports.makeNextStates(parent_cases)
				// 	if (exports.isBottomAtTheParentOfCurrentState(parent_cases, bottom_state, bottom_case))
				// 	{
				// 		let new_parent = new ChildParent([state, case_], bottom[0])
				// 		// link passing state to its parent on bottom of stack, extending the stack by 1, vertically
				// 		bottom[0] = new_parent
				// 		indents += 1
				// 	}


				// }
				// console.log({children})

				// children = graph['node_graph2'][ state ]['children'][ case_ ]
				// for when passing the current state(it is in the current next states) has a child(called next states)
				if(Object.keys(graph['node_graph2'][ state_name ]).includes('children'))
				{

					if (graph['node_graph2'][ state_name ]['children'].length > 0)
					{
						// console.log({children})
						// add passing state horizontally
						// what does parent.child mean?
						// parent.child = state_name
						// bottom[0].child = state_name
	
						// let bottom_state_name = bottom[0].child
						// let bottom_case = bottom[0].child[1]
						// change
						let parents = graph['node_graph2'][state_name]['parents']//Object.entries(graph['parents'][state][case_])
						// console.log(parent_cases)
						console.log('parents')
						// parent_cases = exports.makeNextStates(parent_cases)
						let new_head = null
						if(parent === null) {
							new_head = new ListNode(state_name, null)
						}
						else if(parents.includes(parent.current_parent)) {
							new_head = new ListNode(state_name, parent.current_parent)
						}
						parent = new_head
						indents += 1

						// if (exports.isBottomAtTheParentOfCurrentState(parents, bottom_state_name))
						// {
						// 	console.log('here')
						// 	debugger
						// 	let new_parent = new ListNode(state_name, bottom[0])
						// 	console.log({new_parent})
						// 	// fail
						// 	// link passing state to its parent on bottom of stack, extending the stack by 1, vertically
						// 	bottom[0] = new_parent
						// 	indents += 1
						// }
	
	
	
	
	
	
	
	
	
	
	
						// getting the children
						// let children = Object.entries(graph['node_graph2'][state]['children'][case_])
						console.log('children')
						next_states = graph['node_graph2'][ state_name ]['children']//exports.makeNextStates(children)
						// next_states = []
						// for(var i in children)
						// {
						// 	next_states.push(children[i])
						// }
	
						let m = graph['i']
						exports.printLevelsBounds(graph, state_name, indents, m, graph['input'].length, 0, -1)
	
	
	
					}
				}
				
				// for when passing the current state(it is in the current next states) does not have a child but has neighbor states(called next states)
				else
				{
					if(Object.keys(graph['node_graph2'][state_name]).includes('next'))
					{
						next_states = graph['node_graph2'][state_name]['next']

					}
					else
					{
						next_states = []
					}
					let m = graph['i']
					// next_states = exports.makeNextStates(next_states)

					exports.printLevelsBounds(graph, state_name, indents, m, graph['input'].length, 0, -1)
					// add passing state horizontally
					// bottom[0].child = state_name

				}

				state_changed = true

				break
			}

			console.log({parent})
			console.log({result: graph['expression']})

			console.log()

		}
		console.log(next_states)
		// we want to leave the machine here
		if(state_name === end_state)
		{
			// console.log("done")
			break
		}
		//printStack(bottom)
		if (next_states.length === 0)
		{
			// move up list, deleting parents untill we hit null or an array of next states > 0

			// console.log("here")
			// have linked list representing the stack
			// first item is in bottom[0]

			// travel up stack untill either hits root or hits neighbors of a prev visited level
			let tracker_continuing_next_states_indents = exports.getNextStates(parent, next_states, indents, graph)

			parent = tracker_continuing_next_states_indents[0]
			next_states = tracker_continuing_next_states_indents[1]
			indents = tracker_continuing_next_states_indents[2]


			// bottom[0] = tracker
			// next_states = continuing_next_states

			state_changed = true
			// might not actually be true ever
			/*
			if (tracker == null)
			{
				console.log('done runing machine')
			}*/
			//console.log(next_states)
			//printStack(bottom)

		}

        // if all fail then all will be rerun unless this condition is here
        if(!state_changed && next_states.length > 0)
        {


            console.log(next_states, 'have failed so your state machine is incomplete')
            fail
        }
        ii += 1
    }

    //console.log(getIndents(indents), '1state machine is finished', '|'+ state + '|', case_)
	//console.log(getIndents(indents), 'exit visit', node)
	//console.log(graph)

}
