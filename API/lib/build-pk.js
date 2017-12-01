const {
  toLower,
  trim,
  replace,
  concat,
  compose,
  split,
  join,
  reject
} = require('ramda')
module.exports = (prefix, value) => {
  valueArr = split(value)

  return compose(concat(prefix), trim, toLower)(value)
}
