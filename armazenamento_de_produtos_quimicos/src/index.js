const fs = require('fs');

const { parseContainers, parseProducts } = require('./parser');
const { store } = require('./store')

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

const { blindados, ventilados, basicos, getLeftOvers, getStored } = store(products, containers)


function logResult() {
    console.table(getStored());
    console.table(getLeftOvers(getStored()));

    console.log('**************');

    [...blindados, ...basicos, ...ventilados].forEach(c => {
        console.log(c.name)
        c.products.forEach(p => {
            console.log(p.name);
        })
    
        console.log('------')
    })
}



logResult();
