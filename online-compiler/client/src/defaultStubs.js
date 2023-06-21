const stubs = {

}

stubs.cpp = `
#include<stdio.h>
#include<iostream>
int main(){
    printf("Hello Minh Triet Truong");
    return 0;
}

`

stubs.py = `
print("hello B-!")


`

stubs.js = `const mostFrequentChar = (s) => {
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
  
  console.log(mostFrequentChar('bookeeper'))
  console.log(mostFrequentChar('david'))
  console.log(mostFrequentChar('abby'))
  module.exports = {
    mostFrequentChar,
  }
`

export default stubs