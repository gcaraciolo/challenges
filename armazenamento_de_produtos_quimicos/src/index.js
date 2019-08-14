const fs = require('fs');

const { parseContainers, parseProducts } = require('./parser');

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

const explosivos = products.filter(product => product.characteristic === 'EXPLOSIVO' && product.containerType === 'BLINDADO');
const volateis = products.filter(product => product.characteristic === 'VOLATEL' && product.containerType === 'VENTILADO');

const blindados = containers.filter(container => container.name === 'BLINDADO');
const ventilados = containers.filter(container => container.name === 'VENTILADO');
const basicos = containers.filter(container => container.name === 'BASICO');

armazernarProdutosEmContainers(volateis, ventilados);
armazernarProdutosEmContainers(explosivos, blindados);
armazernarProdutosEmContainers(getLeftOvers(getStored()), containers);

function armazernarProdutosEmContainers(products , containers) {
    products.forEach(product => {
        for(let i = 0; i < containers.length; i++) {
            if (containers[i].store(product)) break;
        }
    });
}

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

function getStored() {
    const stored = [];
    [...blindados, ...basicos, ...ventilados].forEach(c => {
        c.products.forEach(p => {
            stored.push(p);
        })
    });

    return stored;
}

function getLeftOvers(stored) {
    return products.filter(p => !stored.map(s => s.name).includes(p.name));
}

logResult();
