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
}

exports.doesNextStatesExist = (next_states) => {

	return next_states.length > 0 && next_states[0].length > 0
}

exports.isParent = (children) => {


	return   !((Object.keys(children).length === 0 && children.constructor === Object))

}

exports.hasParent = (graph, state, case_) => {

	return Object.keys(graph['parents'][state][case_]).length > 0
}
export function ChildParent (child, parent) {

	this.child = child
	this.parent = parent
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

exports.printStack = (bottom) => {

	var tracker = bottom[0]
	var stack = []
	while (tracker != null)
	{
		stack.unshift(tracker.child)
		tracker = tracker.parent
	}
	for(var i in stack)
	{
		console.log(stack[i])
	}
}

exports.isBottomAtTheParentOfCurrentState = (parent_cases, bottom_state, bottom_case) => {

	for(var p in parent_cases)
	{
		let parent = parent_cases[p][0]

		let parent_case = parent_cases[p][1]

		if(bottom_state == parent && bottom_case == parent_case)
		{
			return true
		}
	}
	return false
}
exports.getNextStates = (tracker, continuing_next_states, indents, graph) => {

	var state1 = tracker.child[0]
	var case1 = tracker.child[1]

	// todo: need to delete the bottom of the list as we ascend it, not ignore it
	while (tracker != null && continuing_next_states.length == 0)
	{
		indents -= 1
		tracker = tracker.parent
		state1 = tracker.child[0]
		case1 = tracker.child[1]
		// need to exit the main loop
		if (state1 == 'root')
		{
			continuing_next_states = []
			return [tracker, continuing_next_states, indents]
		}
			
		continuing_next_states = Object.entries(graph['node_graph2'][state1]['next'][case1])

	}
	return [tracker, continuing_next_states, indents]

}
exports.makeNextStates = (next_states) => {
	var new_nex_states = []



	for(var n in next_states)
	{
		if (typeof(next_states[n][1]) == 'object')
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
exports.printLevel = (graph, state, case_, indents, m, chosen_level) => {

	if (indents == chosen_level)
	{
		console.log(exports.getIndents(indents), '|'+ state + '|', case_, 'passed', 'i', '|' + graph['input'][m] + '|', m)

	}

}

exports.printLevels = (graph, state, case_, indents, m, chosen_level) => {

	if (indents >= chosen_level)
	{
		console.log(exports.getIndents(indents), '|'+ state + '|', case_, 'passed', 'i', '|' + graph['input'][m] + '|', m)

	}

}

exports.printLevelsBounds = (graph, state, case_, indents, m, input_length, chosen_start_level, chosen_end_level) => {

	if (indents >= chosen_start_level && indents <= chosen_end_level)
	{
		console.log(exports.getIndents(indents), '('+''+ state + ''+ ',' , '' + case_ + ''+ ')', 'passed', '|' + graph['input'][m] + '|'/*,'i ='*/, m/*, input_length*/)
		//console.log()

	}
	else if (indents >= chosen_start_level && chosen_end_level == -1)
	{
		console.log(exports.getIndents(indents), '('+ state + ',' , case_ + ',', 'f=' + graph['node_graph2'][state]['functions'][case_].name + ',', indents + ')')//, '|' + graph['input'][m] + '|'/*,'i ='*/, m/*, input_length*/)
		//console.log()

	}

}

exports.printVarStore = (graph) => {

	let m = graph['input']
	return '|' + graph['input'][m] + '|'

}
exports.visitRedux = (node, store, graph, indents) => {
	// does depth first tranversal for each subgraph(each subgraph is a state name that has children)
	// does breath first traversal for within each subgraph
	let x = node[0]
	let y = node[1]
    var next_states = [node]
    var action = {}
	var bottom = []
	// assumes [state, case_] actually runs
	let parent = new ChildParent(['root', 0], null)
	bottom.push(parent)
	var ii = 0
	//console.log(getIndents(indents), 'start state', node)
    while(next_states.length != 0)
    {
    	//console.log(ii)

        if(ii == 200)
        {
            fail
        }
        
		//console.log(getIndents(indents), 'next_states', next_states)
        
		var state = ''
		var case_ = 0
		var state_changed = false

		// machine will stop running if all have failed(there must be more than 0 states for this to be possible) or error state runs
		// loop ends after the first state passes
        for(var j = 0, len = next_states.length ; j < len; j++)
        {
			state = next_states[j][0]
			case_ = next_states[j][1]
            action = {type: state, case_: case_}
            store.dispatch(action)
            
			let maybe_parent = graph['node_graph2'][ state ]['children'][ case_ ]
			let recursive_option = graph['recursive_option']
			// seems to work on functions of the form f(x)
			// https://stackoverflow.com/questions/11107823/what-happens-if-i-dont-pass-a-parameter-in-a-javascript-function
			let did_function_pass = store.getState().action_succeded
			if (did_function_pass)
			{
				if (state == 'error')
	            {
	            	console.log('you have invalid input')
	            	process.exit()
	            }
				// needs to always check before the isParent
				if (exports.hasParent(graph, state, case_))
				{
					// push the state to the bottom if bottom happens to be one of state's parents
					// only checks the state and not the case
					let bottom_state = bottom[0].child[0]
					let bottom_case = bottom[0].child[1]

					let parent_cases = Object.entries(graph['parents'][state][case_])
					parent_cases = exports.makeNextStates(parent_cases)
					if (exports.isBottomAtTheParentOfCurrentState(parent_cases, bottom_state, bottom_case))
					{
						let new_parent = new exports.ChildParent([state, case_], bottom[0])
						// link passing state to its parent on bottom of stack, extending the stack by 1, vertically
						bottom[0] = new_parent
						indents += 1
					}
					
					
				}
				
				// for when passing the current state(it is in the current next states) has a child(called next states)
				if (exports.isParent(maybe_parent))
				{
					// add passing state horizontally
					bottom[0].child = [state, case_]

					// getting the children
					let children = Object.entries(graph['node_graph2'][state]['children'][case_])
					children = exports.makeNextStates(children)
					next_states = []
					for(var i in children)
					{
						next_states.push(children[i])
					}

					let m = graph['i']
					exports.printLevelsBounds(graph, state, case_, indents, m, graph['input'].length, 0, -1)
					


				}
				// for when passing the current state(it is in the current next states) does not have a child but has neighbor states(called next states)
				else
				{
					next_states = Object.entries(graph['node_graph2'][state]['next'][case_])
					let m = graph['i']
					next_states = exports.makeNextStates(next_states)

					exports.printLevelsBounds(graph, state, case_, indents, m, graph['input'].length, 0, -1)
					// add passing state horizontally
					bottom[0].child = [state, case_]

				}

				state_changed = true

				break
			}



        }

		//printStack(bottom)
		if (next_states.length == 0)
		{
			// have linked list representing the stack
			// first item is in bottom[0]

			// travel up stack untill either hits root or hits neighbors of a prev visited level
			let tracker_continuing_next_states_indents = exports.getNextStates(bottom[0], next_states, indents, graph)

			let tracker = tracker_continuing_next_states_indents[0]
			let continuing_next_states = tracker_continuing_next_states_indents[1]
			indents = tracker_continuing_next_states_indents[2]


			bottom[0] = tracker
			next_states = continuing_next_states

			state_changed = true
			// might not actually be true ever
			/*
			if (tracker == null)
			{
				console.log('done runing machine')
			}*/
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