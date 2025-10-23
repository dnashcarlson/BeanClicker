// ===== GAME STATE =====
let gameState = {
    beans: 0,
    beansPerClick: 1,
    beansPerSecond: 0,
    totalBeansAllTime: 0,
    chiliPoints: 0,
    achievements: [],
    activeBoosts: [],
    autoClickerEnabled: false,
    autoClickerUnlocked: false,
    garden: { plots: [null, null, null, null] },
    stats: {
        totalClicks: 0,
        goldenBeansClicked: 0,
        gardenHarvests: 0,
        soupsMade: 0
    },
    upgrades: {
        cursor: { count: 0, baseCost: 15, multiplier: 1.3, clickBonus: 0.1 },
        cursor2: { count: 0, baseCost: 100, multiplier: 1.35, clickBonus: 0.2 },
        reinforcedFinger: { count: 0, baseCost: 500, multiplier: 1.35, clickBonus: 0.5 },
        ironFist: { count: 0, baseCost: 2000, multiplier: 1.4, clickBonus: 1 },
        goldenTouch: { count: 0, baseCost: 8000, multiplier: 1.4, clickBonus: 2 },
        diamondHand: { count: 0, baseCost: 35000, multiplier: 1.45, clickBonus: 4 },
        titanicGrip: { count: 0, baseCost: 150000, multiplier: 1.45, clickBonus: 8 },
        cosmicPointer: { count: 0, baseCost: 650000, multiplier: 1.45, clickBonus: 15 },
        divineClick: { count: 0, baseCost: 2800000, multiplier: 1.5, clickBonus: 30 },
        omnipotentTouch: { count: 0, baseCost: 12000000, multiplier: 1.5, clickBonus: 60 },
        infiniteFinger: { count: 0, baseCost: 50000000, multiplier: 1.5, clickBonus: 120 },
        universalClicker: { count: 0, baseCost: 220000000, multiplier: 1.5, clickBonus: 250 },
        quantumHand: { count: 0, baseCost: 1000000000, multiplier: 1.55, clickBonus: 500 },
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

const achievements = [
    // Click-based achievements
    { id: 'first_bean', name: 'First Bean', description: 'Click the bean for the first time', condition: () => gameState.stats.totalClicks >= 1, reward: 10 },
    { id: 'click_apprentice', name: 'Click Apprentice', description: 'Click 50 times', condition: () => gameState.stats.totalClicks >= 50, reward: 50 },
    { id: 'click_master', name: 'Click Master', description: 'Click 100 times', condition: () => gameState.stats.totalClicks >= 100, reward: 100 },
    { id: 'click_expert', name: 'Click Expert', description: 'Click 500 times', condition: () => gameState.stats.totalClicks >= 500, reward: 500 },
    { id: 'click_legend', name: 'Click Legend', description: 'Click 1000 times', condition: () => gameState.stats.totalClicks >= 1000, reward: 1000 },
    { id: 'click_god', name: 'Click God', description: 'Click 5000 times', condition: () => gameState.stats.totalClicks >= 5000, reward: 10000 },
    { id: 'click_transcendent', name: 'Click Transcendent', description: 'Click 10000 times', condition: () => gameState.stats.totalClicks >= 10000, reward: 50000 },
    
    // Bean accumulation achievements
    { id: 'small_stash', name: 'Small Stash', description: 'Accumulate 1,000 beans', condition: () => gameState.beans >= 1000, reward: 100 },
    { id: 'hoarder', name: 'Bean Hoarder', description: 'Accumulate 10,000 beans', condition: () => gameState.beans >= 10000, reward: 500 },
    { id: 'wealthy', name: 'Bean Wealthy', description: 'Accumulate 100,000 beans', condition: () => gameState.beans >= 100000, reward: 5000 },
    { id: 'millionaire', name: 'Bean Millionaire', description: 'Accumulate 1,000,000 beans', condition: () => gameState.beans >= 1000000, reward: 50000 },
    { id: 'billionaire', name: 'Bean Billionaire', description: 'Accumulate 1,000,000,000 beans', condition: () => gameState.beans >= 1000000000, reward: 5000000 },
    { id: 'trillionaire', name: 'Bean Trillionaire', description: 'Accumulate 1,000,000,000,000 beans', condition: () => gameState.beans >= 1000000000000, reward: 50000000 },
    
    // Production achievements
    { id: 'passive_income', name: 'Passive Income', description: 'Reach 10 beans per second', condition: () => gameState.beansPerSecond >= 10, reward: 1000 },
    { id: 'bean_factory', name: 'Bean Factory', description: 'Reach 100 beans per second', condition: () => gameState.beansPerSecond >= 100, reward: 10000 },
    { id: 'bean_empire', name: 'Bean Empire', description: 'Reach 1,000 beans per second', condition: () => gameState.beansPerSecond >= 1000, reward: 100000 },
    { id: 'bean_universe', name: 'Bean Universe', description: 'Reach 10,000 beans per second', condition: () => gameState.beansPerSecond >= 10000, reward: 1000000 },
    { id: 'infinite_beans', name: 'Infinite Beans', description: 'Reach 100,000 beans per second', condition: () => gameState.beansPerSecond >= 100000, reward: 10000000 },
    
    // Upgrade achievements
    { id: 'first_upgrade', name: 'First Upgrade', description: 'Purchase your first upgrade', condition: () => Object.values(gameState.upgrades).some(u => u.count > 0), reward: 50 },
    { id: 'upgrade_collector', name: 'Upgrade Collector', description: 'Own 10 total upgrades', condition: () => Object.values(gameState.upgrades).reduce((sum, u) => sum + u.count, 0) >= 10, reward: 500 },
    { id: 'upgrade_hoarder', name: 'Upgrade Hoarder', description: 'Own 50 total upgrades', condition: () => Object.values(gameState.upgrades).reduce((sum, u) => sum + u.count, 0) >= 50, reward: 5000 },
    { id: 'upgrade_master', name: 'Upgrade Master', description: 'Own 100 total upgrades', condition: () => Object.values(gameState.upgrades).reduce((sum, u) => sum + u.count, 0) >= 100, reward: 50000 },
    { id: 'upgrade_god', name: 'Upgrade God', description: 'Own 500 total upgrades', condition: () => Object.values(gameState.upgrades).reduce((sum, u) => sum + u.count, 0) >= 500, reward: 500000 },
    
    // Special achievements
    { id: 'golden_hunter', name: 'Golden Hunter', description: 'Click 10 golden beans', condition: () => gameState.stats.goldenBeansClicked >= 10, reward: 5000 },
    { id: 'golden_expert', name: 'Golden Expert', description: 'Click 50 golden beans', condition: () => gameState.stats.goldenBeansClicked >= 50, reward: 50000 },
    { id: 'golden_master', name: 'Golden Master', description: 'Click 100 golden beans', condition: () => gameState.stats.goldenBeansClicked >= 100, reward: 500000 },
    
    { id: 'automation', name: 'Automated Future', description: 'Unlock the auto-clicker', condition: () => gameState.autoClickerUnlocked, reward: 1000 },
    
    { id: 'green_thumb', name: 'Green Thumb', description: 'Harvest from the garden 5 times', condition: () => gameState.stats.gardenHarvests >= 5, reward: 5000 },
    { id: 'gardener', name: 'Master Gardener', description: 'Harvest from the garden 10 times', condition: () => gameState.stats.gardenHarvests >= 10, reward: 10000 },
    { id: 'farmer', name: 'Expert Farmer', description: 'Harvest from the garden 50 times', condition: () => gameState.stats.gardenHarvests >= 50, reward: 100000 },
    
    // Click power achievements
    { id: 'powerful_click', name: 'Powerful Click', description: 'Reach 100 beans per click', condition: () => gameState.beansPerClick >= 100, reward: 10000 },
    { id: 'mighty_click', name: 'Mighty Click', description: 'Reach 1,000 beans per click', condition: () => gameState.beansPerClick >= 1000, reward: 100000 },
    { id: 'godly_click', name: 'Godly Click', description: 'Reach 10,000 beans per click', condition: () => gameState.beansPerClick >= 10000, reward: 1000000 },
    
    // Total earnings achievement
    { id: 'lifetime_earner', name: 'Lifetime Earner', description: 'Earn 10,000,000 beans total', condition: () => gameState.totalBeansAllTime >= 10000000, reward: 100000 },
    { id: 'lifetime_legend', name: 'Lifetime Legend', description: 'Earn 100,000,000 beans total', condition: () => gameState.totalBeansAllTime >= 100000000, reward: 1000000 },
    
    // Diversity achievement
    { id: 'diverse_portfolio', name: 'Diverse Portfolio', description: 'Own at least one of 10 different upgrade types', condition: () => Object.values(gameState.upgrades).filter(u => u.count > 0).length >= 10, reward: 25000 },
    { id: 'full_collection', name: 'Full Collection', description: 'Own at least one of every upgrade type', condition: () => Object.values(gameState.upgrades).every(u => u.count > 0), reward: 500000 }
];

const boostTypes = {
    productionBoost: { name: '2x Production', duration: 30000, multiplier: 2, cooldown: 120000, icon: '⚡' },
    clickBoost: { name: '3x Click Power', duration: 20000, multiplier: 3, cooldown: 90000, icon: '💥' },
    luckyBoost: { name: 'Lucky Boost', duration: 60000, effect: 'golden_spawn', cooldown: 180000, icon: '🍀' }
};

function calculateBeansPerSecond() {
    let total = 0;
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.production) {
            total += upgrade.count * upgrade.production;
        }
    }
    return total;
}

function calculateBeansPerClick() {
    let total = 1;
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.clickBonus) {
            total += upgrade.count * upgrade.clickBonus;
        }
    }
    return total;
}

function getUpgradeCost(upgradeType) {
    const upgrade = gameState.upgrades[upgradeType];
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.count));
}

function formatNumber(num) {
    if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + 'T';
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toFixed(1);
}

function handleBeanClick(event) {
    gameState.stats.totalClicks++;
    
    // Recalculate beans per click to ensure it's current
    gameState.beansPerClick = calculateBeansPerClick();
    
    const boosts = getActiveBoostMultipliers();
    const beansGained = gameState.beansPerClick * boosts.clickMultiplier;
    
    gameState.beans += beansGained;
    gameState.totalBeansAllTime += beansGained;
    
    updateAll();
    checkAchievements();
    
    // Get the actual click position
    const clickX = event.clientX;
    const clickY = event.clientY;
    
    createClickEffect(clickX, clickY);
    
    const beanButton = document.getElementById('beanButton');
    if (beanButton) {
        // Enhanced click animation with rotation and scale
        beanButton.style.transform = 'scale(0.85) rotate(-5deg)';
        beanButton.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            beanButton.style.transform = 'scale(1.1) rotate(2deg)';
        }, 50);
        
        setTimeout(() => {
            beanButton.style.transform = '';
            beanButton.style.filter = '';
        }, 150);
        
        // Create multiple sparkles in a burst at click position
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / 5;
                const distance = 30 + Math.random() * 20;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;
                createSparkleAt(clickX + offsetX, clickY + offsetY);
            }, i * 30);
        }
        
        // Create impact wave at click position
        createImpactWave(clickX, clickY);
    }
    
    // Add stat value animation
    const beanCountEl = document.getElementById('beanCount');
    if (beanCountEl) {
        beanCountEl.classList.add('updated');
        setTimeout(() => beanCountEl.classList.remove('updated'), 300);
    }
}

// Add cursor trail when combo is active
let trailEnabled = true; // Always enabled now
document.addEventListener('mousemove', (e) => {
    if (trailEnabled) {
        createCursorTrail(e.clientX, e.clientY);
    }
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
}

function createClickEffect(x, y) {
    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.textContent = '+' + formatNumber(gameState.beansPerClick);
    
    clickText.style.left = x + 'px';
    clickText.style.top = y + 'px';
    clickText.style.position = 'fixed';
    
    document.body.appendChild(clickText);
    setTimeout(() => clickText.remove(), 1000);
    
    // Add particle effect at click position
    createParticles(x, y);
}

// Create particle effects when clicking
function createParticles(x, y) {
    const particleCount = 10 + Math.floor(Math.random() * 6); // 10-15 particles
    const colors = ['#fbbf24', '#f59e0b', '#fde047', '#fef3c7', '#fb923c'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = 60 + Math.random() * 80;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        // Random particle size
        const size = 6 + Math.random() * 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    }
    
    // Add enhanced ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (x - 100) + 'px';
    ripple.style.top = (y - 100) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
    
    // Add secondary ripple for more depth
    setTimeout(() => {
        const ripple2 = document.createElement('div');
        ripple2.className = 'ripple';
        ripple2.style.left = (x - 100) + 'px';
        ripple2.style.top = (y - 100) + 'px';
        ripple2.style.animationDelay = '0.1s';
        document.body.appendChild(ripple2);
        setTimeout(() => ripple2.remove(), 800);
    }, 50);
}


// Create confetti celebration
function createConfetti(count) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f', '#bb8fce'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Create floating coins
function createFloatingCoins(x, y, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'floating-coin';
            coin.textContent = '🪙';
            coin.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
            coin.style.top = y + 'px';
            coin.style.animationDelay = (i * 0.1) + 's';
            document.body.appendChild(coin);
            setTimeout(() => coin.remove(), 2000);
        }, i * 50);
    }
}

// Screen flash effect
function triggerScreenFlash() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

// Screen shake effect
function triggerScreenShake() {
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

function getActiveBoostMultipliers() {
    const now = Date.now();
    let clickMultiplier = 1;
    let productionMultiplier = 1;
    let luckyActive = false;
    
    gameState.activeBoosts.forEach(boost => {
        if (boost.endTime > now) {
            if (boost.type === 'clickBoost') clickMultiplier *= boost.multiplier;
            if (boost.type === 'productionBoost') productionMultiplier *= boost.multiplier;
            if (boost.type === 'luckyBoost') luckyActive = true;
        }
    });
    
    return { clickMultiplier, productionMultiplier, luckyActive };
}

function buyUpgrade(upgradeType) {
    const upgrade = gameState.upgrades[upgradeType];
    const cost = getUpgradeCost(upgradeType);
    
    if (gameState.beans >= cost) {
        gameState.beans -= cost;
        upgrade.count++;
        
        // Visual celebrations based on upgrade cost
        const upgradeCard = document.querySelector(`[data-upgrade="${upgradeType}"]`)?.closest('.upgrade-card');
        if (upgradeCard) {
            upgradeCard.classList.add('upgrade-purchased');
            setTimeout(() => upgradeCard.classList.remove('upgrade-purchased'), 600);
            
            const rect = upgradeCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create sparkles on every purchase
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createSparkleAt(centerX + (Math.random() - 0.5) * 50, centerY + (Math.random() - 0.5) * 50);
                }, i * 100);
            }
            
            // Small celebration for normal upgrades
            createFloatingCoins(centerX, centerY, 3);
            
            // Big celebration for expensive upgrades
            if (cost >= 1000000) {
                triggerScreenFlash();
                createConfetti(30);
                triggerScreenShake();
                createWaveEffect();
            } else if (cost >= 100000) {
                createConfetti(15);
                createWaveEffect();
            } else if (cost >= 10000) {
                createFloatingCoins(centerX, centerY, 8);
            }
        }
        
        updateAll();
        checkAchievements();
        saveGame();
        return true;
    }
    return false;
}

function updateDisplay() {
    const prevBeans = parseFloat(document.getElementById('beanCount').textContent.replace(/[KMB]/g, '')) || 0;
    const currentBeans = gameState.beans;
    
    document.getElementById('beanCount').textContent = formatNumber(gameState.beans);
    document.getElementById('beansPerSecond').textContent = formatNumber(gameState.beansPerSecond);
    document.getElementById('beansPerClick').textContent = formatNumber(gameState.beansPerClick);
    
    // Check for milestone achievements
    checkMilestones(currentBeans);
    
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        const cost = getUpgradeCost(key);
        const costEl = document.getElementById('cost-' + key);
        const ownedEl = document.getElementById('owned-' + key);
        if (costEl) costEl.textContent = formatNumber(cost);
        if (ownedEl) ownedEl.textContent = upgrade.count;
    }
}

// Check and celebrate milestones
function checkMilestones(beans) {
    const milestones = [100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
    const lastMilestone = gameState.lastMilestone || 0;
    
    for (const milestone of milestones) {
        if (beans >= milestone && lastMilestone < milestone) {
            gameState.lastMilestone = milestone;
            celebrateMilestone(milestone);
            break;
        }
    }
}

function celebrateMilestone(milestone) {
    const celebration = document.createElement('div');
    celebration.className = 'milestone-celebration';
    celebration.textContent = `🎉 ${formatNumber(milestone)} BEANS! 🎉`;
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 2000);
    
    createConfetti(100);
    triggerScreenFlash();
    triggerScreenShake();
}

function updateUpgradeButtons() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        const upgradeType = button.getAttribute('data-upgrade');
        const cost = getUpgradeCost(upgradeType);
        const card = button.closest('.upgrade-card');
        
        // Update button state
        if (gameState.beans >= cost) {
            button.disabled = false;
            if (card) {
                card.classList.remove('disabled');
                card.classList.add('affordable');
            }
        } else {
            button.disabled = true;
            if (card) {
                card.classList.add('disabled');
                card.classList.remove('affordable');
            }
        }
        
        // Update progress bar
        let progressBar = card?.querySelector('.upgrade-progress-bar');
        if (!progressBar) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'upgrade-progress';
            progressBar = document.createElement('div');
            progressBar.className = 'upgrade-progress-bar';
            progressContainer.appendChild(progressBar);
            const upgradeInfo = card?.querySelector('.upgrade-info');
            if (upgradeInfo) {
                upgradeInfo.insertBefore(progressContainer, upgradeInfo.firstChild);
            }
        }
        
        if (progressBar) {
            const progress = Math.min((gameState.beans / cost) * 100, 100);
            progressBar.style.width = progress + '%';
        }
    });
}

function updateAll() {
    gameState.beansPerSecond = calculateBeansPerSecond();
    gameState.beansPerClick = calculateBeansPerClick();
    updateDisplay();
    updateUpgradeButtons();
    updateChiliDisplay();
    updateAutoClickerDisplay();
}

// ===== CHILI SOUP SYSTEM =====
function makeChiliSoup() {
    const beanCost = 1000;
    const chiliPointsPerSoup = 1;
    
    if (gameState.beans >= beanCost) {
        gameState.beans -= beanCost;
        gameState.chiliPoints += chiliPointsPerSoup;
        gameState.stats.soupsMade++;
        
        // Visual feedback
        const button = document.getElementById('makeSoupButton');
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<span class="soup-icon">🔥</span><span class="soup-text">Soup Made!</span>';
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.transform = 'scale(1)';
            }, 500);
        }
        
        // Create spicy particle effects
        createChiliParticles();
        
        updateAll();
        checkAchievements();
    }
}

function createChiliParticles() {
    const button = document.getElementById('makeSoupButton');
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = '🌶️';
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = '1.5rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

function updateChiliDisplay() {
    const chiliPointsEl = document.getElementById('chiliPoints');
    const totalSoupsEl = document.getElementById('totalSoups');
    const chiliRateEl = document.getElementById('chiliRate');
    
    if (chiliPointsEl) {
        chiliPointsEl.textContent = formatNumber(gameState.chiliPoints);
    }
    if (totalSoupsEl) {
        totalSoupsEl.textContent = formatNumber(gameState.stats.soupsMade);
    }
    if (chiliRateEl) {
        chiliRateEl.textContent = '0/sec'; // For future upgrades
    }
    
    // Update button state
    const button = document.getElementById('makeSoupButton');
    if (button) {
        if (gameState.beans >= 1000) {
            button.disabled = false;
            button.style.opacity = '1';
        } else {
            button.disabled = true;
            button.style.opacity = '0.6';
        }
    }
}

function saveGame() {
    localStorage.setItem('beanClickerSave', JSON.stringify(gameState));
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.textContent = '✅ Saved!';
        setTimeout(() => { saveButton.textContent = '💾 Save Game'; }, 1000);
    }
}

function loadGame() {
    const saved = localStorage.getItem('beanClickerSave');
    if (saved) {
        const loadedState = JSON.parse(saved);
        Object.assign(gameState, loadedState);
    }
}

function resetGame() {
    if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
        localStorage.removeItem('beanClickerSave');
        location.reload();
    }
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
            gameState.achievements.push(achievement.id);
            gameState.beans += achievement.reward;
            showAchievementNotification(achievement);
        }
    });
    updateAchievementDisplay();
}

function showAchievementNotification(achievement) {
    // Create main notification panel
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-inner">
            <div class="achievement-shine"></div>
            <div class="achievement-icon-large">🏆</div>
            <div class="achievement-title">Achievement Unlocked!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
            <div class="achievement-reward">
                <span class="reward-icon">💰</span>
                <span class="reward-text">+${formatNumber(achievement.reward)} beans</span>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Create side panel that stays visible
    const sidePanel = document.createElement('div');
    sidePanel.className = 'achievement-side-panel';
    sidePanel.innerHTML = `
        <div class="side-panel-content">
            <div class="side-panel-icon">🏆</div>
            <div class="side-panel-info">
                <div class="side-panel-title">Achievement!</div>
                <div class="side-panel-name">${achievement.name}</div>
            </div>
        </div>
    `;
    document.body.appendChild(sidePanel);
    
    // Trigger screen shake
    triggerScreenShake();
    
    // Add confetti celebration
    setTimeout(() => {
        createConfetti(30);
        
        // Create sparkles around the notification
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const notifRect = notification.getBoundingClientRect();
                const sparkleX = notifRect.left + notifRect.width / 2 + (Math.random() - 0.5) * 300;
                const sparkleY = notifRect.top + notifRect.height / 2 + (Math.random() - 0.5) * 200;
                createSparkleAt(sparkleX, sparkleY);
            }, i * 80);
        }
    }, 200);
    
    // Animate notification in
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => sidePanel.classList.add('show'), 100);
    
    // Remove main notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 600);
    }, 5000);
    
    // Remove side panel after longer delay
    setTimeout(() => {
        sidePanel.classList.remove('show');
        setTimeout(() => sidePanel.remove(), 500);
    }, 8000);
}

function updateAchievementDisplay() {
    const achievementContainer = document.getElementById('achievementList');
    if (!achievementContainer) return;
    
    achievementContainer.innerHTML = '';
    achievements.forEach(achievement => {
        const unlocked = gameState.achievements.includes(achievement.id);
        const achEl = document.createElement('div');
        achEl.className = 'achievement-item ' + (unlocked ? 'unlocked' : 'locked');
        achEl.innerHTML = '<div class="achievement-icon">' + (unlocked ? '🏆' : '🔒') + '</div><div class="achievement-info"><div class="achievement-name">' + (unlocked ? achievement.name : '???') + '</div><div class="achievement-desc">' + (unlocked ? achievement.description : 'Hidden achievement') + '</div>' + (unlocked ? '<div class="achievement-reward">Reward: ' + formatNumber(achievement.reward) + ' beans</div>' : '') + '</div>';
        achievementContainer.appendChild(achEl);
    });
    
    const count = document.getElementById('achievementCount');
    if (count) {
        count.textContent = gameState.achievements.length + ' / ' + achievements.length;
    }
}

function activateBoost(boostType) {
    const boost = boostTypes[boostType];
    const now = Date.now();
    
    const existing = gameState.activeBoosts.find(b => b.type === boostType);
    if (existing && existing.cooldownUntil > now) {
        const remaining = Math.ceil((existing.cooldownUntil - now) / 1000);
        alert('Boost on cooldown! ' + remaining + 's remaining');
        return;
    }
    
    const boostData = {
        type: boostType,
        endTime: now + boost.duration,
        cooldownUntil: now + boost.duration + boost.cooldown,
        name: boost.name,
        multiplier: boost.multiplier,
        icon: boost.icon
    };
    
    gameState.activeBoosts = gameState.activeBoosts.filter(b => b.type !== boostType);
    gameState.activeBoosts.push(boostData);
    updateBoostDisplay();
}

function updateBoostDisplay() {
    const boostContainer = document.getElementById('activeBoosts');
    if (!boostContainer) return;
    
    const now = Date.now();
    gameState.activeBoosts = gameState.activeBoosts.filter(b => b.cooldownUntil > now);
    
    boostContainer.innerHTML = '';
    const activeBoosts = gameState.activeBoosts.filter(b => b.endTime > now);
    
    if (activeBoosts.length > 0) {
        activeBoosts.forEach(boost => {
            const remaining = Math.ceil((boost.endTime - now) / 1000);
            const boostEl = document.createElement('div');
            boostEl.className = 'active-boost-item';
            boostEl.textContent = boost.icon + ' ' + remaining + 's';
            boostContainer.appendChild(boostEl);
        });
    }
}

function unlockAutoClicker() {
    if (gameState.beans >= 50000) {
        gameState.beans -= 50000;
        gameState.autoClickerUnlocked = true;
        checkAchievements();
        updateAll();
        alert('Auto-Clicker unlocked! 🤖');
    }
}

function toggleAutoClicker() {
    if (!gameState.autoClickerUnlocked) {
        alert('Auto-Clicker not unlocked yet! Cost: 50,000 beans');
        return;
    }
    gameState.autoClickerEnabled = !gameState.autoClickerEnabled;
    updateAutoClickerDisplay();
}

function updateAutoClickerDisplay() {
    const btn = document.getElementById('autoClickerBtn');
    if (btn) {
        if (!gameState.autoClickerUnlocked) {
            btn.textContent = '🤖 Unlock Auto-Clicker (50,000)';
            btn.disabled = gameState.beans < 50000;
        } else {
            btn.textContent = gameState.autoClickerEnabled ? '🤖 Auto-Clicker: ON' : '🤖 Auto-Clicker: OFF';
            btn.classList.toggle('active', gameState.autoClickerEnabled);
        }
    }
}

function plantBean(plotIndex) {
    if (gameState.garden.plots[plotIndex]) {
        alert('Plot already has a bean growing!');
        return;
    }
    
    const cost = 1000 * (plotIndex + 1);
    if (gameState.beans < cost) {
        alert('Not enough beans! Cost: ' + formatNumber(cost));
        return;
    }
    
    gameState.beans -= cost;
    gameState.garden.plots[plotIndex] = {
        plantedAt: Date.now(),
        growthTime: 60000,
        harvestValue: cost * 3
    };
    
    updateGardenDisplay();
    updateAll();
}

function harvestBean(plotIndex) {
    const plot = gameState.garden.plots[plotIndex];
    if (!plot) return;
    
    const now = Date.now();
    const elapsed = now - plot.plantedAt;
    
    if (elapsed < plot.growthTime) {
        const remaining = Math.ceil((plot.growthTime - elapsed) / 1000);
        alert('Bean not ready yet! ' + remaining + 's remaining');
        return;
    }
    
    gameState.beans += plot.harvestValue;
    gameState.totalBeansAllTime += plot.harvestValue;
    gameState.stats.gardenHarvests = (gameState.stats.gardenHarvests || 0) + 1;
    gameState.garden.plots[plotIndex] = null;
    
    checkAchievements();
    updateGardenDisplay();
    updateAll();
}

function updateGardenDisplay() {
    const gardenContainer = document.getElementById('gardenPlots');
    if (!gardenContainer) return;
    
    const now = Date.now();
    gardenContainer.innerHTML = '';
    
    gameState.garden.plots.forEach((plot, index) => {
        const plotEl = document.createElement('div');
        plotEl.className = 'garden-plot';
        
        if (!plot) {
            const cost = 1000 * (index + 1);
            plotEl.innerHTML = '<div class="plot-empty">🌱</div><button onclick="plantBean(' + index + ')" class="plot-btn">Plant (' + formatNumber(cost) + ')</button>';
        } else {
            const elapsed = now - plot.plantedAt;
            const progress = Math.min(100, (elapsed / plot.growthTime) * 100);
            const ready = elapsed >= plot.growthTime;
            
            plotEl.innerHTML = '<div class="plot-growing ' + (ready ? 'ready' : '') + '">' + (ready ? '🫘' : '🌱') + '<div class="growth-bar"><div class="growth-progress" style="width: ' + progress + '%"></div></div></div><button onclick="harvestBean(' + index + ')" class="plot-btn" ' + (!ready ? 'disabled' : '') + '>' + (ready ? 'Harvest!' : Math.ceil((plot.growthTime - elapsed) / 1000) + 's') + '</button>';
        }
        
        gardenContainer.appendChild(plotEl);
    });
}

function spawnGoldenBean() {
    if (document.getElementById('goldenBean')) return;
    
    const goldenBean = document.createElement('div');
    goldenBean.id = 'goldenBean';
    goldenBean.className = 'golden-bean';
    goldenBean.textContent = '✨';
    
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    goldenBean.style.left = x + 'px';
    goldenBean.style.top = y + 'px';
    goldenBean.style.position = 'fixed';
    
    goldenBean.addEventListener('click', () => {
        const bonus = Math.floor(gameState.beansPerSecond * 10 + gameState.beansPerClick * 77);
        gameState.beans += bonus;
        gameState.totalBeansAllTime += bonus;
        gameState.stats.goldenBeansClicked++;
        
        const floater = document.createElement('div');
        floater.className = 'floating-text';
        floater.textContent = '+' + formatNumber(bonus) + ' ✨';
        floater.style.left = x + 'px';
        floater.style.top = y + 'px';
        floater.style.position = 'fixed';
        document.body.appendChild(floater);
        setTimeout(() => floater.remove(), 1000);
        
        // Golden bean celebration!
        createConfetti(20);
        createFloatingCoins(x + 50, y + 50, 10);
        triggerScreenFlash();
        
        goldenBean.remove();
        checkAchievements();
        updateAll();
    });
    
    document.body.appendChild(goldenBean);
    setTimeout(() => {
        if (document.getElementById('goldenBean')) {
            goldenBean.remove();
        }
    }, 10000);
}

function init() {
    loadGame();
    updateAll();
    updateAchievementDisplay();
    updateGardenDisplay();
    updateBoostDisplay();
    
    const beanButton = document.getElementById('beanButton');
    if (beanButton) {
        beanButton.addEventListener('click', handleBeanClick);
    }
    
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            const upgradeType = button.getAttribute('data-upgrade');
            if (buyUpgrade(upgradeType)) {
                button.classList.add('bought');
                button.textContent = '✓ Bought!';
                setTimeout(() => { 
                    button.classList.remove('bought');
                    button.textContent = 'Buy'; 
                }, 600);
            }
        });
    });
    
    document.getElementById('settingsButton').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.add('active');
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.remove('active');
    });
    
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            document.getElementById('settingsModal').classList.remove('active');
        }
    });

    // Achievements Modal
    document.getElementById('achievementsButton').addEventListener('click', () => {
        document.getElementById('achievementsModal').classList.add('active');
    });
    
    document.getElementById('closeAchievements').addEventListener('click', () => {
        document.getElementById('achievementsModal').classList.remove('active');
    });
    
    document.getElementById('achievementsModal').addEventListener('click', (e) => {
        if (e.target.id === 'achievementsModal') {
            document.getElementById('achievementsModal').classList.remove('active');
        }
    });
    
    document.getElementById('saveButton').addEventListener('click', saveGame);
    document.getElementById('resetButton').addEventListener('click', resetGame);
    
    // Chili Soup Button
    const makeSoupButton = document.getElementById('makeSoupButton');
    if (makeSoupButton) {
        makeSoupButton.addEventListener('click', makeChiliSoup);
    }
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('tab-' + targetTab).classList.add('active');
        });
    });
    
    document.querySelectorAll('.main-tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-main-tab');
            document.querySelectorAll('.main-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.main-tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('main-' + targetTab).classList.add('active');
        });
    });
    
    setInterval(() => {
        if (gameState.beansPerSecond > 0) {
            const boosts = getActiveBoostMultipliers();
            const beansToAdd = (gameState.beansPerSecond / 10) * boosts.productionMultiplier;
            gameState.beans += beansToAdd;
            gameState.totalBeansAllTime += beansToAdd;
            updateDisplay();
            
            // Add ambient sparkles when producing beans
            if (Math.random() < 0.05 && gameState.beansPerSecond > 10) {
                createRandomSparkle();
            }
        }
    }, 100);
    
    setInterval(() => {
        updateUpgradeButtons();
    }, 1000);
    
    setInterval(() => {
        if (gameState.autoClickerEnabled) {
            handleBeanClick();
        }
    }, 1000);
    
    setInterval(() => {
        const boosts = getActiveBoostMultipliers();
        const spawnChance = boosts.luckyActive ? 0.5 : 0.1;
        if (Math.random() < spawnChance) {
            spawnGoldenBean();
        }
    }, 10000);
    
    setInterval(() => {
        updateGardenDisplay();
    }, 1000);
    
    setInterval(() => {
        updateBoostDisplay();
    }, 1000);
    
    setInterval(saveGame, 30000);
    
    // Add tooltip functionality
    setupTooltips();
}

// Tooltip system
function setupTooltips() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    document.querySelectorAll('.upgrade-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const upgradeType = card.querySelector('.buy-button')?.getAttribute('data-upgrade');
            if (!upgradeType) return;
            
            const upgrade = gameState.upgrades[upgradeType];
            const cost = getUpgradeCost(upgradeType);
            const owned = upgrade.count;
            
            let tooltipHTML = `<div class="tooltip-title">${card.querySelector('h3')?.textContent || ''}</div>`;
            
            if (upgrade.clickBonus) {
                const totalBonus = upgrade.clickBonus * (owned + 1);
                tooltipHTML += `<div class="tooltip-detail">Click Bonus: +${formatNumber(upgrade.clickBonus)}</div>`;
                tooltipHTML += `<div class="tooltip-detail">Next Total: ${formatNumber(gameState.beansPerClick + upgrade.clickBonus)}/click</div>`;
            }
            
            if (upgrade.production) {
                const totalProduction = upgrade.production * (owned + 1);
                tooltipHTML += `<div class="tooltip-detail">Production: +${formatNumber(upgrade.production)}/sec</div>`;
                tooltipHTML += `<div class="tooltip-detail">Next Total: ${formatNumber(gameState.beansPerSecond + upgrade.production)}/sec</div>`;
            }
            
            tooltipHTML += `<div class="tooltip-detail">Owned: ${owned}</div>`;
            tooltipHTML += `<div class="tooltip-detail">Cost: ${formatNumber(cost)} beans</div>`;
            
            tooltip.innerHTML = tooltipHTML;
            tooltip.classList.add('visible');
        });
        
        card.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        });
        
        card.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

// ===== SPARKLE EFFECTS =====
function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'random-sparkle';
    sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 3000);
}

// Create sparkle at specific position
function createSparkleAt(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'random-sparkle';
    sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
    sparkle.style.position = 'fixed';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 3000);
}

// Create wave effect
function createWaveEffect() {
    const wave = document.createElement('div');
    wave.style.position = 'fixed';
    wave.style.bottom = '0';
    wave.style.left = '0';
    wave.style.width = '100%';
    wave.style.height = '200px';
    wave.style.background = 'linear-gradient(0deg, rgba(99,102,241,0.1), transparent)';
    wave.style.animation = 'waveRise 2s ease-out forwards';
    wave.style.pointerEvents = 'none';
    wave.style.zIndex = '9999';
    document.body.appendChild(wave);
    
    setTimeout(() => wave.remove(), 2000);
}

// Create impact wave on click
function createImpactWave(x, y) {
    const impact = document.createElement('div');
    impact.className = 'impact-wave';
    impact.style.left = (x - 75) + 'px';
    impact.style.top = (y - 75) + 'px';
    impact.style.position = 'fixed';
    document.body.appendChild(impact);
    setTimeout(() => impact.remove(), 600);
    
    // Add light burst effect
    const burst = document.createElement('div');
    burst.className = 'light-burst';
    burst.style.left = (x - 100) + 'px';
    burst.style.top = (y - 100) + 'px';
    burst.style.position = 'fixed';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 400);
}

// Create sparkles periodically
setInterval(createRandomSparkle, 2000);

// Create wave effect periodically when producing beans
setInterval(() => {
    if (gameState.beansPerSecond > 100) {
        createWaveEffect();
    }
}, 10000);

// Add floating coins animation periodically
setInterval(() => {
    if (gameState.beansPerSecond > 0) {
        const coinCount = Math.min(3, Math.floor(gameState.beansPerSecond / 1000) + 1);
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => createFloatingCoins(1), i * 200);
        }
    }
}, 5000);

// Initialize ambient moving elements
function createAmbientElements() {
    // Create 4 floating geometric shapes
    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    shapes.forEach((shape, i) => {
        const elem = document.createElement('div');
        elem.className = `floating-shape floating-${shape}`;
        elem.style.left = (20 + i * 20) + '%';
        elem.style.top = (20 + i * 15) + '%';
        document.body.appendChild(elem);
    });
    
    // Create 6 drifting dots with different animations
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'drifting-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animation = `drift${(i % 3) + 1} ${15 + Math.random() * 10}s linear infinite`;
        dot.style.animationDelay = (i * 2) + 's';
        document.body.appendChild(dot);
    }
    
    // Create 3 pulsing rings at different positions
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'pulsing-ring';
        ring.style.width = (80 + i * 40) + 'px';
        ring.style.height = (80 + i * 40) + 'px';
        ring.style.left = (10 + i * 35) + '%';
        ring.style.top = (20 + i * 25) + '%';
        ring.style.animationDelay = (i * 1.3) + 's';
        document.body.appendChild(ring);
    }
    
    // Create 3 floating horizontal lines
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.className = 'floating-line';
        line.style.width = (200 + Math.random() * 200) + 'px';
        line.style.top = (20 + i * 30) + '%';
        line.style.animationDelay = (i * 5) + 's';
        line.style.animationDuration = (15 + Math.random() * 10) + 's';
        document.body.appendChild(line);
    }
    
    // Create 2 rotating gradient orbs
    for (let i = 0; i < 2; i++) {
        const orb = document.createElement('div');
        orb.className = 'rotating-orb';
        orb.style.left = (i * 70 + 15) + '%';
        orb.style.top = (i * 60 + 20) + '%';
        orb.style.animationDelay = (i * 10) + 's';
        document.body.appendChild(orb);
    }
    
    // Create 3 bouncing diamonds
    for (let i = 0; i < 3; i++) {
        const diamond = document.createElement('div');
        diamond.className = 'bouncing-diamond';
        diamond.style.left = (15 + i * 30) + '%';
        diamond.style.top = (70 + i * 5) + '%';
        diamond.style.animationDelay = (i * 2.5) + 's';
        document.body.appendChild(diamond);
    }
    
    // Create expanding circles that spawn periodically
    setInterval(() => {
        const circle = document.createElement('div');
        circle.className = 'expanding-circle';
        circle.style.left = (Math.random() * 80 + 10) + '%';
        circle.style.top = (Math.random() * 80 + 10) + '%';
        document.body.appendChild(circle);
        setTimeout(() => circle.remove(), 6000);
    }, 4000);
    
    // Create shooting stars
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = (Math.random() * 50 + 50) + '%';
        star.style.top = (Math.random() * 50) + '%';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 3000);
    }, 5000);
    
    // Create floating bubbles
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'floating-bubble';
        const size = 30 + Math.random() * 50;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (Math.random() * 100) + '%';
        bubble.style.bottom = '-50px';
        bubble.style.animationDuration = (10 + Math.random() * 8) + 's';
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 18000);
    }, 3000);
}

window.addEventListener('load', () => {
    init();
    createAmbientElements();
});

