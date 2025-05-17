/*
We should find a code to draw a pine tree.
like the o ne below
   *
  ***
 *****
*******
  |||
*/

const chalk = require("chalk");

const pineTree = (height) => {

  console.log(`Drawing a pine tree of height of ${height}`);

  const space = " ";
  const star = "*";
  const trunk = "|||";

  // Draw the tree 
  for (let i = 0; i < height; i++) {
    // Calculate the number of spaces and stars for each row
    const spaces = space.repeat(height - i - 1);
    const stars = star.repeat(2 * i + 1);

    if (i == 0) {
      console.log(chalk.yellow(`${spaces}${stars}${spaces}`));
    } else { 
        console.log(chalk.green(`${spaces}${stars}${spaces}`));
    }
  }

  console.log(chalk.red(`${space.repeat(height - 2) + trunk}`));
  return "this was the pine tree ";
};

console.log(pineTree(10));
