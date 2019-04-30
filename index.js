// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {
  constructor(name) {
    this.Id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.Id;
      }.bind(this);
    );
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.Id;
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


let customerId = 0;

class Customer {
  constructor(name, neighboorhoodId) {
    this.Id = ++customerId;
    this.name = name;
    this.neighboorhoodId = neighboorhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.Id;
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


let mealId = 0;
class Meal {

  constructor(title,price) {
    this.is = ++mealId;
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


let deliveryId = 0;
class Delivery {

  constructor(mealId, neighborhoodId, customerId) {
    this.Id = ++ deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.Id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.Id === this.customerId;
      }.bind(this);
    );
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.Id === this.neighborhoodId;
      }.bind(this)
    );
  }

}
