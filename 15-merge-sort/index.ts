const unsortedElements: number[] = [
  10, 15, 47, 89, 63, 45, 1, 2, 3, 4, 7, 8, 5, 2,
];

const sort = (numbers: number[]): number[] => {
  if (numbers.length <= 1) return numbers;

  const midIndex = Math.floor(numbers.length / 2);

  const left = sort(numbers.slice(0, midIndex));
  const right = sort(numbers.slice(midIndex));

  return merge(left, right);
};

const merge = (left: number[], right: number[]): number[] => {
  let result: number[] = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
};

console.log(`it should be sorted ${sort(unsortedElements)}`);
