import fs, { writeFileSync } from 'fs';
import { uniqueNamesGenerator, adjectives } from 'unique-names-generator';
import { RandomPicture } from 'random-picture';
import * as readline from 'readline';

//generateData is a function that randomly generates data to be used on the mock-up for the website
export default async function generateData() {
  //Variations of description: lorem1, lorem2 and lorem3
  const lorem1 =
    'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.';
  const lorem2 =
    'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.';
  const lorem3 =
    'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.';
  //The variations of description are then stored inside an array called lorem
  const lorem = [lorem1, lorem2, lorem3];

  //the data is going to be saved with the following order
  let data = `name,value,id,promotion,image_main,description,type`;

  //how many data entries are generated
  const DATA_LIMIT = 5000;

  for (let i = 0; i < DATA_LIMIT; i++) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(
      `Progress of new data: ${((i / DATA_LIMIT) * 100).toFixed(2)}%`
    );

    //name utilizes the uniqueNamesGenerator for a random adjective of a product
    const name =
      'Product ' + uniqueNamesGenerator({ dictionaries: [adjectives] });

    //value is a random value between 10000 and 50, with fixed precision of 2
    const value = Math.round(Math.random() * (10000 - 50) + 50).toFixed(2);

    //product id is based on iteration number on the for loop
    const id = i;

    //the product has a 50% chance of having a promotion
    const promotion = Math.round(Math.random() * 100) < 50 ? true : false;

    //If the product has a 'true' promotion, then it recieves a random value between 80 and 5
    //representing the percentage of discount. It is a rounded down value.
    const promotion_percentage = promotion
      ? Math.floor(Math.random() * (80 - 5) + 5)
      : 0;

    //the image is generated using the RandomPicture module, repeated images are allowed
    const image = await RandomPicture();

    //after generating a image, the url of said image is stored
    const image_main = image.url;

    //the description of each item are obtained from the array lorem
    //possible values: lorem[0], lorem[1], lorem[2]
    const description = lorem[i % 3];

    //the type of product is based on the iteration number
    //possible values: 1, 2, 3, 4
    const type = (i % 4) + 1;

    //the product is stored on a new line inside the data string
    data += `\r\n${name},${value},${id},${promotion},${promotion_percentage},${image_main},${description},${type}`;
  }

  //we write the data string inside data.csv
  writeFileSync('data.csv', data);
  return true;
}

//runs the generate data function
//generateData();
