// update this for dev / prod version
var REACT_PATH = "https:g//unpkg.com/react@16.6.3/umd/react.production.min";
var REACT_DOM =  "https://unpkg.com/react-dom@16.6.3/umd/react-dom.production.min";
// var REACT_PATH = "https://unpkg.com/react@16.6.3/umd/react.development";
// var REACT_DOM =  "https://unpkg.com/react-dom@16.6.3/umd/react-dom.development";
requirejs.config({
  paths: {
    react: REACT_PATH,
    "react-dom": REACT_DOM
  }
});
define([REACT_PATH, REACT_DOM], function(react, reactDOM, redux) {
  return {};
});
