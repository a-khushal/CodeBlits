import { Problem } from "../../../types/problem";

export const mockProblem: Problem = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  createdAt: '2024-03-15T10:00:00Z',
  slug: 'two-sum',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 104',
    '-109 <= nums[i] <= 109',
    '-109 <= target <= 109',
    'Only one valid answer exists.'
  ],
  starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
    
}`,
  handlerFunction: `function handle(fn, nums, target) {
    return fn(nums, target);
}`
};