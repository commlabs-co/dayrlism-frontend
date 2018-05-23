/* @flow */

// Allows you to precompile ES6 syntax
require('@babel/register');
require('dotenv').config();

// Setup global variables for server-side
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = process.env.NODE_ENV === 'development';

global.__APIURL__ = process.env.API_URL;
global.__TOKENKEY__ = process.env.TOKEN_KEY;

// Run assets require hooks
require('./tools/webpack/hooks')();
// Run server
require('./src/server');
