class Container {
    constructor(name){
        this.name = name;
        this.products = [];
    }

    store(product) {
        if (this.isFull()) return false;
        if (this.hasRestriction(product.containerType)) return false;
        this.products.push(product);
        return true;
    }

    hasRestriction(containerType) {
        return this.products.filter(product => {
            return containerType.includes(product.characteristic);
        }).length > 0;
    }

    isFull() {
        return this.products.length === 5;
    }

    hasStored(product) {
        return this.products.includes(product);
    }
}

module.exports = Container;