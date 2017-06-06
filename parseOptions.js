module.exports = function(args) {
  var requires = []

  for (var i = 0, l = args.length; i < l; i++) {
    var arg = args[i];
    if (arg == '-r') {
      i++
      requires.push(args[i])
    } else {
      break
    }
  }

  return {
    requires: requires,
    args: args.slice(i)
  }
}
