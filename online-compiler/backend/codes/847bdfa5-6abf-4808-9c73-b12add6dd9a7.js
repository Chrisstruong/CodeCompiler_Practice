const fiveSort = (nums) => {
  // todo
  // n = array length
  // Time: O(n), Space O(1)
    let i = 0
    let j = nums.length - 1
    while(i<=j){
      if (nums[j] === 5) j--
      else if (nums[i]===5) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
        i+=1
      } else i+=1
    }
    return nums
  
};


console.log(fiveSort([12, 5, 1, 5, 12, 7]))
