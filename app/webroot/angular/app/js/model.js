"use strict";

// http://blog.xebia.fr/2013/06/10/javascript-retour-aux-bases-constructeur-prototype-et-heritage/

// definiting the base constructor for all classes, which will execute the final class prototype's initialize method if exists
var Class = function() {
    this.initialize && this.initialize.apply(this, arguments);
};

Class.extend = function(childPrototype) { // defining a static method 'extend'
    var parent = this;
    var child = function() { // the child constructor is a call to its parent's
        return parent.apply(this, arguments);
    };
    child.extend = parent.extend; // adding the extend method to the child class
    var Surrogate = function() {}; // surrogate "trick" as seen previously
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
    for(var key in childPrototype){
        child.prototype[key] = childPrototype[key];
    }
    return child; // returning the child class
};

/*
var ClassNew = Class.extend({
	initialize : function() { // initialize is called by constructor at instanciation.
		this.numberOfLegs = 4;
	},
	test: function() { console.info("test working"); },	
}
*/