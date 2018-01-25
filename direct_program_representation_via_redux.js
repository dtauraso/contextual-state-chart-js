
const defaultState = 0;
var x = {alpah: 0, action_succeded: true}
var test = { type: 'start',

    stuff:
    [
    
        {type: 'ADD', next: 1},
        {type: 'done', next: 'finished'}

]
};
//const nodes
//const node
//let nodes_graph = {
    // node_start -> grid_location
    // all_slots_are_empty -> is_next_node_in_same_group
    // this allows multiple subgraphs, maybe use '  ' to tell them apart(only using one subgraph now)
    //'start'                      : {'start_of_sub_graph' : true, 'next_states'  : [{'node_start': 0}]},
    //'node_start'                 : {'start_of_sub_graph' : true, 'next_states' : [{'grid_location': 0}]},
    //'is_next_node_in_same_group' : {'start_of_sub_graph' : false, 'next_states' : [{'node_start': 0, 'add_group_separator': 0}]},
    //'add_group_separator'        : {'start_of_sub_graph' : false, 'next_states' : [{'node_start': 0}]}
    // some end state goes here


//}
// the state machine is divided into tracks
// each track describes a subprocess
// the number in {'grid_location': 0} says to do the nth case in 'grid_location' case and to pick the nth neighbors set after the nth case has successfully run
let node_graph = {
    //    'state'                     : {'start_of_sub_graph' : true, 'next_states' : [{'next_state': case_and_next_states_next_states}]},
    // the first state when i = 0 is the redux init state
    // first state = grid_location, first case = 0
    // change grid_location's start_of_subgraph to false when using nodes_graph
    // seems to think elements are ordered
    /*
header
commands_left
command
slots_left
slot

print(rows)
for row in rows
    for col in row
        f(node)
        if subgraph_id == next col.id
            subgraph_id = next col.id


f(node)

string[0] +=name, (x, y) value | group_id |
string[1] +=-------

i = 2
for each slot
    for each command
        string[i] += | command |
        i++
    string[i] +=------
    i++


*/

    /*
        print -> evaluate
    */

    'print'             : {'start_of_sub_graph' : true,  'next_states' : [{'evaluate': 0}]},
    'evaluate'          : {'start_of_sub_graph' : true,  'next_states' : []}


    



}
// next_states = Object.keys(graph[tracer]['next_states'][case_]) -> ['divider']
// new case = graph[tracer]['next_states'][case_][next_states[0]]
// new tracer = next_states[0]
// case graph[tracer]['next_states'][case_][next_states[j]]




var delimiters = (level, delimiter) => {

    if(level < 0)
    {
        //console.log("level", level)
        //exit(0)
    }
    var string = ""
    for (var i = 0; i < level; i++)
    {
        string = string + delimiter
    }
    return string

}
var debug = (state, case_, indent_level) => {

    console.log(delimiters(indent_level, '     ') +
                'state' +
                ' ' +
                state +
                ' ' +
                'case' +
                ' ' +
                case_ +
                ' ' +
                'end' +
                delimiters(indent_level + 5, '-') + '\n')

}

var visit = (graph, state, store, first_tracker_name, first_case_name) => {
    // assumes first true case is followed
    // never did grid_location
    var case_ = first_case_name
    // first_tracker_name is not a list
    var next_states = [first_tracker_name]
    var action = {}
    //var i = 0
    while(next_states != [])
    {
        /*if(i == 30)
        {
            fail
        }*/
        for(var j = 0, len = next_states.length ; j < len; j++)
        {
            var tracer = next_states[j]

            action = {type: tracer, case_: case_}
            console.log('ready for action',state.tracer_in_state)

            store.dispatch(action)
 
            console.log('after action')
            console.log(tracer, case_, next_states, j,store.getState().action_succeded)
            var state_changed = false
            if(store.getState().action_succeded)
            {
                //console.log(tracer, case_, next_states[j])

                next_states = Object.keys(graph[tracer]['next_states'][case_])

                case_ = graph[tracer]['next_states'][case_][next_states[0]]
                tracer = next_states[0]
                //console.log(tracer, case_, next_states, j)

                console.log('here I am',state.tracer_in_state)
                state_changed = true
                break
            }

        }
        // if all fail then all will be rerun unless this condition is here
        if(!state_changed && next_states != [])
        {

            console.log(next_states, 'have failed so your state machine is incomplete')
            fail
        }

        //i++
    }
    // state machine is not done running unless next_state == []

    console.log('state machine is finished')
    
    
}
grids_of_cells = { 
                'grids':  [
                            [
                                [
                                  { 'cell_name': 'halt',
                                    'x':0,
                                    'y':0,
                                    'value': '',
                                    'group_id': -1,  // the group_id's can overlap
                                    // edge_terms hold the result of a command that does (x + a, y + b, z + c)
                                    //slots: [ {commands: ['', ''], edge_terms: [ {x: , y:, z: /*assuemd to be next current_slot implicitely, or set by clicking on a specific slot in cell at (x, y)*/} ]} ] 
                                    // a value is in each slot so the full history of the computations can be viewed
                                    'slots': [    {'value': '','commands': [], 'edge_term': {'path_id': -1, 'a': 0, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0}],
                                    //slot:{commands: [['meaningless'],['nothing happens', 'next non-functioning command']], current_slot: 0, current_command: 0},
                                    'source':'',
                                    'start_bound': -1,
                                    'step':0
                                    // for each slot
                                        // 1 edge_term comes out of it
                                    },
                                    {  'cell_name':'alpha',
                                        'x': 1, 
                                        'y': 0, 
                                        'value': 'a',
                                        'group_id': 0, 
                                        'slots': [ {'value': '','commands': ['referTo(a=-|source|, b=-1, c=0)'], 'edge_term': {'path_id': 0, 'a': -1, 'b': 1, 'c': 0, }, 'current_slot': 0, 'current_command': 0} ],
                                         // last visited slot

                                        'source': '10',
                                        'start_bound': 'end',
                                        'step': '-1'}
                                 ],
                                [
                                    {   'cell_name': '',
                                        'x': 0,
                                        'y': 1,
                                        'value': '+',
                                        'group_id': 1, 
                                        // slots: [ {commands: ['', ''], edge_terms: [ {x: -1, y: -1, z: -1} ], current_slot: 0, current_command: 0} ],
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
                                                 //last visited slot

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

                                        {   'cell_name': 'gamma',
                                            'x':1,
                                            'y': 2,
                                            'value': 'g',
                                            'group_id': 3,
                                            'slots': [ {'value': '','commands': ['duplicateCol(-1)',
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
                                                  // supposed to be offset not the point itself
                                                // last visited slot

                                     'source':'',
                                     'start_bound': -1,
                                     'step': -1},
                                 { 'cell_name':'',
                                    'x':0,
                                    'y':1, 
                                    'value':'+',
                                    'group_id': 0, 
                                    'slots': [ {'value': '','commands': ['(0, 2)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 1, 'c': 1}, 'current_slot': 0, 'current_command': 0} ],
                                    // last visited slot
                                    'source':'',
                                    'start_bound': -1,
                                    'step': -1},

                                 { 'cell_name':'',
                                    'x':0,
                                    'y':2,
                                    'value':'0',
                                    'group_id': 0, 
                                    'slots': [ {'value': '','commands': ['collectAnswer(1, 0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 1, 'c': 1}, 'current_slot': 0, 'current_command': 0} ],
                                     // last visited slot

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
                                             // last visited slot

                                    'source':'',
                                    'start_bound': -1,
                                    'step':-1}
                                ]
                           ],




                           [
                                [
                                {   'cell_name':'', 
                                    'x':0,
                                    'y':0,
                                    'value':'1',
                                    'group_id': 0, 
                                    'slots': [ {'value': '','commands': ['(0, 1)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
                                                  // supposed to be offset not the point itself
                                                // last visited slot

                                     'source':'',
                                     'start_bound': -1,
                                     'step': -1},
                                 {  'cell_name':'',
                                    'x':0,
                                    'y':1, 
                                    'value':'+',
                                    'group_id': 0, 
                                    'slots': [ {'value': '','commands': ['(0, 2)'], 'edge_term': {'path_id': 0, 'a': 1, 'b': 0, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
                                    // last visited slot
                                    'source':'',
                                    'start_bound': -1,
                                    'step': -1},

                                 {  'cell_name':'',
                                    'x':0,
                                    'y':2,
                                    'value':'1',
                                    'group_id': 0, 
                                    'slots': [ {'value': '','commands': ['collectAnswer(1, 0)'], 'edge_term': {'path_id': 0, 'a': 0, 'b': 1, 'c': 0}, 'current_slot': 0, 'current_command': 0} ],
                                     // last visited slot

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
                                             // last visited slot

                                    'source':'',
                                    'start_bound': -1,
                                    'step':-1}
                                ]
                            ]

                        ]
}
// variable_tree = [{state_state_machine__start_name: [{var: current_value}]}]
var state_machine = {
    'state machine1' : {
        'state_graph' : {},
        // vars for graph
    }
    action_succeded: false,
    current_cycle_id: -1,

    strings_: [],
    // index for what string to append to
    i: 0,
    // cell access
    j: 0,
    k: 0,
    m: 0,
    buffer: [],
    history_grouped_by_cell_group_ids: [[]],
    display_grid: [ ['0', '1', '0'],
                    ['+', '1', '0'],
                    ['0', '0', '0']],
    cell_group_ids: [/*(duplicate_0, duplicate_1)*/],

    // when I stop seeing one of the cell_group_id's the id is done
    // each cell_group_id is a routine(it can be named)
    // assume the next slot is the ith + 1 slot for the field(i starts at -1)
    // graph holds all subgraphs currently being recorded ordered by cell_group_id
    // how to prove the item is in a repeat cycle
        // the next node has the same instructtions that at least one node has from the history 

        // template form
            // user types this in
            // no evaluation
            // all templated setup is predestined(source code)


        // evaluator runs on template form to create representative form
        // representative form (test runs with representative input) project 1 is only 1 input
            // sequences of evaluations on representative input(make new evaluation when there is a condition where edges are determined by conditions rather than predestined)
            // the set of sequences are the full shape set of the input

    
    ,
    state_graph: node_graph

}
var printBreakInSequence = (state_graph, current_action_state, program_state) => {

    let start_of_graph = state_graph[current_action_state]["start_of_sub_graph"]
    if(start_of_graph)
    {
        let x = program_state.number_of_processes + 1
        Object.assign(program_state, {number_of_processes: x})
        console.log(    '\n\n-------------------------------------------------------------\n' +
                        String(program_state.number_of_processes) +
                        '\n')
    }

}



//var nodesReducer = (state = {}, )
var nodeReducer = (state = {}, action) => {

    console.log("got here", action.type, action)
    // set this false when the item enteres
    Object.assign(state, {action_succeded: false});
    if(action.type != '@@redux/INIT')
    {
        console.log('state', action.type, 'case', action.case_, 'start',  action.type)

        printBreakInSequence(state.state_graph, action.type, state)
    }
    switch(action.type)
    {

        // just to be the start state of the state machine
        /*case 'start':
        {
            Object.assign(state, {action_succeded: true});
            break

        }*/
        case 'print':
        {
            /*
            for row in rows
                for col in row
                    f(node)
                    if subgraph_id == next col.id
                        subgraph_id = next col.id


            f(node):

            string[0] +=name, (x, y) value | group_id |
            string[1] +=-------

            i = 2
            for each slot
                for each command
                    string[i] += | command |
                    i++
                string[i] +=------
                i++*/

            state.strings_[0] =    state.grids[state.j][state.k][state.m].cell_name + 
                                    ' ( ' +
                                    String(state.grids[state.j][state.k][state.m].x) +
                                    ' , ' + 
                                    String(state.grids[state.j][state.k][state.m].y) +
                                    ' ) ' +
                                    state.grids[state.j][state.k][state.m].value +
                                    ' ' +
                                    '|' +
                                    state.grids[state.j][state.k][state.m].group_id +
                                    ' ' +
                                    '|'

            state.strings_[1] = '-------------'
            for (var i = Things.length - 1; i >= 0; i--) {
                Things[i]
            }
            Object.assign(state, {action_succeded: true});

            break

        }
        case 'expand_to_a_representative_form':
        {
            // duplacates col
            // connects predetermined edge
            // run 
            // the different commands are there for different ideas of what to do
        }
        case 'evaluate':
        {
            // visit the 
        }
        case 'grid_location':
        {

            state.strings_[state.i] =   ' ( ' +
                                        String(state.grids[state.j][state.k][state.m].x) +
                                        ' , ' + 
                                        String(state.grids[state.j][state.k][state.m].y) +
                                        ' ) '
            Object.assign(state, {action_succeded: true});
            break
            // can't access position 0 of an empty list
            //console.log("data", state.strings_)
            //action_succeded = true
            // change object and set truth var

            /*return Object.assign(  {},
                            state,
                            {strings_: state.strings_[state.i].append(state.grid[j][k].value),
                                action_succeded: true});*/
                                
        }
        case '|':
        {
            switch(action.case_)
            {
                // don't froget that different strings are being accessed from the same cell
                // that is why there are different cases

                // these are the next states for the cases
                // says there is 1 edge from case 0 and it is called 'value'
                // value
                case 0:
                {
                    //console.log(state.strings_)
                    //console.log()
                    state.strings_[state.i] += '|'
                    //console.log('done', state.strings_)
                    Object.assign(state, {action_succeded: true});

                    break


                    
                }
                // divider
                case 1:
                {
                    state.strings_[state.i] += '|'
                    Object.assign(state, {action_succeded: true});
                    break

                    
                }
                // command
                case 2:
                {
                    state.strings_[state.i] = '|'
                    Object.assign(state, {action_succeded: true})
                    break
                }
                // are_there_commands_left, move_to_next_slot
                case 3:
                {
                    state.strings_[state.i] += '|'
                    
                    //Object.assign(state.grids[state.j][state.k][state.m].slot, {current_command: state.grids[state.j][state.k][state.m].slot.current_command + 1})
                    Object.assign(state, { i: state.i + 1 })
                    Object.assign(state, {  action_succeded: true})
                    //console.log("done")
                    //console.log(state.grids[state.j][state.k][state.m].slot)
                    //console.log(state)
                    break

                }
            }
            
            break

        }
        case 'value':
        {
            //console.log(state.i)
            state.strings_[state.i] += state.grids[state.j][state.k][state.m].value + ' '
            Object.assign(state, {action_succeded: true});
            break

        }
        case 'group_id':
        {
            state.strings_[state.i] += state.grids[state.j][state.k][state.m].group_id + ' '
            Object.assign(state, {action_succeded: true});

            //console.log("data", state)

            //console.log("got here")
            //fail
            break

        }
        case 'divider':
        {
            Object.assign(state, {i: state.i + 1})
            state.strings_[state.i] = '---------------------'
            Object.assign(state, {action_succeded: true, i: state.i + 1});
            break
        }
        case 'command':
        {
            //console.log('slot', state.grids[state.j][state.k][state.m].slot)
            state.strings_[state.i] += ' ' +
            state.grids[state.j][state.k][state.m].slot.commands[ state.grids[state.j][state.k][state.m].slot.current_slot ][state.grids[state.j][state.k][state.m].slot.current_command]

            Object.assign(state, {action_succeded: true})
            /*console.log(
                state.grids[state.j][state.k][state.m].slot.commands[ state.grids[state.j][state.k][state.m].slot.current_slot ][state.grids[state.j][state.k][state.m].slot.current_command]

)*/
            break
        }
        case 'are_there_commands_left':
        {
            //console.log(state.grids[state.j][state.k][state.m].slot)

            Object.assign(state, {action_succeded: 
                state.grids[state.j][state.k][state.m].slot.current_command <
                state.grids[state.j][state.k][state.m].slot.commands[ state.grids[state.j][state.k][state.m].slot.current_slot ].length

            })

            console.log(state.action_succeded)
            break

        }
        case 'move_to_next_command':
        {

            Object.assign(state.grids[state.j][state.k][state.m].slot, {current_command: state.grids[state.j][state.k][state.m].slot.current_command + 1})
            Object.assign(state, {action_succeded: true})
            break
        }
        
        case 'move_to_next_slot':
        {
            console.log('made it')
            // command has to return to 0 after slot has been moved
            Object.assign(state.grids[state.j][state.k][state.m].slot, {current_slot: state.grids[state.j][state.k][state.m].slot.current_slot + 1})
            Object.assign(state.grids[state.j][state.k][state.m].slot, {current_command: 0})
            Object.assign(state, {action_succeded: true})
            break
            //fail   
        }
        case 'are_there_slots_left':
        {

            Object.assign(state, {action_succeded: 
                state.grids[state.j][state.k][state.m].slot.current_slot <
                state.grids[state.j][state.k][state.m].slot.commands.length

            })
            console.log(state.action_succeded)
            break
        }
        default:
        {
            if(action.type == '@@redux/INIT')
            {
                console.log('init round')
                Object.assign(state, character_printout)

            }
            else
            {
                console.log('don\'t have a case for', action.type, 'and', action.case_)
            }
            Object.assign(state, {action_succeded: true});
            //return state;
        }

    }
    //console.log(state)
    if(action.type != '@@redux/INIT')
    {
        console.log('not here')
        console.log('action', state.action_succeded)
         state.strings_.forEach( (item) =>
        {
            console.log(item)

        }

       );
        //console.log(state.grids[state.j][state.k][state.m].slot)
        console.log('state\'s tracer', action.type)
        debug(action.type, action.case_, -5)

    }
    /*console.log('action', state.action_succeded)
    if(state.action_succeded)
    {
        //console.log("here")
        state.strings_.forEach( (item) =>
        {
            console.log(item)

        }

       );
        //console.log(state.grids[state.j][state.k][state.m].slot)
        console.log('state\'s tracer', state.tracer_in_state)
        debug(state.tracer_in_state, state.case_in_state, -5)

        console.log()
        //console.log("done at succeded")
        return state
    }
    // need the result from when it is false
    else
    {
        console.log('state\'s tracer', state.tracer_in_state)

        debug(state.tracer_in_state, state.case_in_state, -5)
        console.log()

        return state
    }*/
    return state
    // print debug message
}
var x = createStore(nodeReducer)
visit(node_graph,character_printout, x, "grid_location", 0)
/*
var tracer = 'state'
    var case = 0
    while(graph[tracer]['next_states'] != [])
    {
        // make action {type, case}
        action = {type: tracer, case: case}
        store.dispatch(action)
        tracer = store.getState().state
        case = store.getState().case
    }
*/
/*export const visit =  (graph, store) => {
    

}*/
/*{"start" : [{"space" : 0}]
"space" : [{"month": 0}, {"done": 0}]
"month" : [{"month": 0, "forward_slash": 0}]
"forward_slash" : [{"day": 0}, {"year": 0}]
"day" : [{"day" : 0], {"forward_slash": 1}, {"space": 1}]
"year" : [{"year": 0}, {"space": 1}]
"done" : [{}]
}*/
// state traversal algorithm
// the state is all of the variables in the redux program
// the action is just a state graph saying when to run functions specific to the state
// just a default state
const reducer1 = (state = x, action) => {
    console.log(action, state, action.type)
    //console.log(test[0], state, test[state],state.type)
    // recognize state
    // do action and return new state
  switch (action.type) {
    // when the state is returned the store's current state is set to the value returned
    // sends action.next to the current state for the store
    case 'ADD': return /*state + */x;
    case 'done' :
    {
        //let x = test[state].next
        console.log("got here")
            return action.next

    }
    default: return state;
  }
};

const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

//const total = actions.reduce(reducer1, 0); // 3


const ADD_CHAT = 'CHAT::ADD_CHAT';

const defaultState1 = {
  chatLog: [],
  currentChat: {
    id: 0,
    msg: '',
    user: 'Anonymous',
    timeStamp: 1472322852680
  }
};

const chatReducer = (state = defaultState1, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    default: return state;
  }
};

export const addChat = ({
  // cuid is safer than random uuids/v4 GUIDs
  // see usecuid.org
  id = cuid(),
  msg = '',
  user = 'Anonymous',
  timeStamp = Date.now()
} = {}) => ({
  type: ADD_CHAT,
  payload: { id, msg, user, timeStamp }
});

var store_1 = createStore(reducer1)
//console.log(test[0], "werghtyjukjyre")
var tracker = test.stuff[0]
/*
while (tracker.type != 'finished')
{
    store_1.dispatch(tracker)
    console.log('store_1 state after action ADD:', store_1.getState(), store_1.getState().next_action)
    if(store_1.getState() == 'finished')
        break
    tracker = action_map[store_1.getState().next_action]
}*/
//store_1.dispatch(test.stuff[0])
//store_1.dispatch(test)
//console.log('store_1 state after action ADD:', store_1.getState())
//store_1.dispatch(test.stuff[store_1.getState()])
//console.log('store_1 state after action ADD:', store_1.getState())

//console.log("test", test.stuff[store_1.getState()])

//store_1.dispatch(test[store_1.getState()])
//console.log('store_1 state after action ADD:', store_1.getState())

//console.log("state is done is", store_1.getState() == "done")

//var store_2 = createStore(chatReducer)
//store_2.dispatch(actions[1])
//console.log('store_2 state after action ADD:', store_2.getState())

// make a new track with the specific data chosen(operations will be defined to make this possible) at the slot and put on a new track if duplicating 1 element in row or colum



// can only duplicate entire columns or entire rows

// duplicating elements across tracks
// assume each row is a track
// attach the rule to each element in the col
// duplicate all rows at col as same time

// apply 1 action to col 2 specified by content or range(language the user enteres)
// apply 1 action to col 2 specified by content or range(language the user enteres)
// the machup of content is determined by the first match


/*
// appllies generation rules to certain columns
H(2d_grid = [
    [ -1, 'x', '0'],
    ['+', 'x', '0'],
    [ -1, -1,  -1 ]
    ], generate_columns = [2: [{2: "00"}, {2:-1}]], generate_rule_commands = ['duplicate': 2 ["buffer.add(value), next(0, -1, 0, g.current)"]])
*/
// the key and values for teh generate rules commans should be in this form [2: [{2: "00"}, {2:-1}]

// write the rules in the slots for each row in col that will be dukplicated
// H goes through the slots and applies the rules to each row at col
/*
assume all slots have same value unless otherwise set
version 1
    run 10 + 10 succefully
    don't worry if it is not that interactive
    no parsing for this round(replace with code doing the thing the parser would extract data for)
    print out the 2d grid version with the indexes just for showing.
make an array of strings to print out

(0, 1)
| +      cell_group_1   |
-------------
|s1 command1|
|s1 command2|
|s1 command3|
-------------
|s2 command1|
|           |

number of commands per slot
length of longest command per slot


use (x, y, z) to determine where the commands go
setup user data and connection formulas(H)() looks at the commands and gets calls ready by the entire col and entire row rules above
all of the links that are not triggered by running the program are generated at this stage
if the entire printout is saved in a 2d grid, then I can find the location to add only the next part and not have to recalculate where everything is(use a secondary array for knowing the boundaries of the slots)


for each item
    generate strings for the ith slot commands

need to know lots of lengths
make state machine    
*/
// apply duplicate operations to rows
// batch operations can't be applied to heterogenious columns

//next = (a, b, c, {x, y, z})

