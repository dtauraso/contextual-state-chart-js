grids_of_cells = { 
				'grids':  [
        					[
            					[
            					  { 'cell_name': 'halt',
				                    'x':0,
				                    'y':0,
				                    'value': '',
				                    'group_id': -1,
				                    # edge_terms hold the result of a command that does (x + a, y + b, z + c)
				                    #slots: [ {commands: ['', ''], edge_terms: [ {x: , y:, z: /*assuemd to be next current_slot implicitely, or set by clicking on a specific slot in cell at (x, y)*/} ]} ] 
				                    # a value is in each slot so the full history of the computations can be viewed be viewing all of the slots
				                    'slots': [    {'value': '','commands': [], 'edge_term': {'path_id': -1, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0}],
				                    'source':'',
				                    'start_bound': -1,
				                    'step':0
				                    # for each slot
				                        # 1 edge_term comes out of it
				                    },
				                    {  'cell_name':'alpha',
		                                'x': 1, 
		                                'y': 0, 
		                                'value': 'a',
		                                'group_id': 0, 
		                                'slots': [ {'value': '','commands': ['duplicateCol(-1)','referTo(a=-|source|, b=-1, c=0)'], 'edge_term': {'path_id': 0, 'a': -1, 'b': 1, 'c': 0, }, 'current_slot': 0, 'current_command': 0} ],
		                                 # last visited slot

		                                'source': '10',
		                                'start_bound': 'end',
		                                'step': '-1'}
		                         ],
					            [
						            { 	'cell_name': '',
					                    'x': 0,
					                    'y': 1,
					                    'value': '+',
					                    'group_id': 1, 
					                    # slots: [ {commands: ['', ''], edge_terms: [ {x: -1, y: -1, z: -1} ], current_slot: 0, current_command: 0} ],
					                    'slots': [ {'value': '','commands': ['referTo(a=|alpha.source|, b=0, c=0)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
					                    
					                    'source': '',
					                    'start_bound': 'end',
					                    'step':0},

					                    {  'cell_name': 'beta',
	                                        'x':1, 
	                                        'y': 1, 
	                                        'value':'b',
	                                        'group_id': 2, 
	                                        'slots': [ {'value': '','commands': ['referTo(a=0, b=1, c=0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 1, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
	                                             # last visited slot

	                                        'source':'10',
	                                        'start_bound': 'end',
	                                        'step': -1}

						        ],
					            [
					            	{  'cell_name': '',
					                    'x':0,
					                    'y':2,
					                    'value': '',
					                    'group_id': -1,
					                    'slots': [ {'value': '','commands': [], 'edge_term': {'path_id': -1, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],

					                    'source':'',
					                    'start_bound': -1,
					                    'step': -1},

			                            {	'cell_name': 'gamma',
		                                    'x':1,
		                                    'y': 2,
		                                    'value': 'g',
		                                    'group_id': 3,
		                                    'slots': [ {'value': '','commands': [
		                                    'computeTemplateInformation(current_path)','store other part of completed pattern(buffer)', 
                                                'buffer=[]', 'referTo(a=-1, b=-source, c=0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
		                                    
		                                    'source': '2',
		                                    'start_bound': -1,
		                                    'step': -1}
			                    ]
        					],

					        [
					        	[
						        {   'cell_name':'', 
					                'x':0,
					                'y':0,
					                'value':'0',
					                'group_id': 0, 
					                'slots': [ {'value': '','commands': ['(0, 1)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 1, 'c': 1}, 'current_slot': 0, 'current_command': 0} ],
					                              # supposed to be offset not the point itself
					                            # last visited slot

		                             'source':'',
		                             'start_bound': -1,
		                             'step': -1},
	                             { 'cell_name':'',
		                            'x':0,
		                            'y':1, 
		                            'value':'+',
		                            'group_id': 0, 
		                            'slots': [ {'value': '','commands': ['(0, 2)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 1, 'c': 1}, 'current_slot': 0, 'current_command': 0} ],
			                        # last visited slot
			                        'source':'',
			                        'start_bound': -1,
		                            'step': -1},

	                             { 'cell_name':'',
			                        'x':0,
			                        'y':2,
			                        'value':'0',
			                        'group_id': 0, 
				                    'slots': [ {'value': '','commands': ['collectAnswer(1, 0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 1, 'c': 1}, 'current_slot': 0, 'current_command': 0} ],
				                     # last visited slot

				                    'source':'',
				                    'start_bound': -1,
				                    'step':-1}
			                     ]
			                ],

					        [
					        	[
					         	{  'cell_name':'',
				                    'x':0,
				                    'y':0,
				                    'value':'0',
				                    'group_id': 0, 
				                    'slots': [ {'value': '','commands': ['(-1, -1)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
				                             # last visited slot

		                            'source':'',
		                            'start_bound': -1,
		                            'step':-1}
		                        ]
		                   ],




		                   [
		                   		[
						        {	'cell_name':'', 
					                'x':0,
					                'y':0,
					                'value':'1',
					                'group_id': 0, 
					                'slots': [ {'value': '','commands': ['(0, 1)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
					                              # supposed to be offset not the point itself
					                            # last visited slot

		                             'source':'',
		                             'start_bound': -1,
		                             'step': -1},
	                             {  'cell_name':'',
		                            'x':0,
		                            'y':1, 
		                            'value':'+',
		                            'group_id': 0, 
		                            'slots': [ {'value': '','commands': ['(0, 2)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
			                        # last visited slot
			                        'source':'',
			                        'start_bound': -1,
		                            'step': -1},

	                             {  'cell_name':'',
			                        'x':0,
			                        'y':2,
			                        'value':'1',
			                        'group_id': 0, 
				                    'slots': [ {'value': '','commands': ['collectAnswer(1, 0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 1, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
				                     # last visited slot

				                    'source':'',
				                    'start_bound': -1,
				                    'step':-1}
			                    ]
			                ],

					        [
					        	[
					         	{  'cell_name':'',
				                    'x':0,
				                    'y':0,
				                    'value':'2',
				                    'group_id': 0, 
				                    'slots': [ {'value': '','commands': ['(-1, -1)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
				                             # last visited slot

		                            'source':'',
		                            'start_bound': -1,
		                            'step':-1}
		                        ]
		                    ]

					    ]
}


def printEdgeTerm(edge_term):

	return 'path_id = '+ str(edge_term['path_id']) + ' ( a= '+ str(edge_term['a'])+ ', b= '+ str(edge_term['b'])+ ', c= '+ str(edge_term['c']) + ')'


def getDataFromCell(cell):

	cell_data = []
	cell_data.append(''.join(['|', cell['cell_name'] , ' ( ' , str(cell['x']) , ', ', str(cell['y']) , ' ) ', ' |', 'value = ' , cell['value'] , ' |', 'group_id = ' , str(cell['group_id'])]))

	slots = cell['slots']
	
	for i, slot in enumerate(slots):
		commands = slot['commands']
		for j, command in enumerate(commands):
			cell_data.append(''.join(['|', str(j),  '| ', command]))
		cell_data.append(''.join(['|', 'edge ',  printEdgeTerm(slot['edge_term'])]))

	cell_data.append(''.join(['|', 'source = ', '\'', cell['source'], '\'']))

	return cell_data

def zipGeneral(lists, pad_string):
	# returns [(l1[0], l2[0]), (l1[1], l2[1])]
	lengths = [len(list_) for list_ in lists]

	padded_lines = {i: [] for i, list_ in enumerate(lists)}


	max_value = max(lengths)
	for i, value in enumerate(lengths):

		if value != max_value:

			distance = max_value - value

			for j in range(distance):
				lists[i].append(pad_string)

	first_string = 0
	first_list = lists[first_string]
	return [tuple(list_[i] for list_ in lists) for i in range(len(first_list))]
	
def printGrid(graph):

	cells = {}
	grids = graph['grids']
	
	for z, grid in enumerate(grids):
		for x, row in enumerate(grid):
			for y, col in enumerate(row):
				key = str(x) + str(y) + str(z)

				cells[key] = col
	first_grid = graph['grids'][0]


	list_of_cells = []
	for j, row in enumerate(first_grid):
		# the columns will have uneven dividers because not all cells have same number of cols
		cell = []
		for k, col in enumerate(row):

			key = str(j) + str(k) + str(0)

			cell_data = getDataFromCell(cells[key])
			
			lines = [''.join(a) for a in cell_data]
			cell.append(lines)

		list_of_cells.append(zipGeneral(cell, '| |'))

	# make sure all cells have evenly set dividers

	# uneven transpose 3d
	col_lengths 		= [[[len(list_of_cells[j][k][i])
									for k, n in enumerate(row)]
								for j, row in enumerate(list_of_cells)]
							for i, tuple_ in enumerate(list_of_cells[0][0])]

	max_for_each_col 	= [max([max(row) for j, row in enumerate(tuple_)]) for i, tuple_ in enumerate(col_lengths)]

	
	
	padding_distances 	= [[[max_for_each_col[i] - specific_col
										for k, specific_col in enumerate(x)]
									for j, x in enumerate(col)]
								for i, col in enumerate(col_lengths)]

	# inverse 3d transpose uneven
	pad_distances 		= [[tuple(padding_distances[i][k][j]
									for i, n in enumerate(padding_distances))
								for j, item in enumerate(x)]
							for k, x in enumerate(padding_distances[0])]

	# '.join' in the most inner part saves a '+' in the most inner par of the next list comprehension 
	# '.join' in this list comprehension allows an offset on the left side of all lines in the code grid
	list_of_cells 		= [[[ ''.join(['  ', addPadding(z, pad_distances[a][b][c])])
								for c, z in enumerate(y)]
							for b, y in enumerate(x)]
						for a, x in enumerate(list_of_cells)]

	x = [ ''.join( [ '\n\n'.join( [ '      '.join(a) for a in x ] ), '\n\n\n' ] ) for x in list_of_cells]
	[print(a) for a in x]
	return True

def addPadding(string, pad_distance):


	return ''.join([string, ''.join([' ' for i in range(pad_distance)]), '|'])

#printGrid(grids_of_cells)
#exit()

	# print(error message, state_trackers['current_state_machine'])
def functionStateMachineAction(graph, state_trackers, current_state_machine, current_state, case_):

	input_ = graph[current_state_machine]['input']

	parser = graph[current_state_machine]['common_function']
	if current_state == 'start_function_state_machine':
		# reset data from last time 
		return True
	if current_state == 'letter':
		if case_ == 0:
			'''
			from redux tutorial
			// Let's now imagine a simple asynchronous use-case:
			// 1) user clicks on button "Say Hi in 2 seconds"
			// 2) When button "A" is clicked, we'd like to show message "Hi" after 2 seconds have elapsed
			// 3) 2 seconds later, our view is updated with the message "Hi"

			to do this in any case of my action functions, put a line that waits for 2 second to go by
			the rest of the lines for that state @ case runs the rest of the actions
			https://en.wikipedia.org/wiki/Comparison_of_synchronous_and_asynchronous_signalling
			# example
			# put in a return ajax call with a callback here
			# or have a timer run

			'''


			return parser(graph, state_trackers, letter)

	elif current_state == '(':
		return parser(graph, state_trackers, lambda char: char == '(')

		#return True
	elif current_state == '=':
		return parser(graph, state_trackers, lambda char: char == '=')

	elif current_state == '-':
		return parser(graph, state_trackers, lambda char: char == '-')
	#elif current_state == 'past_last_char_of_input':
		# 
	elif current_state == 'end':
		print('done')
		return True

def duplicateDependencyMachineAction(graph, state_trackers, current_state_machine, current_state, case_):
	# only get function if there is a function for the case
	if case_ in graph[current_state_machine]['state_graph'][current_state]:
		state_case_function = graph[current_state_machine]['state_graph'][current_state][case_]

	#state_case_function = graph[current_state_machine]['state_graph'][current_state][case_]

	if current_state == 'start':
		if case_ == 0:
			#input_ = graph[current_state_machine]['input']
			return state_case_function(graph, state_trackers)


def operate3dGridAction(graph, state_trackers, current_state_machine, current_state, case_):

	# only get function if there is a function for the case

	if case_ in graph[current_state_machine]['state_graph'][current_state]:
		state_case_function = graph[current_state_machine]['state_graph'][current_state][case_]

	#state_case_function = graph[current_state_machine]['state_graph'][current_state][case_]

	if current_state == 'start':
		#print('here')
		#print(state_trackers)
		return True
	elif current_state == 'print_3d_grid':
		#print(state_case_function)
		#quit()
		return state_case_function(graph['operate_3d_grid']['grids_of_cells'])

# https://stackoverflow.com/questions/24580993/calling-functions-with-parameters-using-a-dictionary-in-python
def check(graph, state_trackers, f):

	#print()
	#print(graph[state_trackers['current_state_machine']]['input'])
	input_  		= graph[state_trackers['current_state_machine']]['input']
	i 				= graph[state_trackers['current_state_machine']]['i']
	function_name 	= graph[state_trackers['current_state_machine']]['function_name']
	indent_level 	= graph[state_trackers['current_state_machine']]['indent_level']

	char = input_[i]
	if f(char):
		#print(input_, i)
		# check for out of bounds
		graph[ state_trackers['current_state_machine'] ]['function_name'] += input_[i]
		print(''.join(['    ' for i in range(indent_level)]), graph[ state_trackers['current_state_machine'] ]['function_name'])

		# shorten this because i references graph[current_state_machine]['state_graph']['i']?

		graph[ state_trackers['current_state_machine'] ]['i'] = i + 1
		return True
	return False

def letter(char):
	return char >= 'a' and char <= 'b'
'''
start_state = 0
a = 1
a_b_c = 2
[ [{a:'0', a_b_c: 'b_c'}], [{a_b_c: 'a'}], [] ]
each action function must return true
each action condition function must return true or false
'''
def function(graph, state_trackers):

	print('got to function')

	#print(state_trackers)
	state_trackers['next_state_machine'] = 'function_state_machine'
	#state_trackers['tracker'] = 'letter'
	#print(state_trackers)
	#print(graph)
	print('start passed')
	#state_machines
	return True


# recognize and collect data from syntax of a function
# if this was redux, this dict would be the store
# [{'letter': 0, '-' : 0}, {'letter': 1}] is a list of neighbor sets for a single state
# the value is a case number so the same state can have more than 1 kind of behavior depending on what state came before it
# so this data structure allows variable order markov chains to be made
state_machine = {
	# may need to use ordered dict here
	# how to know what case to set when changing state machines and when not changing state machines
	# inner state machine
	'function_state_machine' : {
			# error detection algorithm:
			# stray chars are defined to not be in the set of future states
			# when char from input doesn't match the char from state, assume first that the char from input matches with a future state and find that future state(if this fails, no futue state matches(hit end of parsing state using more than 1 state machine), then print what was collected so far, with what an example of correct input looks like and reset what was collected)
			'state_graph': {
			# regular dict doesn't repect the order of the edges
			# have all items go to a length of input of i check function 
							'start_function_state_machine' : {'start_of_sub_graph' : True, 'next_states'  : [{'letter': 0}]},

							'letter': {'start_of_sub_graph' : False, 'next_states'  :[{'letter': 0, '(' : 0, '=' : 0,'past_last_char_of_input': 0, }],
										0: 'common_function'},
								# they are dead ends but there is at least 1 context of action that can be done before state machine is done
							'=' : {'start_of_sub_graph' : False, 'next_states'  : [{'end': 0}],
										0: 'common_function'},

							'-' : {'start_of_sub_graph' : False, 'next_states'  : [{'end': 0}],
										0: 'common_function'},

							'(': {'start_of_sub_graph' : False, 'next_states'  : [{'letter': 0, '-' : 0}],
										0:'common_function',
										1:'common_function'},
							'past_last_char_of_input' : {'start_of_sub_graph' : False, 'next_states'  : [{'end': 0}],
										0: lambda input_, i: len(input_) == i,
										},
							'end' : {'start_of_sub_graph' : False, 'next_states'  : []},
							# special next state, because it is in duplicate_dependency_machine
							'copy_function_to_ddm_and_swich_machine_trackers' : [{'duplicateCol_duplicate_dependency_machine': 0}]
							},
			'indent_level' : 2,
			# treat like this is an inner scope
			'function_name' : '',
			'parameters' : {},
			'input': 'bbbbbb(-',
			'i' : 0,
			'common_function' : lambda char, current_state_machine, f: check(char, current_state_machine, f),
			'state_machine_action_function' : lambda graph, state_trackers, current_state_machine, current_state, case_: 
													functionStateMachineAction(graph, state_trackers, current_state_machine, current_state, case_),
			'type' : 'parser'
			# in copy_function_to_ddm copy data from function_state_machine to duplicate_dependency_machine

			# in duplicateCol transfer to duplicate_dependency_machine
				# change 'current_state_machine' to 'duplicate_dependency_machine'
				# return true
	},
	# uses data collect from function_state_machine
	# have no function to run here
	# outer level state machine(it goes down and back through another state machine)
	# finds errors in command dependency and expand columns (and rows later) 
	'duplicate_dependency_machine' : {
			'state_graph' : {

							'start' : {'start_of_sub_graph' : True, 'next_states'  : [{'start_function_state_machine': 0}],
										0: lambda graph, state_machines: function(graph, state_machines)},
							'duplicateCol_duplicate_dependency_machine' : {'start_of_sub_graph' : True, 'next_states'  : []},

							'refer_to' : {'start_of_sub_graph' : True, 'next_states'  : []},

							'duplicate_column' : {'start_of_sub_graph' : True, 'next_states'  : [{'computeTemplateInformation': 0}],
										0: lambda graph, state_machines: function(graph, state_machines)}
							},
			'indent_level' : 1,
			'state_machine_action_function' : lambda graph, state_trackers, current_state_machine, current_state, case_: 
													duplicateDependencyMachineAction(graph, state_trackers, current_state_machine, current_state, case_),
			'type' : 'non_parser'

	},
	'evaluate_slots' : {
			#'start'
			# expand all template formulas(duplicate columns)
			# copy entire grid and put it in a new grid
			# take duplicate columns and duplicate column and put each source char where it belongs and increment the command index of current slot by 1
			# run all commands in slot
			# go to next slot dicted by single edge 
	},
	# have a loop in one of the states, whose job is to change to another state machine and another state and pass them into visitor function untill the state machine is done running (loop is done this way so that sequential states are just run 1 statement after another and not divided by state check statements)

	'operate_3d_grid' : {
			'state_graph' : {
				'start' : {'start_of_sub_graph' : True, 'next_states'  : [{'print_3d_grid': 0}]},

				'print_3d_grid' : {'start_of_sub_graph' : True, 'next_states'  : [], 0:lambda grids_of_cells: printGrid(grids_of_cells)}
				#'evaluate_slots'
				},
		'indent_level' : 0,

		'state_machine_action_function' : lambda graph, state_trackers, current_state_machine, current_state, case_: operate3dGridAction(graph, state_trackers, current_state_machine, current_state, case_),
		'grids_of_cells' : grids_of_cells
		}
	# all functions referenced in 'state_graph' must return true or false
}
# this is the action object passed to dispatch in redux
machine_trackers = { 'current_state_machine': 'operate_3d_grid', # this attribute is changed in a state @ case
	'tracker' : 'start',
	'case_' : 0,
	'next_state_machine' : '',
	'subgraph_number' : -1
	
}
def visit(graph, state_trackers, first_tracker_name, first_case_name):
	# breadth-first traversal
	# assumes first true case is followed
	# never did grid_location
	state_trackers['case_'] = first_case_name
	# first_tracker_name is not a list
	next_states = [first_tracker_name]
	# first_tracker_name is actually the next state to a dummy state
	i = 0
	while next_states != []:

		# upper bound for the number of nodes visited
		#if i == 2:
		#	quit()

		for next_state in next_states:
			state_trackers['tracker'] 	= next_state
			current_state_machine 		= state_trackers['current_state_machine']

			tracker 					= state_trackers['tracker']
			case_ 						= state_trackers['case_']
			action_succeded 			= action(graph, state_trackers)

			if action_succeded:
				# get next states and next case from current state
				next_set_of_next_states = graph[current_state_machine]['state_graph'][tracker]['next_states']

				if next_set_of_next_states != []:
					next_states = list(next_set_of_next_states[state_trackers['case_']].keys())
					
				else:
					next_states = []
					break


				# gets the case_ value from the first next state key(the label for the next state is a key, and the case for that next state is the value)

				neighbors 					= graph[current_state_machine]['state_graph'][tracker]['next_states'][case_]

				# the first case could be any number > -1
				first_case 					= list(neighbors)[0]
				state_trackers['case_'] 	= neighbors[first_case]


				state_trackers['tracker'] 	= next_states[0]

				if state_trackers['next_state_machine'] != '':
					if state_trackers['next_state_machine'] != state_trackers['current_state_machine']:

						# change the current_state_machine
						state_trackers['current_state_machine'] = state_trackers['next_state_machine']
				break
		#print(next_states)
		# 	next_states = []

		#else:
		#	break		
		#i = i + 1
		# state machine is not done running unless next_state == []

	print('state machine is finished')
    

def makeBreakInSequence(graph, state_trackers):

	#print(state_trackers)
	#print(graph[state_trackers['current_state_machine']])
	#print()
	start_of_graph = graph[ state_trackers['current_state_machine'] ]['state_graph'][ state_trackers['tracker'] ]['start_of_sub_graph']
	if start_of_graph:
    
		subgraph_number = state_trackers['subgraph_number'] = state_trackers['subgraph_number'] + 1
		return ''.join(['\n\n-------------------------------------------------------------\n' , str(subgraph_number) , '\n'])
    

# this is what the reducer function would be in redux
def action(graph, state_trackers):

	print(makeBreakInSequence(graph, state_trackers))

	current_state_machine 	= state_trackers['current_state_machine']
	current_state 			= state_trackers['tracker']
	case_ 					= state_trackers['case_']
	indent_level 			= graph[current_state_machine]['indent_level']

	if graph[current_state_machine]['state_machine_action_function'](graph, state_trackers, current_state_machine, current_state, case_):
		print(''.join(['    ' for i in range(indent_level)]), current_state_machine, current_state, case_)
		print()
		return True
	return False

visit(state_machine, machine_trackers, 'start', 0)

# this will probably be an action function for the parsing machines(currently one 1 machine is a parsing machine)
def visitForParsers(graph, state_trackers, first_tracker_name, first_case_name):
	# breadth-first traversal
	# assumes first true case is followed
	# never did grid_location
	state_trackers['case_'] = first_case_name
	# first_tracker_name is not a list
	next_states = [first_tracker_name]
	# first_tracker_name is actually the next state to a dummy state
	i = 0
	while next_states != []:

		# upper bound for the number of nodes visited
		if i == 10:
			quit()

		for next_state in next_states:
			state_trackers['tracker'] 	= next_state
			current_state_machine 		= state_trackers['current_state_machine']

			tracker 					= state_trackers['tracker']
			case_ 						= state_trackers['case_']
			action_succeded 			= action(graph, state_trackers)

			if action_succeded:
				# get next states and next case from current state
				next_set_of_next_states = graph[current_state_machine]['state_graph'][tracker]['next_states']

				if next_set_of_next_states != []:
					next_states = list(next_set_of_next_states[state_trackers['case_']].keys())
					
				else:
					next_states = []
					break


				# gets the case_ value from the first next state key(the label for the next state is a key, and the case for that next state is the value)

				neighbors 					= graph[current_state_machine]['state_graph'][tracker]['next_states'][case_]

				# the first case could be any number > -1
				first_case 					= list(neighbors)[0]
				state_trackers['case_'] 	= neighbors[first_case]


				state_trackers['tracker'] 	= next_states[0]
				if state_trackers['next_state_machine'] != '':
					if state_trackers['next_state_machine'] != state_trackers['current_state_machine']:

						# change the current_state_machine
						state_trackers['current_state_machine'] = state_trackers['next_state_machine']
				break
			# if action fails
				# if machine is a parser(all state machines in dict will have a label of either 'parser' or 'non_parser')
				# visit states untill left all parsing machines or hit end state or found a state that matches with the input
					# if state was found
						# print out the currently collected string including chars from the states visited as what the input should have been, as a hint to what to type in next time
						# break
					# else
						# current input char is a stray, so either delete it from input or don't include it in what was collected
						# break
			
		i = i + 1
		# state machine is not done running unless next_state == []

	print('state machine is finished')
    