const sort = (array: number[]): number[] => {
  if (array.length <= 1) return array;

  const midPoint = Math.floor(array.length / 2);

  const left = sort(array.slice(0, midPoint));
  const right = sort(array.slice(midPoint));

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

const unSortedArray: number[] = [2, 4, 7, 8, 9, 12, 14, 15, 76];

console.log(sort(unSortedArray));
