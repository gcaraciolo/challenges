class Container {
    constructor(name){
        this.name = name;
        this.products = [];
    }

    store(product) {
        if (this.isFull()) return false;
        
        this.products.push(product);
        return true;
    }

    isFull() {
        return this.products.length === 5;
    }

    hasStored(product) {
        return this.products.includes(product);
    }
}

module.exports = Container;