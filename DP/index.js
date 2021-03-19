// function fib (n) {
//   if(n === 0) return 0;
//   if(n === 1 || n === 2) return 1;
//   return fib(n-1) + fib(n-2);
// }

// console.log(fib(2000));

function fib(n) {
  if(n === 0) return 0;
  let memoryArray = new Array(n + 1).fill(0);

  return fibHelper(memoryArray, n);
 }
 // 去memoryArray查找，如果已有结果，直接返回数组中存的值
 // 如果没找到结果，就递归算一遍，然后存入memoryArray
 function fibHelper(memoryArray, n) {
  if(n === 1 || n === 2) return 1;
  if(!memoryArray[n]) {
    memoryArray[n] = fibHelper(memoryArray, n-1) +  fibHelper(memoryArray, n-2)
  }
  return memoryArray[n];
 }

 function dpFib(n) {
  if(n === 0) return 0;

  let dp = new Array(n+1).fill(0);

  dp[1] = dp[2] = 1;

  for(let i = 3; i <=n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
 }

console.log(dpFib(113))