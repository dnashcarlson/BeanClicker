// Game State
let gameState = {
    beans: 0,
    beansPerClick: 1,
    beansPerSecond: 0,
    upgrades: {
        // Clicking upgrades
        cursor: { count: 0, baseCost: 10, multiplier: 1.2, clickBonus: 0.2 },
        cursor2: { count: 0, baseCost: 30, multiplier: 1.25, clickBonus: 0.5 },
        reinforcedFinger: { count: 0, baseCost: 100, multiplier: 1.25, clickBonus: 1 },
        ironFist: { count: 0, baseCost: 250, multiplier: 1.3, clickBonus: 2 },
        goldenTouch: { count: 0, baseCost: 800, multiplier: 1.3, clickBonus: 4 },
        diamondHand: { count: 0, baseCost: 2500, multiplier: 1.35, clickBonus: 8 },
        titanicGrip: { count: 0, baseCost: 8000, multiplier: 1.35, clickBonus: 16 },
        cosmicPointer: { count: 0, baseCost: 25000, multiplier: 1.35, clickBonus: 32 },
        divineClick: { count: 0, baseCost: 80000, multiplier: 1.4, clickBonus: 64 },
        omnipotentTouch: { count: 0, baseCost: 250000, multiplier: 1.4, clickBonus: 128 },
        infiniteFinger: { count: 0, baseCost: 800000, multiplier: 1.4, clickBonus: 256 },
        universalClicker: { count: 0, baseCost: 2500000, multiplier: 1.4, clickBonus: 512 },
        quantumHand: { count: 0, baseCost: 8000000, multiplier: 1.45, clickBonus: 1024 },
        // Production upgrades
        seedling: { count: 0, baseCost: 25, multiplier: 1.2, production: 0.2 },
        grandma: { count: 0, baseCost: 80, multiplier: 1.25, production: 0.5 },
        gardener: { count: 0, baseCost: 200, multiplier: 1.25, production: 1.2 },
        farm: { count: 0, baseCost: 600, multiplier: 1.25, production: 3 },
        greenhouse: { count: 0, baseCost: 1800, multiplier: 1.25, production: 7 },
        factory: { count: 0, baseCost: 5000, multiplier: 1.25, production: 18 },
        plantation: { count: 0, baseCost: 15000, multiplier: 1.25, production: 45 },
        mine: { count: 0, baseCost: 45000, multiplier: 1.25, production: 110 },
        biolab: { count: 0, baseCost: 130000, multiplier: 1.25, production: 260 },
        megafarm: { count: 0, baseCost: 400000, multiplier: 1.25, production: 650 },
        continent: { count: 0, baseCost: 1200000, multiplier: 1.25, production: 1600 },
        planet: { count: 0, baseCost: 3600000, multiplier: 1.25, production: 4000 },
        galaxy: { count: 0, baseCost: 11000000, multiplier: 1.25, production: 10000 },
        // Advanced upgrades
        alchemist: { count: 0, baseCost: 50000, multiplier: 1.25, production: 90 },
        wizard: { count: 0, baseCost: 150000, multiplier: 1.25, production: 220 },
        sorcerer: { count: 0, baseCost: 450000, multiplier: 1.25, production: 550 },
        portal: { count: 0, baseCost: 1300000, multiplier: 1.25, production: 1300 },
        dimensionalRift: { count: 0, baseCost: 4000000, multiplier: 1.25, production: 3200 },
        timeMachine: { count: 0, baseCost: 12000000, multiplier: 1.25, production: 8000 },
        quantumComputer: { count: 0, baseCost: 36000000, multiplier: 1.25, production: 20000 },
        blackHole: { count: 0, baseCost: 110000000, multiplier: 1.25, production: 50000 },
        multiverse: { count: 0, baseCost: 330000000, multiplier: 1.25, production: 120000 },
        realityBender: { count: 0, baseCost: 1000000000, multiplier: 1.25, production: 300000 },
        godMode: { count: 0, baseCost: 3000000000, multiplier: 1.25, production: 750000 },
        transcendence: { count: 0, baseCost: 9000000000, multiplier: 1.25, production: 1800000 },
        infinity: { count: 0, baseCost: 27000000000, multiplier: 1.25, production: 4500000 }
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
   const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.textContent = `+${gameState.beansPerClick}`;
    clickText.style.left = `${e.clientX}px`;
    clickText.style.top = `${e.clientY}px`;
    clickText.style.position = 'fixed'; // key change

    document.body.appendChild(clickText); // append to body, not just clickEffectContainer

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

// Check if an upgrade is unlocked
function isUpgradeUnlocked(upgradeType) {
    // Define upgrade order for each category
    const clickingOrder = ['cursor', 'cursor2', 'reinforcedFinger', 'ironFist', 'goldenTouch', 
                          'diamondHand', 'titanicGrip', 'cosmicPointer', 'divineClick', 
                          'omnipotentTouch', 'infiniteFinger', 'universalClicker', 'quantumHand'];
    
    const productionOrder = ['seedling', 'grandma', 'gardener', 'farm', 'greenhouse', 
                            'factory', 'plantation', 'mine', 'biolab', 'megafarm', 
                            'continent', 'planet', 'galaxy'];
    
    const advancedOrder = ['alchemist', 'wizard', 'sorcerer', 'portal', 'dimensionalRift', 
                          'timeMachine', 'quantumComputer', 'blackHole', 'multiverse', 
                          'realityBender', 'godMode', 'transcendence', 'infinity'];
    
    // Determine which order this upgrade belongs to
    let order = null;
    let index = -1;
    
    if (clickingOrder.includes(upgradeType)) {
        order = clickingOrder;
        index = clickingOrder.indexOf(upgradeType);
    } else if (productionOrder.includes(upgradeType)) {
        order = productionOrder;
        index = productionOrder.indexOf(upgradeType);
    } else if (advancedOrder.includes(upgradeType)) {
        order = advancedOrder;
        index = advancedOrder.indexOf(upgradeType);
    }
    
    // First upgrade in any category is always unlocked
    if (index === 0) return true;
    
    // Check if previous upgrade has been purchased
    if (index > 0 && order) {
        const previousUpgrade = order[index - 1];
        return gameState.upgrades[previousUpgrade].count > 0;
    }
    
    return true;
}

// Update upgrade button states
function updateUpgradeButtons() {
    buyButtons.forEach(button => {
        const upgradeType = button.getAttribute('data-upgrade');
        const cost = getUpgradeCost(upgradeType);
        const card = button.closest('.upgrade-card');
        const isUnlocked = isUpgradeUnlocked(upgradeType);
        
        if (!isUnlocked) {
            // Upgrade is locked
            button.disabled = true;
            card.classList.add('disabled');
            card.classList.add('locked');
        } else if (gameState.beans >= cost) {
            // Upgrade is unlocked and affordable
            button.disabled = false;
            card.classList.remove('disabled');
            card.classList.remove('locked');
        } else {
            // Upgrade is unlocked but not affordable
            button.disabled = true;
            card.classList.add('disabled');
            card.classList.remove('locked');
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
                cursor: { count: 0, baseCost: 10, multiplier: 1.2, clickBonus: 0.2 },
                cursor2: { count: 0, baseCost: 30, multiplier: 1.25, clickBonus: 0.5 },
                reinforcedFinger: { count: 0, baseCost: 100, multiplier: 1.25, clickBonus: 1 },
                ironFist: { count: 0, baseCost: 250, multiplier: 1.3, clickBonus: 2 },
                goldenTouch: { count: 0, baseCost: 800, multiplier: 1.3, clickBonus: 4 },
                diamondHand: { count: 0, baseCost: 2500, multiplier: 1.35, clickBonus: 8 },
                titanicGrip: { count: 0, baseCost: 8000, multiplier: 1.35, clickBonus: 16 },
                cosmicPointer: { count: 0, baseCost: 25000, multiplier: 1.35, clickBonus: 32 },
                divineClick: { count: 0, baseCost: 80000, multiplier: 1.4, clickBonus: 64 },
                omnipotentTouch: { count: 0, baseCost: 250000, multiplier: 1.4, clickBonus: 128 },
                infiniteFinger: { count: 0, baseCost: 800000, multiplier: 1.4, clickBonus: 256 },
                universalClicker: { count: 0, baseCost: 2500000, multiplier: 1.4, clickBonus: 512 },
                quantumHand: { count: 0, baseCost: 8000000, multiplier: 1.45, clickBonus: 1024 },
                // Production upgrades
                seedling: { count: 0, baseCost: 25, multiplier: 1.2, production: 0.2 },
                grandma: { count: 0, baseCost: 80, multiplier: 1.25, production: 0.5 },
                gardener: { count: 0, baseCost: 200, multiplier: 1.25, production: 1.2 },
                farm: { count: 0, baseCost: 600, multiplier: 1.25, production: 3 },
                greenhouse: { count: 0, baseCost: 1800, multiplier: 1.25, production: 7 },
                factory: { count: 0, baseCost: 5000, multiplier: 1.25, production: 18 },
                plantation: { count: 0, baseCost: 15000, multiplier: 1.25, production: 45 },
                mine: { count: 0, baseCost: 45000, multiplier: 1.25, production: 110 },
                biolab: { count: 0, baseCost: 130000, multiplier: 1.25, production: 260 },
                megafarm: { count: 0, baseCost: 400000, multiplier: 1.25, production: 650 },
                continent: { count: 0, baseCost: 1200000, multiplier: 1.25, production: 1600 },
                planet: { count: 0, baseCost: 3600000, multiplier: 1.25, production: 4000 },
                galaxy: { count: 0, baseCost: 11000000, multiplier: 1.25, production: 10000 },
                // Advanced upgrades
                alchemist: { count: 0, baseCost: 50000, multiplier: 1.25, production: 90 },
                wizard: { count: 0, baseCost: 150000, multiplier: 1.25, production: 220 },
                sorcerer: { count: 0, baseCost: 450000, multiplier: 1.25, production: 550 },
                portal: { count: 0, baseCost: 1300000, multiplier: 1.25, production: 1300 },
                dimensionalRift: { count: 0, baseCost: 4000000, multiplier: 1.25, production: 3200 },
                timeMachine: { count: 0, baseCost: 12000000, multiplier: 1.25, production: 8000 },
                quantumComputer: { count: 0, baseCost: 36000000, multiplier: 1.25, production: 20000 },
                blackHole: { count: 0, baseCost: 110000000, multiplier: 1.25, production: 50000 },
                multiverse: { count: 0, baseCost: 330000000, multiplier: 1.25, production: 120000 },
                realityBender: { count: 0, baseCost: 1000000000, multiplier: 1.25, production: 300000 },
                godMode: { count: 0, baseCost: 3000000000, multiplier: 1.25, production: 750000 },
                transcendence: { count: 0, baseCost: 9000000000, multiplier: 1.25, production: 1800000 },
                infinity: { count: 0, baseCost: 27000000000, multiplier: 1.25, production: 4500000 }
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

// Cheat: Press 'p' to get 1 quadrillion beans
document.addEventListener('keydown', function(e) {
    if (e.key === 'p' || e.key === 'P') {
        gameState.beans += 1000000000000000;
        updateDisplay();
    }
});
