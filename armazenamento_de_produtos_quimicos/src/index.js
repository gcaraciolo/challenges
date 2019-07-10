
/**
 * Imports
 */
const { parseContainers, parseProducts } = require('./parser');

/**
 * Function
 */ 
const fs = require('fs');

const getFileContent = () => fs.readFileSync(process.argv[2], 'utf8');

const inputData = getFileContent();

const getInputs = (file, index) => {
    const input = file.split('-----')[index];
    return input.split('\n').filter(x => x);
}

const getInputProducts = file => getInputs(file, 0);

const getInputContainers = file => getInputs(file, 1);

const productData = getInputProducts(inputData);
const containerData = getInputContainers(inputData);


const products = parseProducts(productData);
const containers = parseContainers(containerData);

console.table(products);
console.table(containers);