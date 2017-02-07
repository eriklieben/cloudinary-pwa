export default class Shell {
  public product = 
        new Product(
      'Soft style t-shirt (men)', 
      'http://res.cloudinary.com/aurelia/image/upload/v1485611508/t-shirts/men-softstyle-v-neck-purple-aurelia.jpg', 
      '24,-');
}

class Product {
  constructor(public name: string, public photoUri: string, public price: string) {}
}
