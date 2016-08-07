var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  },
  extend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  },
  hasProp = {}.hasOwnProperty;



var Duck = function (foo) {
	this.foo = foo || 'baz';
}
Duck.prototype.foo = 'bar';
Duck.prototype.quack = function () {
	console.log("foo = " + this.foo);
}

var Mallard = function (foo) {
	this.foo = '.' + foo;
}
Mallard.prototype.foo = 'asdf';


var duck = new Duck();
var otherDuck = new Mallard('qwer');
duck.quack();
var otherQuack = bind(duck.quack, otherDuck);
otherQuack();