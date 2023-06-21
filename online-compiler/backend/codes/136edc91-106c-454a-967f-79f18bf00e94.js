
const pairedParentheses = (str) => {
  // todo
  // n = length of string
  // Time: O(n)
  // Space: O(1)
  let count = 0
  for (let char of str) {
    if (char === '(') {
      count += 1
    } else if (char === ')'){
      if (count === 0){
        return false
      }
      count -= 1
    }
  }
  
  return count === 0
};

console.log(pairedParentheses("(david)((abby))"))
