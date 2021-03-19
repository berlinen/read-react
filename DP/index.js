// function fib (n) {
//   if(n === 0) return 0;
//   if(n === 1 || n === 2) return 1;
//   return fib(n-1) + fib(n-2);
// }

// console.log(fib(2000));
// 备忘录
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
 // 动态规划
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

// 状态压缩
function stateFib(n) {
  if(n === 0) return 0;

  if(n === 1 || n === 2) return 1;

  let pre = 1; // f1
  let current = 1; // f2

  for(let i = 0; i <= n; i++) {
    let sum = pre + current;
    pre = current;
    current = sum
  }

  return current;
}

console.log(stateFib(1111))


// 零钱兑换问题

// 输入 coins = [1, 2, 5] amount 11
// 输出3 5 + 5 + 1
// amount 3 输出 -1

/**
 * base case
 * dp[0] = 0; dp[amount] = 硬币个数
 *
 * 确定状态
 * 状态就是原问题和子问题中变化的变量
 * 由于硬币数量无限， 面额给定，唯一状态就是目标金额amount
 *
 * 确定决策
 * 决策就是导致状态发生变化的行为
 * 每一次选择的硬币面额，就是决策
 *
 * 明确dp数组的定义
 * 一般来说dp数组的索引就是上面所说的状态、
 * dp数组的每个值就是我们要计算的数据
 *
 * dp[amount] = 最少硬币数量
 *
 * 索引我们可以有这样的dp定义 当目标金额为i的时候 至少需要dp[i]个硬币凑出来
 *
 */

function coinChange(coins, amount) {
  // 为什么要初始化amount+1的值
  // 因为我们要凑出amount的目标金额， 所需要的最多的硬币就是amount
  // 所以 amount + 1 是无效的

  let dp = new Array(amount + 1).fill(amount + 1);

  dp[0] = 0;

  for(i = 0; i < dp.length; i++) {
    for(let coin of coins) {
      if( i < coin ) {
        continue;
      }
      // i 为目标金额
      // coin 为当前硬币的面额
      // i- coin 代表上一个状态的金额
      // dp[i - coin]代表上一个状态所需要的硬币数量
      dp[i] = Math.min(dp[i], dp[i-coin] + 1);
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
}

console.log(coinChange([1,2,3,5],21))


// 最长公共子序列
/**
 * 例如
 * babcde => ace 3
 *
 * Lcs Longest Common Subsquence
 *
 * 1. 明确dp数组含义
 *
 * 对于这样的字符串s1， s2 一般要构成这样一个表
 *
 * dp[i][j]的含义是 对于s[1...i]和s2[1....j], 他们的lcs的长度是dp[i][j]
 *
 * dp[2][4]的含义就是 ac 和 babc他们的lcs的长度是2
 *
 * 2. 定义base case
 *
 * dp[i][0] 和 dp[0][i] = 0
 *
 * dp[0][3] '' 和 bab的kcs的长度是 0
 *
 * 3. 确定状态转移方程
 *
 * 对于s1和s2中的每个字符都有什么选择
 * 选1 在lcs中
 * 选2 不存在lcs中
 *
 * 如果谬个字符存在于lcs中 那么这个字符一定同时存在于s1 和 s2 中
 *
 * 我们构建dp表的时候 右下角的值就是所求的答案， 所以我们应该从左到右遍历 来保证一个各自的左侧，左上侧，上册都是被计算过的
 *
 * 做决策的时候， 如果 s1[i] === s2[i] 那么这个字符一定存在于lcs中
 *
 * 如果 s1[i] !== s2[j] 那么s1[i]和s2[j]中至少有一个字符串不存在lcs中， 所以从这两个中取一个最大值
 *
 * Math.max(dep[i-1][j], dp[i][j-1]);
 *
 * 总结
 *
 * 涉及两个字符串或者数组的时候， do数组含义一般差不多
 * 子数组arr[0...i]和子数组arr2[0...j]我们要求的子序列长度dp[i][j]
 */

function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;
  const dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0));

  for(let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
     if(text1[i -1] === text2[j - 1]) {
       dp[i][j] = dp[i - 1][j - 1] + 1;
     } else {
       dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j])
     }
    }
  }

  return dp[n][m];
}