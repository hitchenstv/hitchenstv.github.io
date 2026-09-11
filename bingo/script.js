let allPredictions = [];

function loadDefaultPredictions() {
    fetch('predictions.txt')
        .then(response => {
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            return response.text();
        })
        .then(text => {
            const predictions = new Set();
            
            const allParts = text.split(/;|\n/).map(p => p.trim()).filter(p => p.length > 0);
            
            allParts.forEach(part => {
                const pred = part.trim();
                if (pred && pred.length > 0) {
                    predictions.add(pred);
                }
            });
            
            allPredictions = Array.from(predictions);
            console.log('Loaded ' + allPredictions.length + ' default predictions');
        })
        .catch(err => {
            console.error('Error loading predictions.txt:', err);
            console.log('Using fallback predictions list');
            allPredictions = [
                "WoW: Camelot",
                "WoW: Forever",
                "Classic Plus",
                "WoW2",
                "Name not from leak",
                "September Release",
                "October Release",
                "November Release",
                "December Release",
                "Early 2027 Release",
                "Release after Q1 2027",
                "Premise: Vanilla but portal never opens",
                "Premise: Killing Kazzak > No portal",
                "Premise: Phylactery destroyed > No portal",
                "Old timeline (~Warcraft 2)",
                "Avaloren",
                "Brand new setting",
                "Classic-client",
                "Retail/Modern-client",
                "Old/New models",
                "Model look can be toggled",
                "Dual Spec",
                "Old talents (mostly)",
                "New talent row",
                "Brand new talent trees",
                "High Elves",
                "Neutral race (like High Elves)",
                "Ogres",
                "Blood Elves",
                "Necromancer Class",
                "Tinker Class",
                "Northrend",
                "Gilneas",
                "Uldum",
                "\"Cataclysm Light\" has happened",
                "Strath is UD capital",
                "Lordaeron is Human",
                "40 man raids",
                "25 man raids",
                "Flex Raids (25-40)",
                "5 man Molten Core",
                "Karazhan",
                "Scarlet Enclave",
                "Alcaz Island",
                "Stormwind Vault",
                "Timbermaw",
                "AQ Is final raid",
                "Azshara Crater BG",
                "Seasonal Realms: Permanent Realms: Seasonal Realms that become permanent at end of season",
                "Hardcore Mode",
                "OnlyFangs announced (might be day 2)",
                "Sub in Xbox Game Pass",
                "New unified Bnet",
                "Same old sub options",
                "Box fee for access",
                "Free with sub"
            ];
        });
}

loadDefaultPredictions();
let customPredictions = [];
let selectedPredictions = [];
let bingoGrid = [];

function init() {
    loadFromUrl();
    renderPredictionsList();
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    
    const selectedParams = params.get('selected');
    if (selectedParams) {
        selectedPredictions = selectedParams.split(',').filter(p => p.trim());
    }
    
    const markedParams = params.get('marked');
    if (markedParams) {
        bingoGrid = [];
        const markedIds = new Set(markedParams.split(',').map(id => parseInt(id)));
        for (let i = 0; i < 25; i++) {
            bingoGrid.push({
                text: i === 12 ? 'FREE' : selectedPredictions[i],
                isFree: i === 12,
                marked: markedIds.has(i),
                index: i
            });
        }
    }
}

function saveToUrl() {
    const params = new URLSearchParams();
    
    if (selectedPredictions.length > 0) {
        params.set('selected', selectedPredictions.join(','));
    }
    
    const markedIndices = bingoGrid
        .filter(cell => cell.marked && !cell.isFree)
        .map(cell => cell.index);
    
    if (markedIndices.length > 0) {
        params.set('marked', markedIndices.join(','));
    }
    
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newUrl);
    
    alert('Saved to URL! Share this link with others.');
}

function clearAll() {
    selectedPredictions = [];
    bingoGrid = [];
    customPredictions = [];
    document.getElementById('predictionInput').value = '';
    document.getElementById('selectedCount').textContent = '0';
    document.getElementById('markedCount').textContent = '0';
    document.getElementById('bingoStatus').textContent = '';
    document.getElementById('bingoStatus').className = 'bingo-status';
    document.getElementById('bingoSection').style.display = 'none';
    renderPredictionsList();
    renderBingoCard();
}

function renderPredictionsList() {
    const container = document.getElementById('predictionsList');
    container.innerHTML = '';
    
    const totalPredictions = [...allPredictions, ...customPredictions];
    document.getElementById('totalCount').textContent = totalPredictions.length;
    document.getElementById('selectedCount').textContent = selectedPredictions.length;
    
    totalPredictions.forEach((prediction, index) => {
        const isSelected = selectedPredictions.includes(prediction);
        const item = document.createElement('div');
        item.className = 'prediction-item' + (isSelected ? ' selected' : '');
        
        item.innerHTML = `
            <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelection('${escapeHtml(prediction)}')">
            <span class="prediction-text">${escapeHtml(prediction)}</span>
            <button class="remove-btn" onclick="removePrediction('${escapeHtml(prediction)}')">Remove</button>
        `;
        
        container.appendChild(item);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function toggleSelection(prediction) {
    const index = selectedPredictions.indexOf(prediction);
    if (index > -1) {
        selectedPredictions.splice(index, 1);
    } else {
        selectedPredictions.push(prediction);
    }
    
    selectedPredictions.sort();
    
    document.getElementById('selectedCount').textContent = selectedPredictions.length;
    document.getElementById('generateBtn').disabled = selectedPredictions.length < 24;
    renderPredictionsList();
}

function removePrediction(prediction) {
    const index = selectedPredictions.indexOf(prediction);
    if (index > -1) {
        selectedPredictions.splice(index, 1);
        document.getElementById('selectedCount').textContent = selectedPredictions.length;
        document.getElementById('generateBtn').disabled = selectedPredictions.length < 24;
        renderPredictionsList();
    }
}

function addCustomPrediction() {
    const input = document.getElementById('customPredictionInput');
    const prediction = input.value.trim();
    
    if (!prediction) {
        alert('Please enter a prediction!');
        return;
    }
    
    const allPredictionsList = [...allPredictions, ...customPredictions];
    
    if (allPredictionsList.includes(prediction)) {
        alert('This prediction already exists!');
        return;
    }
    
    customPredictions.push(prediction);
    input.value = '';
    renderPredictionsList();
}

function generateBingoCard() {
    if (selectedPredictions.length < 24) {
        alert('Please select at least 24 predictions for a complete 5x5 bingo card (25 items including free space)');
        return;
    }
    
    const shuffled = shuffleArray(selectedPredictions);
    
    bingoGrid = [];
    for (let i = 0; i < 25; i++) {
        bingoGrid.push({
            text: i === 12 ? 'FREE' : shuffled[i],
            isFree: i === 12,
            marked: false,
            index: i
        });
    }
    
    renderBingoCard();
    
    document.getElementById('bingoSection').style.display = 'block';
    document.getElementById('bingoSection').scrollIntoView({ behavior: 'smooth' });
}

function renderBingoCard() {
    const card = document.getElementById('bingoCard');
    card.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'bingo-grid';
    
    bingoGrid.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'bingo-cell';
        cellDiv.textContent = cell.text;
        
        if (cell.isFree) {
            cellDiv.classList.add('free');
        }
        
        if (cell.marked) {
            cellDiv.classList.add('marked');
        }
        
        cellDiv.onclick = () => toggleMark(index);
        grid.appendChild(cellDiv);
    });
    
    card.appendChild(grid);
    updateStats();
}

function toggleMark(index) {
    bingoGrid[index].marked = !bingoGrid[index].marked;
    renderBingoCard();
    checkForBingo();
}

function toggleMarkAll() {
    const allMarked = bingoGrid.every(cell => cell.marked || cell.isFree);
    
    bingoGrid.forEach(cell => {
        if (!cell.isFree) {
            cell.marked = !allMarked;
        }
    });
    
    renderBingoCard();
    checkForBingo();
}

function updateStats() {
    const markedCount = bingoGrid.filter(cell => cell.marked && !cell.isFree).length;
    const totalCount = 25;
    
    document.getElementById('markedCount').textContent = markedCount;
    document.getElementById('cardTotal').textContent = totalCount;
    
    let bingo = checkForBingo();
    const statusEl = document.getElementById('bingoStatus');
    statusEl.textContent = bingo ? '🎉 BINGO! 5 in a row! 🎉' : '';
    statusEl.className = 'bingo-status' + (bingo ? ' bingo-found' : '');
}

function checkForBingo() {
    let bingo = false;
    
    for (let i = 0; i < 5; i++) {
        let rowBingo = true;
        for (let j = 0; j < 5; j++) {
            if (!bingoGrid[i * 5 + j].marked) {
                rowBingo = false;
                break;
            }
        }
        if (rowBingo) bingo = true;
    }
    
    for (let i = 0; i < 5; i++) {
        let colBingo = true;
        for (let j = 0; j < 5; j++) {
            if (!bingoGrid[j * 5 + i].marked) {
                colBingo = false;
                break;
            }
        }
        if (colBingo) bingo = true;
    }
    
    let diag1Bingo = true;
    for (let i = 0; i < 5; i++) {
        if (!bingoGrid[i * 5 + i].marked) {
            diag1Bingo = false;
            break;
        }
    }
    if (diag1Bingo) bingo = true;
    
    let diag2Bingo = true;
    for (let i = 0; i < 5; i++) {
        if (!bingoGrid[i * 5 + (4 - i)].marked) {
            diag2Bingo = false;
            break;
        }
    }
    if (diag2Bingo) bingo = true;
    
    if (bingo) {
        alert('🎉 BINGO! You have 5 in a row! 🎉');
    }
    
    return bingo;
}

function randomizeBingo() {
    if (selectedPredictions.length < 24) {
        alert('Please select at least 24 predictions first!');
        return;
    }
    
    const shuffled = shuffleArray(selectedPredictions);
    
    bingoGrid = [];
    for (let i = 0; i < 25; i++) {
        bingoGrid.push({
            text: i === 12 ? 'FREE' : shuffled[i],
            isFree: i === 12,
            marked: false,
            index: i
        });
    }
    
    renderBingoCard();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function saveAsImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const cellSize = 120;
    const padding = 30;
    const gap = 10;
    const gridWidth = 5 * (cellSize + gap) + padding * 2;
    const gridHeight = 5 * (cellSize + gap) + padding * 2;
    
    canvas.width = gridWidth;
    canvas.height = gridHeight;
    
    const gradient = ctx.createLinearGradient(0, 0, gridWidth, gridHeight);
    gradient.addColorStop(0, '#2d3436');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gridWidth, gridHeight);
    
    ctx.strokeStyle = '#e94560';
    ctx.lineWidth = 5;
    ctx.strokeRect(padding - 2, padding - 2, gridWidth + 4, gridHeight + 4);
    
    const textPadding = 15;
    const fontSize = 14;
    
    bingoGrid.forEach((cell, index) => {
        const x = padding + (index % 5) * (cellSize + gap);
        const y = padding + Math.floor(index / 5) * (cellSize + gap);
        
        if (cell.isFree) {
            const freeGradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
            freeGradient.addColorStop(0, '#00b894');
            freeGradient.addColorStop(1, '#55efc4');
            ctx.fillStyle = freeGradient;
        } else if (cell.marked) {
            const markedGradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
            markedGradient.addColorStop(0, '#e17055');
            markedGradient.addColorStop(1, '#d63031');
            ctx.fillStyle = markedGradient;
        } else {
            ctx.fillStyle = '#6c5ce7';
        }
        
        ctx.beginPath();
        ctx.roundRect(x + 5, y + 5, cellSize - 10, cellSize - 10, 8);
        ctx.fill();
        
        ctx.fillStyle = cell.isFree || cell.marked ? '#ffffff' : '#000000';
        ctx.font = `${fontSize}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let text = cell.text;
        if (text.length > 20) {
            text = text.substring(0, 18) + '...';
        }
        ctx.fillText(text, x + cellSize / 2, y + cellSize / 2);
    });
    
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Blizzcon 2026 Bingo', gridWidth / 2, 25);
    
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('Classic Plus Predictions', gridWidth / 2, 45);
    
    const link = document.createElement('a');
    link.download = 'blizzcon-bingo.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
}

function printBingo() {
    window.print();
}

window.addEventListener('DOMContentLoaded', init);
console.log('🎮 Blizzcon Bingo App Ready!');
