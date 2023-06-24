class MyClass {
    constructor () {
        console.log("initiate")
    }

    add (arg1, arg2) {
        let result
        result = arg1 + arg2
        return result
    }

    mostFrequentChar = (s) => {
        // todo
        const count = {}
        for (let char of s){
          if (!(char in count)){
            count[char]=0
          } 
          count[char] +=1
        }
        
        let best = null
        for (let char of s){
          if(best === null || count[char] > count[best]){
            best = char
          }
        }
        
        return best
      
      };

   callAnotherFn (arg1, arg2) {
    let result = this.add(arg1, arg2)
    return result
   }

   callTheCallback(callback) {
    callback()
   }
}

module.exports = MyClass