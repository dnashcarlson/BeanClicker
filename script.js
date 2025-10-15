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
        setTimeout(() => {
            beanButton.style.transform = '';
        }, 100);
    }
}

function createClickEffect() {
    const clickText = document.createElement('div');
    clickText.className = 'click-text';
    clickText.textContent = '+' + formatNumber(gameState.beansPerClick);
    
    const beanButton = document.getElementById('beanButton');
    const beanRect = beanButton.getBoundingClientRect();
    clickText.style.left = (beanRect.left + beanRect.width / 2) + 'px';
    clickText.style.top = (beanRect.top + beanRect.height / 2) + 'px';
    clickText.style.position = 'fixed';
    
    document.body.appendChild(clickText);
    setTimeout(() => clickText.remove(), 1000);
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
    if (comboDisplay) {
        if (gameState.comboMultiplier > 1) {
            comboDisplay.textContent = '🔥 ' + gameState.comboMultiplier.toFixed(1) + 'x COMBO!';
            comboDisplay.style.display = 'flex';
        } else {
            comboDisplay.style.display = 'none';
        }
    }
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
        updateAll();
        checkAchievements();
        saveGame();
        return true;
    }
    return false;
}

function updateDisplay() {
    document.getElementById('beanCount').textContent = formatNumber(gameState.beans);
    document.getElementById('beansPerSecond').textContent = formatNumber(gameState.beansPerSecond);
    document.getElementById('beansPerClick').textContent = formatNumber(gameState.beansPerClick);
    
    for (let key in gameState.upgrades) {
        const upgrade = gameState.upgrades[key];
        const cost = getUpgradeCost(key);
        const costEl = document.getElementById('cost-' + key);
        const ownedEl = document.getElementById('owned-' + key);
        if (costEl) costEl.textContent = formatNumber(cost);
        if (ownedEl) ownedEl.textContent = upgrade.count;
    }
}

function updateUpgradeButtons() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        const upgradeType = button.getAttribute('data-upgrade');
        const cost = getUpgradeCost(upgradeType);
        const card = button.closest('.upgrade-card');
        
        if (gameState.beans >= cost) {
            button.disabled = false;
            if (card) card.classList.remove('disabled');
        } else {
            button.disabled = true;
            if (card) card.classList.add('disabled');
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
                button.textContent = 'Bought!';
                setTimeout(() => { button.textContent = 'Buy'; }, 300);
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
}

window.addEventListener('load', init);
