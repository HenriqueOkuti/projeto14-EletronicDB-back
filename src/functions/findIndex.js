export default function findIndex(newItem, userCart) {
  let index = -1;
  let i = 0;

  while (i < userCart.length) {
    if (userCart[i].idItem === newItem.idItem) {
      index = i;
      break;
    }
    i++;
  }

  return index;
}
