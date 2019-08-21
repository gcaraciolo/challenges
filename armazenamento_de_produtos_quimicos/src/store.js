module.exports = {
    store(products, containers) {
        if (!products || (products && products.length === 0)) throw new Error('Cadê os produtos?');

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

        return { blindados, ventilados, basicos, getStored, getLeftOvers }
    }
}