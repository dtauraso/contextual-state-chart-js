// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
/*
require('babel-register')
({
    presets: [ 'env' ]
})
*/
// Import the rest of our application.
module.exports = require('./calculator_example.js')

// the state variables is the wrong structure so it will not run
// module.exports = require('./number_with_exponent_example_via_redux.js')


