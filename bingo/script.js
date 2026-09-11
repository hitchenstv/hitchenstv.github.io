let predictions = [];
let bingoGrid = [];

function parsePredictions() {
    const input = document.getElementById('predictionInput').value;
    const lines = input.trim().split('\n');
    
    predictions = [];
    
    lines.forEach(line => {
        if (line.trim()) {
            const categories = line.split(';');
            
            categories.forEach(category => {
                const trimmed = category.trim();
                if (trimmed) {
                    const options = trimmed.split(',').map(opt => opt.trim());
                    options.forEach(option => {
                        if (option) {
                            predictions.push(option);
                        }
                    });
                }
            });
        }
    });
    
    predictions = [...new Set(predictions)];
    updatePreview();
    generateBingoCard();
}

function updatePreview() {
    const preview = document.getElementById('predictionPreview');
    preview.innerHTML = `
        <h3>📋 Predictions (${predictions.length} items)</h3>
        <ul class="preview-list">
            ${predictions.map((pred, i) => `<li>${i + 1}. ${pred}</li>`).join('')}
        </ul>
    `;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateBingoCard() {
    if (predictions.length < 24) {
        alert('Please enter at least 24 predictions for a complete 5x5 bingo card (25 items including free space)');
        return;
    }
    
    const shuffled = shuffleArray(predictions);
    
    bingoGrid = [];
    for (let i = 0; i < 25; i++) {
        bingoGrid.push({
            text: i === 12 ? 'FREE' : shuffled[i],
            isFree: i === 12,
            marked: false
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
        
        cellDiv.onclick = () => toggleMark(index);
        grid.appendChild(cellDiv);
    });
    
    card.appendChild(grid);
}

function toggleMark(index) {
    bingoGrid[index].marked = !bingoGrid[index].marked;
    renderBingoCard();
    checkForBingo();
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
}

function randomizeBingo() {
    if (predictions.length < 24) {
        alert('Please enter at least 24 predictions first!');
        return;
    }
    
    const shuffled = shuffleArray(predictions);
    
    bingoGrid = [];
    for (let i = 0; i < 25; i++) {
        bingoGrid.push({
            text: i === 12 ? 'FREE' : shuffled[i],
            isFree: i === 12,
            marked: false
        });
    }
    
    renderBingoCard();
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

console.log('🎮 Blizzcon Bingo App Ready!');