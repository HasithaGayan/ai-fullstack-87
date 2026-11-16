
export function getProductNames(products) {
  return products.map(product => product.name);
}

export function findProductById(products, id) {
  return products.find(product => product.id === id);
}


export default function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-US")}`;
}
