///clasic bubblesort

const unSortedItems = [6, 8, 9, 4, 7, 1, 2]; // it should be 2,4,6,7,8,9

const bubblesort = (items: number[]) => {
  //const sortedItems: number[] = [];

  for (let j = 0; j < items.length - 1; j++) {
    let swapped: boolean = false;

    for (let k = 0; k < items.length - 1 - j; k++) {
      if (items[k] > items[k + 1]) {
        [items[k], items[k + 1]] = [items[k + 1], items[k]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }

  return items;
};

console.log(bubblesort(unSortedItems));
