import fs, { readFileSync } from 'fs';

//dataToObj is a function that reads a csv file and stores the data read on it inside an array to be sent to the server database
export default function dataToObj() {
  //data reads the file and stores it
  let data = readFileSync('data.csv', 'utf8');
  //we then turn it into an array by splitting by line
  data = data.split('\r\n');

  //after treatment, products are going to be stored inside productArray
  const productArray = [];

  //this is the basic pattern of a product to be stored inside productArray
  const product = {
    name: '',
    value: '',
    id: '',
    promotion: '',
    promotion_percentage: '',
    image_main: '',
    description: '',
    type: '',
  };

  //Read line by line of the csv file
  for (let i of data) {
    //csv data is split using the comma by default
    const line = i.split(',');

    //create new object based on the basic pattern and data from the line
    //const newProduct = { ...product };
    const newProduct = {
      ...product,
      name: line[0],
      value: line[1],
      id: line[2],
      promotion: line[3],
      promotion_percentage: line[4],
      image_main: line[5],
      description: line[6],
      type: line[7],
    };

    productArray.push(newProduct);
  }

  //Product data to be stored is inside productArray, which is the return of the function. Remember to send it to the database when done.
  return productArray;
}
