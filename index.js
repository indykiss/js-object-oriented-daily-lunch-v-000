// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodID === this.id;
      }.bind(this);
    );
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodID === this.id;
      }.bind(this);
    );
  }

  meals() {
    let deliveries = this.deliveries();
    let result = [];
    for (let i = 0; i < deliveries.length; i++) {
      if (result.includes(deliveries[i].meal()) === false) {
        result.push(deliveries[i].meal());
      }
    }
    return result;
  }
}


let customerID = 0;

class Customer {
  constructor(name, neighboorhoodID) {
    this.id = ++customerID;
    this.name = name;
    this.neighboorhoodID = neighboorhoodID;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerID === this.id;
      }.bind(this);
    );
  }

  meals() {
    let deliveries = this.deliveries();
    let result = [];
    for (let i = 0; i < deliveries.length; i++) {
      result.push(deliveries[i].meal());
    }
    return result;
  }

  totalSpent() {
    let result = 0;
    let prices = [];
    for (let i = 0; i < this.meals().length; i++) {
      prices.push(this.meals()[i].price);
    }
    const add = (a,b) =>
      a+b
    result = prices.reduce(add);
    return result;
  }
}


let mealID = 0;
class Meal {

  constructor(title,price) {
    this.is = ++mealID;
    this.title = title;
    this.price = Number(price);
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.meal() === this;
      }.bind(this)
    );
  }

  customers() {
    let deliveries = this.deliveries();
    let result = [];
    for (let i = 0; i < deliveries.length; i++) {
      result.push(deliveries[i].customer());
    }
    return result;
  }

  static byPrice() {
    let sortedMeals = store.meals.sort((a,b) => (a.price> b.price) ? -1: 1);
    return sortedMeals;
  }
}


let deliveryID = 0;
class Delivery {

  constructor(mealID, neighborhoodID, customerID) {
    this.id = ++ deliveryID;
    this.mealID = mealID;
    this.neighborhoodID = neighborhoodID;
    this.customerID = customerID;
    store.deliveries.push(this);

  }




}
