// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodID = 0

class Neighborhood() {
  constructor(name) {
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodID === this.id
      }.bind(this)
    );
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodID === this.id
      }
    );
  }


}
