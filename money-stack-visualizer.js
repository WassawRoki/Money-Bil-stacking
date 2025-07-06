/**
 * Money Stack Visualizer
 * Creates a 3D money stack visualization for any dollar amount
 * 
 * Usage:
 * const stackElement = createMoneyStackVisualization(25000, { width: 200, height: 200 });
 * document.getElementById('container').appendChild(stackElement);
 */

function createMoneyStackVisualization(amount, options = {}) {
    const {
        width = 350,
        height = 350,
        imageSrc = 'moneystack.png',
        backgroundColor = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius = '15px',
        border = '3px solid #dee2e6'
    } = options;
    
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${width}px;
        height: ${height}px;
        background: ${backgroundColor};
        border-radius: ${borderRadius};
        border: ${border};
        perspective: 1000px;
        position: relative;
        overflow: hidden;
    `;
    
    const totalBundles = Math.floor(amount / 1000);
    if (totalBundles === 0) {
        container.innerHTML = '<div style="font-size:12px;color:#6c757d;text-align:center">Need $1K+</div>';
        return container;
    }
    
    const positions = calculatePositions(totalBundles);
    const maxX = Math.max(...positions.map(p => p.x), 0);
    const maxY = Math.max(...positions.map(p => p.y), 0);
    const maxZ = Math.max(...positions.map(p => p.z), 0);
    
    const [gridSpacing, isoOffsetX, isoOffsetY, stackHeight] = [30, -0.7, 5, 12.5];
    const centerX = maxX / 2, centerY = maxY / 2;
    
    let minPosX = Infinity, maxPosX = -Infinity, minPosY = Infinity, maxPosY = -Infinity;
    
    positions.forEach(pos => {
        const posX = (pos.x - centerX) * gridSpacing + pos.z * isoOffsetX;
        const posY = (pos.y - centerY) * gridSpacing - pos.z * isoOffsetY - pos.z * stackHeight;
        minPosX = Math.min(minPosX, posX); maxPosX = Math.max(maxPosX, posX);
        minPosY = Math.min(minPosY, posY); maxPosY = Math.max(maxPosY, posY);
    });
    
    const structureWidth = maxPosX - minPosX + 60;
    const structureHeight = maxPosY - minPosY + 45;
    const baseScale = Math.min((width - 20) / structureWidth, (height - 20) / structureHeight);
    
    positions.forEach(pos => {
        const stack = document.createElement('div');
        stack.style.cssText = `
            position: absolute;
            width: 60px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const img = document.createElement('img');
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
        `;
        img.src = imageSrc;
        img.alt = 'Money Stack';
        img.onerror = () => {
            img.style.display = 'none';
            stack.innerHTML = '<div style="font-size:40px;text-align:center">💰</div>';
        };
        
        stack.appendChild(img);
        
        const posX = (pos.x - centerX) * gridSpacing * baseScale + pos.z * isoOffsetX * baseScale;
        const posY = (pos.y - centerY) * gridSpacing * baseScale - pos.z * isoOffsetY * baseScale;
        const posZ = pos.z * stackHeight * baseScale;
        
        stack.style.left = '50%';
        stack.style.top = '50%';
        stack.style.transform = `translate(${posX}px, ${posY - posZ}px) scale(${baseScale})`;
        stack.style.zIndex = pos.z * 1000 + pos.y * 100 + pos.x;
        
        container.appendChild(stack);
    });
    
    return container;
}

function calculatePositions(totalStacks) {
    if (totalStacks === 0) return [];
    
    let cubeSize = 1;
    while (cubeSize ** 3 < totalStacks && cubeSize < 10) cubeSize++;
    
    const positions = [];
    let count = 0;
    
    for (let z = 0; z < cubeSize; z++) {
        for (let y = 0; y < cubeSize; y++) {
            for (let x = 0; x < cubeSize; x++) {
                if (count >= totalStacks) return positions;
                positions.push({ x, y, z });
                count++;
            }
        }
    }
    return positions;
} 
