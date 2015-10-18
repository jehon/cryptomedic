'use strict';

describe('Class', function() {
	it('should work as "expect"ed', function() {
		var Person = Class.extend({
			  init: function(isDancing){
			    this.dancing = isDancing;
			  },
			  dance: function(){
			    return this.dancing;
			  }
			});

		var Ninja = Person.extend({
			  init: function(){
			    this._super( false );
			  },
			  dance: function(){
			    // Call the inherited version of dance()
			    return this._super();
			  },
			  swingSword: function(){
			    return true;
			  }
			});

		var p = new Person(true);
		var n = new Ninja();
		
		expect(p.dance()).toBeTruthy();
		expect(n.dance()).toBe(false);
		expect(n.swingSword()).toBeTruthy();
		expect(p instanceof Person).toBeTruthy();
		expect(p instanceof Class).toBeTruthy();
		expect(n instanceof Ninja).toBeTruthy();
		expect(n instanceof Person).toBeTruthy();
		expect(n instanceof Class).toBeTruthy();
	});
});
