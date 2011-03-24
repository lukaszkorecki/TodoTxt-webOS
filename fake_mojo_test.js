var Mojo = { Test : { passed : 0, failed : 0, total : 0 }};

Mojo.requireEqual = function(one, two, message){
  if(one == two) {
    console.log(message);
    Mojo.Test.passed += 1;
  } else {
    console.error(message, "Expected\n", two, "Got\n", one);
    Mojo.Test.failed += 1;
  }
};

Mojo.run = function(obj) {
  var instance = new obj();
  for(var prop in instance) {
    if(typeof instance[prop] == 'function') {
      instance[prop]();
      Mojo.Test.total += 1;
    }
  }

  console.log("Passed: ", Mojo.Test.passed, " Failed: ", Mojo.Test.failed, " Total: ", Mojo.Test.total);
};
