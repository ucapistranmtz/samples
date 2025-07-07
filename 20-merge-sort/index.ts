//merge sort
const unSortedArray: number[] = [11, 9, 8, 4, 1, 5, 6, 2, 6, 7];

const sort = (array: number[]) => {
  if (array.length <= 1) return array;

  const midIndex = Math.floor(array.length / 2);

  const left: number[] = sort(array.slice(0, midIndex));
  const right: number[] = sort(array.slice(midIndex));

  return merge(left, right);
};

const merge = (left: number[], right: number[]): number[] => {
  let result: number[] = [];
  let i: number = 0;
  let j: number = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
};

console.log(sort(unSortedArray));
