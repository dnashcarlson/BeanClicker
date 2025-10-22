// ===== GAME STATE =====
let gameState = {
    beans: 0,
    beansPerClick: 1,
    beansPerSecond: 0,
    paradigmShifts: 0,
    totalBeansAllTime: 0,
    achievements: [],
    comboMultiplier: 1,
    comboClicks: 0,
    lastClickTime: 0,
    activeBoosts: [],
    autoClickerEnabled: false,
    autoClickerUnlocked: false,
    garden: { plots: [null, null, null, null] },
    stats: {
        totalClicks: 0,
        goldenBeansClicked: 0,
        highestCombo: 0,
        gardenHarvests: 0
    },
    upgrades: {
        cursor: { count: 0, baseCost: 10, multiplier: 1.2, clickBonus: 1 },
        cursor2: { count: 0, baseCost: 30, multiplier: 1.25, clickBonus: 2 },
        reinforcedFinger: { count: 0, baseCost: 100, multiplier: 1.25, clickBonus: 5 },
        ironFist: { count: 0, baseCost: 250, multiplier: 1.3, clickBonus: 10 },
        goldenTouch: { count: 0, baseCost: 800, multiplier: 1.3, clickBonus: 20 },
        diamondHand: { count: 0, baseCost: 2500, multiplier: 1.35, clickBonus: 40 },
        titanicGrip: { count: 0, baseCost: 8000, multiplier: 1.35, clickBonus: 80 },
        cosmicPointer: { count: 0, baseCost: 25000, multiplier: 1.35, clickBonus: 160 },
        divineClick: { count: 0, baseCost: 80000, multiplier: 1.4, clickBonus: 320 },
        omnipotentTouch: { count: 0, baseCost: 250000, multiplier: 1.4, clickBonus: 640 },
        infiniteFinger: { count: 0, baseCost: 800000, multiplier: 1.4, clickBonus: 1280 },
        universalClicker: { count: 0, baseCost: 2500000, multiplier: 1.4, clickBonus: 2560 },
        quantumHand: { count: 0, baseCost: 8000000, multiplier: 1.45, clickBonus: 5120 },
        seedling: { count: 0, baseCost: 25, multiplier: 1.2, production: 2 },
        grandma: { count: 0, baseCost: 80, multiplier: 1.25, production: 5 },
        gardener: { count: 0, baseCost: 200, multiplier: 1.25, production: 12 },
        farm: { count: 0, baseCost: 600, multiplier: 1.25, production: 30 },
        greenhouse: { count: 0, baseCost: 1800, multiplier: 1.25, production: 70 },
        factory: { count: 0, baseCost: 5000, multiplier: 1.25, production: 180 },
        plantation: { count: 0, baseCost: 15000, multiplier: 1.25, production: 450 },
        mine: { count: 0, baseCost: 45000, multiplier: 1.25, production: 1100 },
        biolab: { count: 0, baseCost: 130000, multiplier: 1.25, production: 2600 },
        megafarm: { count: 0, baseCost: 400000, multiplier: 1.25, production: 6500 },
        continent: { count: 0, baseCost: 1200000, multiplier: 1.25, production: 16000 },
        planet: { count: 0, baseCost: 3600000, multiplier: 1.25, production: 40000 },
        galaxy: { count: 0, baseCost: 11000000, multiplier: 1.25, production: 100000 },
        alchemist: { count: 0, baseCost: 50000, multiplier: 1.25, production: 900 },
        wizard: { count: 0, baseCost: 150000, multiplier: 1.25, production: 2200 },
        sorcerer: { count: 0, baseCost: 450000, multiplier: 1.25, production: 5500 },
        portal: { count: 0, baseCost: 1300000, multiplier: 1.25, production: 13000 },
        dimensionalRift: { count: 0, baseCost: 4000000, multiplier: 1.25, production: 32000 },
        timeMachine: { count: 0, baseCost: 12000000, multiplier: 1.25, production: 80000 },
        quantumComputer: { count: 0, baseCost: 36000000, multiplier: 1.25, production: 200000 },
        blackHole: { count: 0, baseCost: 110000000, multiplier: 1.25, production: 500000 },
        multiverse: { count: 0, baseCost: 330000000, multiplier: 1.25, production: 1200000 },
        realityBender: { count: 0, baseCost: 1000000000, multiplier: 1.25, production: 3000000 },
        godMode: { count: 0, baseCost: 3000000000, multiplier: 1.25, production: 7500000 },
        transcendence: { count: 0, baseCost: 9000000000, multiplier: 1.25, production: 18000000 },
        infinity: { count: 0, baseCost: 27000000000, multiplier: 1.25, production: 45000000 }
    }
};

const achievements = [
    { id: 'first_bean', name: 'First Bean', description: 'Click the bean for the first time', condition: () => gameState.stats.totalClicks >= 1, reward: 10 },
    { id: 'click_master', name: 'Click Master', description: 'Click 100 times', condition: () => gameState.stats.totalClicks >= 100, reward: 100 },
    { id: 'click_legend', name: 'Click Legend', description: 'Click 1000 times', condition: () => gameState.stats.totalClicks >= 1000, reward: 1000 },
    { id: 'hoarder', name: 'Bean Hoarder', description: 'Accumulate 10,000 beans', condition: () => gameState.beans >= 10000, reward: 500 },
    { id: 'millionaire', name: 'Bean Millionaire', description: 'Accumulate 1,000,000 beans', condition: () => gameState.beans >= 1000000, reward: 50000 },
    { id: 'combo_starter', name: 'Combo Starter', description: 'Reach a 5x combo', condition: () => gameState.stats.highestCombo >= 5, reward: 250 },
    { id: 'combo_master', name: 'Combo Master', description: 'Reach a 10x combo', condition: () => gameState.stats.highestCombo >= 10, reward: 2500 },
    { id: 'golden_hunter', name: 'Golden Hunter', description: 'Click 10 golden beans', condition: () => gameState.stats.goldenBeansClicked >= 10, reward: 5000 },
    { id: 'automation', name: 'Automated Future', description: 'Unlock the auto-clicker', condition: () => gameState.autoClickerUnlocked, reward: 1000 },
    { id: 'gardener', name: 'Master Gardener', description: 'Harvest from the garden 10 times', condition: () => gameState.stats.gardenHarvests >= 10, reward: 10000 }
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
    const paradigmBonus = 1 + (gameState.paradigmShifts * 50 / 100);
    return total * paradigmBonus;
}

function calculateBeansPerClick() {
    let total = 1;
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        if (upgrade.clickBonus) {
            total += upgrade.count * upgrade.clickBonus;
        }
    }
    const paradigmBonus = 1 + (gameState.paradigmShifts * 50 / 100);
    return total * paradigmBonus;
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

function handleBeanClick() {
    gameState.stats.totalClicks++;
    updateCombo();
    
    const boosts = getActiveBoostMultipliers();
    const beansGained = gameState.beansPerClick * gameState.comboMultiplier * boosts.clickMultiplier;
    
    gameState.beans += beansGained;
    gameState.totalBeansAllTime += beansGained;
    
    updateAll();
    checkAchievements();
    createClickEffect();
    
    const beanButton = document.getElementById('beanButton');
    if (beanButton) {
        beanButton.style.transform = 'scale(0.9)';
        
        // Add combo glow effect
        if (gameState.comboMultiplier > 1) {
            const glowIntensity = Math.min(gameState.comboMultiplier * 20, 60);
            beanButton.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 215, 0, 1)) brightness(${1 + gameState.comboMultiplier * 0.1})`;
            
            // Bean bounce for high combos
            if (gameState.comboMultiplier >= 5) {
                beanButton.classList.add('bean-bounce');
                setTimeout(() => beanButton.classList.remove('bean-bounce'), 600);
            }
        }
        
        setTimeout(() => {
            beanButton.style.transform = '';
        }, 100);
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

function createClickEffect() {
    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.textContent = '+' + formatNumber(gameState.beansPerClick);
    
    const beanButton = document.getElementById('beanButton');
    const beanRect = beanButton.getBoundingClientRect();
    const centerX = beanRect.left + beanRect.width / 2;
    const centerY = beanRect.top + beanRect.height / 2;
    
    clickText.style.left = centerX + 'px';
    clickText.style.top = centerY + 'px';
    clickText.style.position = 'fixed';
    
    document.body.appendChild(clickText);
    setTimeout(() => clickText.remove(), 1000);
    
    // Add particle effect
    createParticles(centerX, centerY);
}

// Create particle effects when clicking
function createParticles(x, y) {
    const particleCount = 6 + Math.floor(Math.random() * 4); // 6-9 particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'fixed';
        
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = 40 + Math.random() * 60;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 600);
    }
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (x - 100) + 'px';
    ripple.style.top = (y - 100) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

function updateCombo() {
    const now = Date.now();
    const timeSinceLastClick = now - gameState.lastClickTime;
    
    if (timeSinceLastClick < 500) {
        gameState.comboClicks++;
        gameState.comboMultiplier = 1 + (gameState.comboClicks * 0.1);
        if (gameState.comboMultiplier > gameState.stats.highestCombo) {
            gameState.stats.highestCombo = gameState.comboMultiplier;
        }
    } else {
        gameState.comboClicks = 0;
        gameState.comboMultiplier = 1;
    }
    gameState.lastClickTime = now;
    updateComboDisplay();
}

function updateComboDisplay() {
    const comboDisplay = document.getElementById('comboDisplay');
    const beanButton = document.getElementById('beanButton');
    
    if (comboDisplay) {
        if (gameState.comboMultiplier > 1) {
            comboDisplay.textContent = '🔥 ' + gameState.comboMultiplier.toFixed(1) + 'x COMBO!';
            comboDisplay.style.display = 'flex';
            
            // Enable cursor trail for high combos
            trailEnabled = gameState.comboMultiplier >= 3;
            
            // Add rainbow glow to bean for very high combos
            if (gameState.comboMultiplier >= 5 && beanButton) {
                beanButton.classList.add('rainbow-glow');
            } else if (beanButton) {
                beanButton.classList.remove('rainbow-glow');
            }
            
            // Add screen shake for high combos
            if (gameState.comboMultiplier >= 5 && gameState.comboClicks % 5 === 0) {
                triggerScreenShake();
            }
            
            // Add confetti for milestone combos
            if (gameState.comboMultiplier >= 10 && gameState.comboClicks % 10 === 0) {
                createConfetti(50);
            }
        } else {
            comboDisplay.style.display = 'none';
            trailEnabled = false;
            if (beanButton) {
                beanButton.classList.remove('rainbow-glow');
            }
        }
    }
}

// Screen shake effect
function triggerScreenShake() {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
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
            
            // Small celebration for normal upgrades
            createFloatingCoins(centerX, centerY, 3);
            
            // Big celebration for expensive upgrades
            if (cost >= 1000000) {
                triggerScreenFlash();
                createConfetti(30);
                triggerScreenShake();
            } else if (cost >= 100000) {
                createConfetti(15);
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
    updateParadigmDisplay();
    updateAutoClickerDisplay();
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

function calculateParadigmShiftGain() {
    return Math.floor(gameState.totalBeansAllTime / 1000000000);
}

function updateParadigmDisplay() {
    const shiftsGained = calculateParadigmShiftGain();
    const newShifts = shiftsGained - gameState.paradigmShifts;
    const bonus = gameState.paradigmShifts * 50;
    
    document.getElementById('paradigmGain').textContent = newShifts > 0 ? newShifts : 0;
    document.getElementById('paradigmBonus').textContent = '+' + bonus + '%';
    document.getElementById('paradigmCount').textContent = gameState.paradigmShifts;
    
    const paradigmStat = document.getElementById('paradigmStat');
    if (gameState.paradigmShifts > 0 || shiftsGained > 0) {
        paradigmStat.style.display = 'flex';
    }
    
    const paradigmButton = document.getElementById('paradigmButton');
    paradigmButton.disabled = newShifts <= 0;
    
    if (newShifts > 0) {
        paradigmButton.textContent = '🌀 Paradigm Shift (+' + newShifts + ')';
    } else {
        paradigmButton.textContent = '🌀 Paradigm Shift (Not Ready)';
    }
}

function performParadigmShift() {
    const shiftsGained = calculateParadigmShiftGain();
    const newShifts = shiftsGained - gameState.paradigmShifts;
    
    if (newShifts <= 0) {
        alert('You need to earn more beans! (1 billion total beans = 1 shift)');
        return;
    }
    
    if (!confirm('Perform Paradigm Shift?\n\nYou will gain ' + newShifts + ' shift(s) and +' + (newShifts * 50) + '% permanent production bonus!\n\nThis will reset all upgrades and beans (except shifts).')) {
        return;
    }
    
    gameState.paradigmShifts = shiftsGained;
    gameState.beans = 0;
    
    for (let key in gameState.upgrades) {
        gameState.upgrades[key].count = 0;
    }
    
    updateAll();
    saveGame();
    
    document.getElementById('settingsModal').classList.remove('active');
    alert('Paradigm Shift complete! 🌀\n\nYou now have ' + gameState.paradigmShifts + ' shift(s)\n+' + (gameState.paradigmShifts * 50) + '% to all production!');
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
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = '<div class="achievement-title">🏆 Achievement Unlocked!</div><div class="achievement-name">' + achievement.name + '</div><div class="achievement-desc">' + achievement.description + '</div><div class="achievement-reward">+' + formatNumber(achievement.reward) + ' beans</div>';
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function updateAchievementDisplay() {
    const achievementContainer = document.getElementById('achievementsList');
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
    updateComboDisplay();
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
    document.getElementById('paradigmButton').addEventListener('click', performParadigmShift);
    
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
    
    document.querySelectorAll('.mechanics-tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-mechanics-tab');
            document.querySelectorAll('.mechanics-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.mechanics-tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('mechanics-' + targetTab).classList.add('active');
        });
    });
    
    setInterval(() => {
        if (gameState.beansPerSecond > 0) {
            const boosts = getActiveBoostMultipliers();
            const beansToAdd = (gameState.beansPerSecond / 10) * boosts.productionMultiplier;
            gameState.beans += beansToAdd;
            gameState.totalBeansAllTime += beansToAdd;
            updateDisplay();
        }
    }, 100);
    
    setInterval(() => {
        updateUpgradeButtons();
        updateParadigmDisplay();
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

// Create sparkles periodically
setInterval(createRandomSparkle, 2000);

// Add floating coins animation periodically
setInterval(() => {
    if (gameState.beansPerSecond > 0) {
        const coinCount = Math.min(3, Math.floor(gameState.beansPerSecond / 1000) + 1);
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => createFloatingCoins(1), i * 200);
        }
    }
}, 5000);

window.addEventListener('load', init);

