// Game State
let gameState = {
    beans: 0,
    beansPerClick: 1,
    beansPerSecond: 0,
    upgrades: {
        // Clicking upgrades
        cursor: { count: 0, baseCost: 10, multiplier: 1.2, clickBonus: 0.05 },
        cursor2: { count: 0, baseCost: 30, multiplier: 1.25, clickBonus: 0.1 },
        reinforcedFinger: { count: 0, baseCost: 100, multiplier: 1.25, clickBonus: 0.3 },
        ironFist: { count: 0, baseCost: 250, multiplier: 1.3, clickBonus: 0.7 },
        goldenTouch: { count: 0, baseCost: 800, multiplier: 1.3, clickBonus: 1.5 },
        diamondHand: { count: 0, baseCost: 2500, multiplier: 1.35, clickBonus: 3 },
        titanicGrip: { count: 0, baseCost: 8000, multiplier: 1.35, clickBonus: 6 },
        cosmicPointer: { count: 0, baseCost: 25000, multiplier: 1.35, clickBonus: 12 },
        divineClick: { count: 0, baseCost: 80000, multiplier: 1.4, clickBonus: 25 },
        omnipotentTouch: { count: 0, baseCost: 250000, multiplier: 1.4, clickBonus: 50 },
        infiniteFinger: { count: 0, baseCost: 800000, multiplier: 1.4, clickBonus: 100 },
        universalClicker: { count: 0, baseCost: 2500000, multiplier: 1.4, clickBonus: 200 },
        quantumHand: { count: 0, baseCost: 8000000, multiplier: 1.45, clickBonus: 400 },
        // Production upgrades
        seedling: { count: 0, baseCost: 25, multiplier: 1.2, production: 0.05 },
        grandma: { count: 0, baseCost: 80, multiplier: 1.25, production: 0.15 },
        gardener: { count: 0, baseCost: 200, multiplier: 1.25, production: 0.4 },
        farm: { count: 0, baseCost: 600, multiplier: 1.25, production: 0.8 },
        greenhouse: { count: 0, baseCost: 1800, multiplier: 1.25, production: 2 },
        factory: { count: 0, baseCost: 5000, multiplier: 1.25, production: 5 },
        plantation: { count: 0, baseCost: 15000, multiplier: 1.25, production: 12 },
        mine: { count: 0, baseCost: 45000, multiplier: 1.25, production: 28 },
        biolab: { count: 0, baseCost: 130000, multiplier: 1.25, production: 65 },
        megafarm: { count: 0, baseCost: 400000, multiplier: 1.25, production: 150 },
        continent: { count: 0, baseCost: 1200000, multiplier: 1.25, production: 350 },
        planet: { count: 0, baseCost: 3600000, multiplier: 1.25, production: 800 },
        galaxy: { count: 0, baseCost: 11000000, multiplier: 1.25, production: 1800 },
        // Advanced upgrades
        alchemist: { count: 0, baseCost: 50000, multiplier: 1.25, production: 22 },
        wizard: { count: 0, baseCost: 150000, multiplier: 1.25, production: 50 },
        sorcerer: { count: 0, baseCost: 450000, multiplier: 1.25, production: 120 },
        portal: { count: 0, baseCost: 1300000, multiplier: 1.25, production: 280 },
        dimensionalRift: { count: 0, baseCost: 4000000, multiplier: 1.25, production: 650 },
        timeMachine: { count: 0, baseCost: 12000000, multiplier: 1.25, production: 1500 },
        quantumComputer: { count: 0, baseCost: 36000000, multiplier: 1.25, production: 3500 },
        blackHole: { count: 0, baseCost: 110000000, multiplier: 1.25, production: 8000 },
        multiverse: { count: 0, baseCost: 330000000, multiplier: 1.25, production: 18000 },
        realityBender: { count: 0, baseCost: 1000000000, multiplier: 1.25, production: 42000 },
        godMode: { count: 0, baseCost: 3000000000, multiplier: 1.25, production: 95000 },
        transcendence: { count: 0, baseCost: 9000000000, multiplier: 1.25, production: 220000 },
        infinity: { count: 0, baseCost: 27000000000, multiplier: 1.25, production: 500000 }
    }
};

// DOM Elements
const beanButton = document.getElementById('beanButton');
const beanCountDisplay = document.getElementById('beanCount');
const beansPerSecondDisplay = document.getElementById('beansPerSecond');
const beansPerClickDisplay = document.getElementById('beansPerClick');
const clickEffectContainer = document.getElementById('clickEffect');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');
const buyButtons = document.querySelectorAll('.buy-button');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize game
function init() {
    loadGame();
    updateDisplay();
    updateUpgradeButtons();
    
    // Production loop (passive beans per second)
    setInterval(() => {
        gameState.beans += gameState.beansPerSecond / 10;
        updateDisplay();
        updateUpgradeButtons();
    }, 100); // Update 10 times per second for smooth animation
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
}

// Bean click handler
beanButton.addEventListener('click', (e) => {
    gameState.beans += gameState.beansPerClick;
    updateDisplay();
    updateUpgradeButtons();
    
    // Create floating text effect
    createClickEffect(e);
    
    // Button animation
    beanButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        beanButton.style.transform = '';
    }, 100);
});

// Create floating text effect on click
function createClickEffect(e) {
    const rect = beanButton.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.textContent = `+${gameState.beansPerClick}`;
    clickText.style.left = `${x}px`;
    clickText.style.top = `${y}px`;
    
    clickEffectContainer.appendChild(clickText);
    
    // Remove after animation
    setTimeout(() => {
        clickText.remove();
    }, 1000);
}

// Calculate current cost of an upgrade
function getUpgradeCost(upgradeType) {
    const upgrade = gameState.upgrades[upgradeType];
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.count));
}

// Calculate beans per second
function calculateBeansPerSecond() {
    let total = 0;
    Object.keys(gameState.upgrades).forEach(upgradeType => {
        const upgrade = gameState.upgrades[upgradeType];
        if (upgrade.production) {
            total += upgrade.count * upgrade.production;
        }
    });
    return total;
}

// Calculate beans per click
function calculateBeansPerClick() {
    let total = 1; // Base click value
    Object.keys(gameState.upgrades).forEach(upgradeType => {
        const upgrade = gameState.upgrades[upgradeType];
        if (upgrade.clickBonus) {
            total += upgrade.count * upgrade.clickBonus;
        }
    });
    return total;
}

// Update display
function updateDisplay() {
    beanCountDisplay.textContent = gameState.beans.toFixed(1);
    beansPerSecondDisplay.textContent = gameState.beansPerSecond.toFixed(1);
    beansPerClickDisplay.textContent = gameState.beansPerClick.toFixed(1);
    
    // Update upgrade counts and costs
    Object.keys(gameState.upgrades).forEach(upgradeType => {
        const upgrade = gameState.upgrades[upgradeType];
        const cost = getUpgradeCost(upgradeType);
        
        document.getElementById(`cost-${upgradeType}`).textContent = cost.toLocaleString();
        document.getElementById(`owned-${upgradeType}`).textContent = upgrade.count;
    });
}

// Update upgrade button states
function updateUpgradeButtons() {
    buyButtons.forEach(button => {
        const upgradeType = button.getAttribute('data-upgrade');
        const cost = getUpgradeCost(upgradeType);
        const card = button.closest('.upgrade-card');
        
        if (gameState.beans >= cost) {
            button.disabled = false;
            card.classList.remove('disabled');
        } else {
            button.disabled = true;
            card.classList.add('disabled');
        }
    });
}

// Buy upgrade handler
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const upgradeType = button.getAttribute('data-upgrade');
        const cost = getUpgradeCost(upgradeType);
        
        if (gameState.beans >= cost) {
            gameState.beans -= cost;
            gameState.upgrades[upgradeType].count++;
            
            // Recalculate stats
            gameState.beansPerSecond = calculateBeansPerSecond();
            gameState.beansPerClick = calculateBeansPerClick();
            
            updateDisplay();
            updateUpgradeButtons();
            
            // Button feedback
            button.textContent = 'Bought!';
            setTimeout(() => {
                button.textContent = 'Buy';
            }, 300);
        }
    });
});

// Save game to localStorage
function saveGame() {
    localStorage.setItem('beanClickerSave', JSON.stringify(gameState));
    
    // Visual feedback
    saveButton.textContent = '✅ Saved!';
    setTimeout(() => {
        saveButton.textContent = '💾 Save Game';
    }, 1000);
}

// Load game from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('beanClickerSave');
    if (savedGame) {
        try {
            const loadedState = JSON.parse(savedGame);
            // Merge with default state to handle new properties
            gameState = { ...gameState, ...loadedState };
            // Ensure nested objects are properly merged
            gameState.upgrades = { ...gameState.upgrades, ...loadedState.upgrades };
            
            // Recalculate derived stats
            gameState.beansPerSecond = calculateBeansPerSecond();
            gameState.beansPerClick = calculateBeansPerClick();
        } catch (e) {
            console.error('Failed to load save game:', e);
        }
    }
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
        localStorage.removeItem('beanClickerSave');
        
        // Reset game state
        gameState = {
            beans: 0,
            beansPerClick: 1,
            beansPerSecond: 0,
            upgrades: {
                // Clicking upgrades
                cursor: { count: 0, baseCost: 10, multiplier: 1.2, clickBonus: 0.05 },
                cursor2: { count: 0, baseCost: 30, multiplier: 1.25, clickBonus: 0.1 },
                reinforcedFinger: { count: 0, baseCost: 100, multiplier: 1.25, clickBonus: 0.3 },
                ironFist: { count: 0, baseCost: 250, multiplier: 1.3, clickBonus: 0.7 },
                goldenTouch: { count: 0, baseCost: 800, multiplier: 1.3, clickBonus: 1.5 },
                diamondHand: { count: 0, baseCost: 2500, multiplier: 1.35, clickBonus: 3 },
                titanicGrip: { count: 0, baseCost: 8000, multiplier: 1.35, clickBonus: 6 },
                cosmicPointer: { count: 0, baseCost: 25000, multiplier: 1.35, clickBonus: 12 },
                divineClick: { count: 0, baseCost: 80000, multiplier: 1.4, clickBonus: 25 },
                omnipotentTouch: { count: 0, baseCost: 250000, multiplier: 1.4, clickBonus: 50 },
                infiniteFinger: { count: 0, baseCost: 800000, multiplier: 1.4, clickBonus: 100 },
                universalClicker: { count: 0, baseCost: 2500000, multiplier: 1.4, clickBonus: 200 },
                quantumHand: { count: 0, baseCost: 8000000, multiplier: 1.45, clickBonus: 400 },
                // Production upgrades
                seedling: { count: 0, baseCost: 25, multiplier: 1.2, production: 0.05 },
                grandma: { count: 0, baseCost: 80, multiplier: 1.25, production: 0.15 },
                gardener: { count: 0, baseCost: 200, multiplier: 1.25, production: 0.4 },
                farm: { count: 0, baseCost: 600, multiplier: 1.25, production: 0.8 },
                greenhouse: { count: 0, baseCost: 1800, multiplier: 1.25, production: 2 },
                factory: { count: 0, baseCost: 5000, multiplier: 1.25, production: 5 },
                plantation: { count: 0, baseCost: 15000, multiplier: 1.25, production: 12 },
                mine: { count: 0, baseCost: 45000, multiplier: 1.25, production: 28 },
                biolab: { count: 0, baseCost: 130000, multiplier: 1.25, production: 65 },
                megafarm: { count: 0, baseCost: 400000, multiplier: 1.25, production: 150 },
                continent: { count: 0, baseCost: 1200000, multiplier: 1.25, production: 350 },
                planet: { count: 0, baseCost: 3600000, multiplier: 1.25, production: 800 },
                galaxy: { count: 0, baseCost: 11000000, multiplier: 1.25, production: 1800 },
                // Advanced upgrades
                alchemist: { count: 0, baseCost: 50000, multiplier: 1.25, production: 22 },
                wizard: { count: 0, baseCost: 150000, multiplier: 1.25, production: 50 },
                sorcerer: { count: 0, baseCost: 450000, multiplier: 1.25, production: 120 },
                portal: { count: 0, baseCost: 1300000, multiplier: 1.25, production: 280 },
                dimensionalRift: { count: 0, baseCost: 4000000, multiplier: 1.25, production: 650 },
                timeMachine: { count: 0, baseCost: 12000000, multiplier: 1.25, production: 1500 },
                quantumComputer: { count: 0, baseCost: 36000000, multiplier: 1.25, production: 3500 },
                blackHole: { count: 0, baseCost: 110000000, multiplier: 1.25, production: 8000 },
                multiverse: { count: 0, baseCost: 330000000, multiplier: 1.25, production: 18000 },
                realityBender: { count: 0, baseCost: 1000000000, multiplier: 1.25, production: 42000 },
                godMode: { count: 0, baseCost: 3000000000, multiplier: 1.25, production: 95000 },
                transcendence: { count: 0, baseCost: 9000000000, multiplier: 1.25, production: 220000 },
                infinity: { count: 0, baseCost: 27000000000, multiplier: 1.25, production: 500000 }
            }
        };
        
        updateDisplay();
        updateUpgradeButtons();
        
        // Visual feedback
        resetButton.textContent = '✅ Reset!';
        setTimeout(() => {
            resetButton.textContent = '🔄 Reset Game';
        }, 1000);
    }
}

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

// Event listeners for save and reset
saveButton.addEventListener('click', saveGame);
resetButton.addEventListener('click', resetGame);

// Initialize game when page loads
init();
