# Calculator
This program uses a hierarchy of state graphs to emulate a calculator. More examples are given.

Use the node start.js command to run

uses node 12 and ES5 syntax

what it does do?
runs through the states in preorder traversal using a stack
prints state sequence through the hierarchy
quits when the machine can't continue


It's refurbished from the newer design in the redux version [here]
change state, case_ to 'state case_0', 'state case_1
clean up the logic using the new version

what am I keeping?
ES5 syntax
stack based hierarchy tracking(to keep the logic iterative)

what am I not adding?
before and after var changes tracking system
hierarchical state sequence tracking
result of submachine returning true or false

