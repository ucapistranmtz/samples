const unsortedElements: number[] = [
  10, 15, 47, 89, 63, 45, 1, 2, 3, 4, 7, 8, 5, 2,
];

function sort(items: number[]): number[] {
  console.log("items", items);
  //find the mid point
  const midIndex = Math.floor(items.length / 2);
  //get the sides

  // base case: if the array has 1 or 0 elements, it's already sorted
  if (items.length <= 1) {
    return items;
  }

  //get the left side and then use a recursive call to divide everything in 2 length
  const left = sort(items.slice(0, midIndex));
  // get the right side and use a recursive call
  const right = sort(items.slice(midIndex));
  //then merge both sides left+right

  return merge(left, right);
}

const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];
  let i = 0,
    j = 0;

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
