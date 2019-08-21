const { expect } = require('chai')
const Product = require('../../src/product')
const Container = require('../../src/container')
const { store } = require('../../src/store')

describe('Given a set of products and containers', () => {

    it('should verify if there are products', () => {
        const products = [new Product('a', 'c', 't')];
        const containers = [new Container('t')];

        const fn = () => store(undefined, containers);
        expect(fn).to.throw('Cadê os produtos?');
    });

    it.skip('should safelly store products into containers', () => {
        const products = [new Product('a', 'c', 't')];
        const containers = [new Container('t')];


        expect(containers[0].products).to.be.empty;

        store(products, containers);

        expect(containers[0].products).to.not.be.empty;

        // expect(containers[0].products).to.equals(products)
    });
})