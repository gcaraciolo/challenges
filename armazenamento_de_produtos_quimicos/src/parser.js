const Product = require('./product');
const Container = require('./container');
module.exports = {
    parseContainers(inputContainers) {
        return inputContainers.map(container => {
            const name = container.split('\n')[0];
            return new Container(name);
        });
    },    
    parseProducts(inputProducts) {
        return inputProducts.map(product => {
            const name = product.split(':')[0];
            const characteristic = product.split(':')[1].split('+')[0];
            const containerType = product.split(':')[1].split('+')[1];
            return new Product(name, characteristic, containerType);
        });
    }
};