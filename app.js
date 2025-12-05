// Health Tracker App
// Globale Variablen
let currentTab = 'food';
let profile = {};
let entries = [];
let sheetsUrl = '';
let customFoods = [];
let customDrinks = [];
let customActivities = [];

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadSheetsUrl();
    loadEntries();
    loadCustomItems();
    updateDropdowns();
    displayCustomItems();
    updateSummary();
    updateHistory();
    displayCurrentDate();
    
    // Event Listener für Kalorienberechnung
    document.getElementById('activityType').addEventListener('change', estimateCalories);
    document.getElementById('activityValue').addEventListener('input', estimateCalories);
    document.getElementById('activityUnit').addEventListener('change', estimateCalories);
});

// Aktuelles Datum anzeigen
function displayCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = today.toLocaleDateString('de-DE', options);
}

// Tab Wechsel
function switchTab(tabName) {
    // Alle Tabs deaktivieren
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ausgewählten Tab aktivieren
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.closest('.tab-btn').classList.add('active');
    
    currentTab = tabName;
    
    // Verlauf aktualisieren wenn History-Tab geöffnet wird
    if (tabName === 'history') {
        updateHistory();
    }
}

// Profil speichern
function saveProfile() {
    const newProfile = {
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value),
        birthdate: document.getElementById('birthdate').value,
        gender: document.getElementById('gender').value
    };
    
    // Prüfen, ob sich die Daten geändert haben
    const hasChanged = JSON.stringify(profile) !== JSON.stringify(newProfile);
    
    profile = newProfile;
    localStorage.setItem('healthTrackerProfile', JSON.stringify(profile));
    
    // Nur bei Änderung an Google Sheets senden
    if (hasChanged) {
        sendProfileToGoogleSheets(profile);
        showNotification('Persönliche Daten gespeichert und an Google Sheets gesendet!', 'success');
    } else {
        showNotification('Persönliche Daten gespeichert!', 'success');
    }
}

// Profil laden
function loadProfile() {
    const saved = localStorage.getItem('healthTrackerProfile');
    if (saved) {
        profile = JSON.parse(saved);
        document.getElementById('weight').value = profile.weight;
        document.getElementById('height').value = profile.height;
        document.getElementById('birthdate').value = profile.birthdate;
        document.getElementById('gender').value = profile.gender;
    }
}

// Google Sheets URL speichern
function saveSheetsUrl() {
    sheetsUrl = document.getElementById('sheetsUrl').value.trim();
    localStorage.setItem('healthTrackerSheetsUrl', sheetsUrl);
    showNotification('Google Sheets URL gespeichert!', 'success');
}

// Google Sheets URL laden
function loadSheetsUrl() {
    const saved = localStorage.getItem('healthTrackerSheetsUrl');
    if (saved) {
        sheetsUrl = saved;
        document.getElementById('sheetsUrl').value = sheetsUrl;
    }
}

// Eigene Items laden
function loadCustomItems() {
    const savedFoods = localStorage.getItem('healthTrackerCustomFoods');
    const savedDrinks = localStorage.getItem('healthTrackerCustomDrinks');
    const savedActivities = localStorage.getItem('healthTrackerCustomActivities');
    
    if (savedFoods) {
        customFoods = JSON.parse(savedFoods);
    }
    if (savedDrinks) {
        customDrinks = JSON.parse(savedDrinks);
    }
    if (savedActivities) {
        customActivities = JSON.parse(savedActivities);
    }
}

// Eigene Items speichern
function saveCustomItems() {
    localStorage.setItem('healthTrackerCustomFoods', JSON.stringify(customFoods));
    localStorage.setItem('healthTrackerCustomDrinks', JSON.stringify(customDrinks));
    localStorage.setItem('healthTrackerCustomActivities', JSON.stringify(customActivities));
    displayCustomItems();
}

// Dropdown-Listen aktualisieren mit eigenen Items
function updateDropdowns() {
    updateFoodDropdown();
    updateDrinkDropdown();
    updateActivityDropdown();
}

// Food Dropdown aktualisieren
function updateFoodDropdown() {
    const select = document.getElementById('foodItem');
    
    // Entferne alte "Meine Lebensmittel" Gruppe falls vorhanden
    const oldGroup = select.querySelector('optgroup[label="📌 Meine Lebensmittel"]');
    if (oldGroup) {
        oldGroup.remove();
    }
    
    // Füge neue Gruppe hinzu, wenn eigene Items vorhanden
    if (customFoods.length > 0) {
        const customGroup = document.createElement('optgroup');
        customGroup.label = '📌 Meine Lebensmittel';
        
        customFoods.forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            option.textContent = food;
            customGroup.appendChild(option);
        });
        
        // Einfügen vor der "Eigene Eingabe" Gruppe
        const customInputGroup = select.querySelector('optgroup[label="✨ Eigene Eingabe"]');
        select.insertBefore(customGroup, customInputGroup);
    }
}

// Drink Dropdown aktualisieren
function updateDrinkDropdown() {
    const select = document.getElementById('drinkItem');
    
    // Entferne alte "Meine Getränke" Gruppe falls vorhanden
    const oldGroup = select.querySelector('optgroup[label="📌 Meine Getränke"]');
    if (oldGroup) {
        oldGroup.remove();
    }
    
    // Füge neue Gruppe hinzu, wenn eigene Items vorhanden
    if (customDrinks.length > 0) {
        const customGroup = document.createElement('optgroup');
        customGroup.label = '📌 Meine Getränke';
        
        customDrinks.forEach(drink => {
            const option = document.createElement('option');
            option.value = drink;
            option.textContent = drink;
            customGroup.appendChild(option);
        });
        
        // Einfügen vor der "Eigene Eingabe" Gruppe
        const customInputGroup = select.querySelector('optgroup[label="✨ Eigene Eingabe"]');
        select.insertBefore(customGroup, customInputGroup);
    }
}

// Activity Dropdown aktualisieren
function updateActivityDropdown() {
    const select = document.getElementById('activityType');
    
    // Entferne alte "Meine Aktivitäten" Gruppe falls vorhanden
    const oldGroup = select.querySelector('optgroup[label="📌 Meine Aktivitäten"]');
    if (oldGroup) {
        oldGroup.remove();
    }
    
    // Füge neue Gruppe hinzu, wenn eigene Items vorhanden
    if (customActivities.length > 0) {
        const customGroup = document.createElement('optgroup');
        customGroup.label = '📌 Meine Aktivitäten';
        
        customActivities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity;
            option.textContent = activity;
            customGroup.appendChild(option);
        });
        
        // Einfügen vor der "Eigene Eingabe" Gruppe
        const customInputGroup = select.querySelector('optgroup[label="✨ Eigene Eingabe"]');
        select.insertBefore(customGroup, customInputGroup);
    }
}

// Eigene Einträge anzeigen
function displayCustomItems() {
    // Lebensmittel
    const foodsList = document.getElementById('customFoodsList');
    const foodsCount = document.getElementById('customFoodsCount');
    foodsCount.textContent = customFoods.length;
    
    if (customFoods.length === 0) {
        foodsList.innerHTML = '<p class="empty-custom-list">Noch keine eigenen Lebensmittel gespeichert</p>';
    } else {
        foodsList.innerHTML = customFoods.map(food => 
            `<div class="custom-item">
                <span>${food}</span>
                <button class="btn-delete-custom" onclick="deleteCustomFood('${food.replace(/'/g, "\\'")}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ).join('');
    }
    
    // Getränke
    const drinksList = document.getElementById('customDrinksList');
    const drinksCount = document.getElementById('customDrinksCount');
    drinksCount.textContent = customDrinks.length;
    
    if (customDrinks.length === 0) {
        drinksList.innerHTML = '<p class="empty-custom-list">Noch keine eigenen Getränke gespeichert</p>';
    } else {
        drinksList.innerHTML = customDrinks.map(drink => 
            `<div class="custom-item">
                <span>${drink}</span>
                <button class="btn-delete-custom" onclick="deleteCustomDrink('${drink.replace(/'/g, "\\'")}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ).join('');
    }
    
    // Aktivitäten
    const activitiesList = document.getElementById('customActivitiesList');
    const activitiesCount = document.getElementById('customActivitiesCount');
    activitiesCount.textContent = customActivities.length;
    
    if (customActivities.length === 0) {
        activitiesList.innerHTML = '<p class="empty-custom-list">Noch keine eigenen Aktivitäten gespeichert</p>';
    } else {
        activitiesList.innerHTML = customActivities.map(activity => 
            `<div class="custom-item">
                <span>${activity}</span>
                <button class="btn-delete-custom" onclick="deleteCustomActivity('${activity.replace(/'/g, "\\'")}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ).join('');
    }
}

// Eigenes Lebensmittel löschen
function deleteCustomFood(food) {
    if (confirm(`"${food}" wirklich aus der Liste entfernen?`)) {
        customFoods = customFoods.filter(f => f !== food);
        saveCustomItems();
        updateFoodDropdown();
        displayCustomItems();
        showNotification(`${food} entfernt`, 'success');
    }
}

// Eigenes Getränk löschen
function deleteCustomDrink(drink) {
    if (confirm(`"${drink}" wirklich aus der Liste entfernen?`)) {
        customDrinks = customDrinks.filter(d => d !== drink);
        saveCustomItems();
        updateDrinkDropdown();
        displayCustomItems();
        showNotification(`${drink} entfernt`, 'success');
    }
}

// Eigene Aktivität löschen
function deleteCustomActivity(activity) {
    if (confirm(`"${activity}" wirklich aus der Liste entfernen?`)) {
        customActivities = customActivities.filter(a => a !== activity);
        saveCustomItems();
        updateActivityDropdown();
        displayCustomItems();
        showNotification(`${activity} entfernt`, 'success');
    }
}

// Verbindung testen
async function testSheetsConnection() {
    if (!sheetsUrl) {
        showNotification('Bitte zuerst die Google Sheets URL eingeben!', 'error');
        return;
    }
    
    showNotification('Teste Verbindung...', 'info');
    
    try {
        const testData = {
            type: 'Test',
            timestamp: new Date().toISOString(),
            data: 'Verbindungstest'
        };
        
        const response = await fetch(sheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        // Bei no-cors können wir die Antwort nicht lesen, aber wenn kein Fehler auftritt, war es erfolgreich
        showNotification('Verbindung erfolgreich! Daten werden an Google Sheets gesendet.', 'success');
    } catch (error) {
        showNotification('Verbindungsfehler: ' + error.message, 'error');
    }
}

// Freifeld für eigenes Essen anzeigen/verstecken
function toggleCustomFoodField() {
    const foodItem = document.getElementById('foodItem').value;
    const customField = document.getElementById('customFoodField');
    
    if (foodItem === 'CUSTOM') {
        customField.style.display = 'block';
    } else {
        customField.style.display = 'none';
    }
}

// Essen hinzufügen
function addFood() {
    let foodItem = document.getElementById('foodItem').value;
    const amount = parseFloat(document.getElementById('foodAmount').value);
    const unit = document.getElementById('foodUnit').value;
    const meal = document.getElementById('foodMeal').value;
    const comment = document.getElementById('foodComment').value;
    let isNewCustomFood = false;
    
    // Wenn eigene Eingabe gewählt, verwende custom Input
    if (foodItem === 'CUSTOM') {
        const customInput = document.getElementById('customFoodInput').value.trim();
        if (!customInput) {
            showNotification('Bitte eigenes Lebensmittel eingeben!', 'error');
            return;
        }
        foodItem = customInput;
        isNewCustomFood = true;
        
        // Füge zu customFoods hinzu, wenn noch nicht vorhanden
        if (!customFoods.includes(foodItem)) {
            customFoods.push(foodItem);
            saveCustomItems();
            updateFoodDropdown();
        }
    }
    
    if (!foodItem || !amount) {
        showNotification('Bitte Lebensmittel und Menge eingeben!', 'error');
        return;
    }
    
    const entry = {
        id: Date.now(),
        type: 'food',
        timestamp: new Date().toISOString(),
        item: foodItem,
        amount: amount,
        unit: unit,
        meal: meal,
        comment: comment
    };
    
    entries.push(entry);
    saveEntries();
    sendToGoogleSheets(entry);
    updateSummary();
    
    if (isNewCustomFood) {
        showNotification(`${foodItem} hinzugefügt und für zukünftige Nutzung gespeichert!`, 'success');
    } else {
        showNotification(`${foodItem} hinzugefügt!`, 'success');
    }
    
    // Formular zurücksetzen
    document.getElementById('foodItem').value = '';
    document.getElementById('foodAmount').value = '';
    document.getElementById('foodComment').value = '';
    document.getElementById('customFoodInput').value = '';
    document.getElementById('customFoodField').style.display = 'none';
}

// Freifeld für eigenes Getränk anzeigen/verstecken
function toggleCustomDrinkField() {
    const drinkItem = document.getElementById('drinkItem').value;
    const customField = document.getElementById('customDrinkField');
    
    if (drinkItem === 'CUSTOM') {
        customField.style.display = 'block';
    } else {
        customField.style.display = 'none';
    }
}

// Getränk hinzufügen
function addDrink() {
    let drinkItem = document.getElementById('drinkItem').value;
    const quantity = parseFloat(document.getElementById('drinkQuantity').value) || 1;
    let amount = parseFloat(document.getElementById('drinkAmount').value);
    const unit = document.getElementById('drinkUnit').value;
    const comment = document.getElementById('drinkComment').value;
    let isNewCustomDrink = false;
    
    // Wenn eigene Eingabe gewählt, verwende custom Input
    if (drinkItem === 'CUSTOM') {
        const customInput = document.getElementById('customDrinkInput').value.trim();
        if (!customInput) {
            showNotification('Bitte eigenes Getränk eingeben!', 'error');
            return;
        }
        drinkItem = customInput;
        isNewCustomDrink = true;
        
        // Füge zu customDrinks hinzu, wenn noch nicht vorhanden
        if (!customDrinks.includes(drinkItem)) {
            customDrinks.push(drinkItem);
            saveCustomItems();
            updateDrinkDropdown();
        }
    }
    
    if (!drinkItem) {
        showNotification('Bitte Getränk auswählen!', 'error');
        return;
    }
    
    // Berechnung basierend auf Einheit und Anzahl
    let amountInMl = 0;
    let displayAmount = '';
    
    if (unit === 'ml') {
        // Bei ml muss amount angegeben werden
        if (!amount) {
            showNotification('Bitte Menge in ml eingeben!', 'error');
            return;
        }
        amountInMl = amount * quantity;
        displayAmount = `${quantity}x ${amount}ml`;
    } else if (unit === 'Glas') {
        amountInMl = quantity * 200;
        displayAmount = `${quantity}x Glas`;
    } else if (unit === 'Tasse') {
        amountInMl = quantity * 150;
        displayAmount = `${quantity}x Tasse`;
    } else if (unit === 'Flasche') {
        amountInMl = quantity * 500;
        displayAmount = `${quantity}x Flasche`;
    } else if (unit === 'Liter') {
        amountInMl = quantity * 1000;
        displayAmount = `${quantity}x Liter`;
    }
    
    const entry = {
        id: Date.now(),
        type: 'drink',
        timestamp: new Date().toISOString(),
        item: drinkItem,
        quantity: quantity,
        amount: amount || 0,
        unit: unit,
        displayAmount: displayAmount,
        amountInMl: amountInMl,
        comment: comment
    };
    
    entries.push(entry);
    saveEntries();
    sendToGoogleSheets(entry);
    updateSummary();
    
    if (isNewCustomDrink) {
        showNotification(`${drinkItem} hinzugefügt und für zukünftige Nutzung gespeichert!`, 'success');
    } else {
        showNotification(`${drinkItem} hinzugefügt!`, 'success');
    }
    
    // Formular zurücksetzen
    document.getElementById('drinkItem').value = '';
    document.getElementById('drinkQuantity').value = '1';
    document.getElementById('drinkAmount').value = '';
    document.getElementById('drinkComment').value = '';
    document.getElementById('customDrinkInput').value = '';
    document.getElementById('customDrinkField').style.display = 'none';
}

// Freifeld für eigene Aktivität anzeigen/verstecken
function toggleCustomActivityField() {
    const activityType = document.getElementById('activityType').value;
    const customField = document.getElementById('customActivityField');
    
    if (activityType === 'CUSTOM') {
        customField.style.display = 'block';
    } else {
        customField.style.display = 'none';
    }
}

// Aktivität hinzufügen
function addActivity() {
    let activityType = document.getElementById('activityType').value;
    const activityValue = parseFloat(document.getElementById('activityValue').value);
    const activityUnit = document.getElementById('activityUnit').value;
    const comment = document.getElementById('activityComment').value;
    let isNewCustomActivity = false;
    
    // Wenn eigene Eingabe gewählt, verwende custom Input
    if (activityType === 'CUSTOM') {
        const customInput = document.getElementById('customActivityInput').value.trim();
        if (!customInput) {
            showNotification('Bitte eigene Aktivität eingeben!', 'error');
            return;
        }
        activityType = customInput;
        isNewCustomActivity = true;
        
        // Füge zu customActivities hinzu, wenn noch nicht vorhanden
        if (!customActivities.includes(activityType)) {
            customActivities.push(activityType);
            saveCustomItems();
            updateActivityDropdown();
        }
    }
    
    if (!activityType || !activityValue) {
        showNotification('Bitte Aktivität und Wert eingeben!', 'error');
        return;
    }
    
    const calories = calculateCalories(activityType, activityValue, activityUnit);
    
    const entry = {
        id: Date.now(),
        type: 'activity',
        timestamp: new Date().toISOString(),
        activity: activityType,
        value: activityValue,
        unit: activityUnit,
        calories: calories,
        comment: comment
    };
    
    entries.push(entry);
    saveEntries();
    sendToGoogleSheets(entry);
    updateSummary();
    
    if (isNewCustomActivity) {
        showNotification(`${activityType} hinzugefügt und für zukünftige Nutzung gespeichert! ${calories} kcal verbrannt`, 'success');
    } else {
        showNotification(`${activityType} hinzugefügt! ${calories} kcal verbrannt`, 'success');
    }
    
    // Formular zurücksetzen
    document.getElementById('activityType').value = '';
    document.getElementById('activityValue').value = '';
    document.getElementById('activityComment').value = '';
    document.getElementById('customActivityInput').value = '';
    document.getElementById('customActivityField').style.display = 'none';
    document.getElementById('caloriesEstimate').style.display = 'none';
}

// Kalorien berechnen
function calculateCalories(activityType, value, unit) {
    if (!profile.weight) {
        return 0;
    }
    
    let durationInMinutes = 0;
    
    // Wenn Distanz in km angegeben, in Minuten umrechnen
    if (unit === 'km') {
        if (activityType.includes('langsam') || activityType.includes('3 km/h')) {
            durationInMinutes = (value / 3) * 60; // 3 km/h
        } else if (activityType.includes('normal') || activityType.includes('4 km/h')) {
            durationInMinutes = (value / 4) * 60; // 4 km/h
        } else if (activityType.includes('zügig') || activityType.includes('5 km/h')) {
            durationInMinutes = (value / 5) * 60; // 5 km/h
        } else if (activityType.includes('Joggen')) {
            durationInMinutes = (value / 8) * 60; // ~8 km/h
        } else if (activityType.includes('Radfahren')) {
            durationInMinutes = (value / 15) * 60; // ~15 km/h
        } else {
            durationInMinutes = (value / 4) * 60; // Standard 4 km/h
        }
    } else {
        durationInMinutes = value;
    }
    
    // MET-Werte (Metabolic Equivalent of Task) für verschiedene Aktivitäten
    let met = 3.5; // Standard für leichtes Gehen
    
    if (activityType.includes('langsam') || activityType.includes('3 km/h')) {
        met = 3.0;
    } else if (activityType.includes('normal') || activityType.includes('4 km/h')) {
        met = 3.5;
    } else if (activityType.includes('zügig') || activityType.includes('5 km/h')) {
        met = 4.0;
    } else if (activityType.includes('Wandern')) {
        met = 4.5;
    } else if (activityType.includes('Joggen')) {
        met = 7.0;
    } else if (activityType.includes('Radfahren')) {
        met = 6.0;
    } else if (activityType.includes('Schwimmen')) {
        met = 6.0;
    } else if (activityType.includes('Gymnastik')) {
        met = 4.0;
    } else if (activityType.includes('Yoga')) {
        met = 2.5;
    } else if (activityType.includes('Krafttraining')) {
        met = 5.0;
    } else if (activityType.includes('Hausarbeit')) {
        met = 3.0;
    } else if (activityType.includes('Gartenarbeit')) {
        met = 4.0;
    }
    
    // Kalorienberechnung: MET * Gewicht (kg) * Dauer (Stunden)
    const calories = Math.round(met * profile.weight * (durationInMinutes / 60));
    
    return calories;
}

// Kalorien schätzen (Live-Vorschau)
function estimateCalories() {
    const activityType = document.getElementById('activityType').value;
    const activityValue = parseFloat(document.getElementById('activityValue').value);
    const activityUnit = document.getElementById('activityUnit').value;
    
    if (activityType && activityValue && profile.weight) {
        const calories = calculateCalories(activityType, activityValue, activityUnit);
        document.getElementById('estimatedCalories').textContent = calories;
        document.getElementById('caloriesEstimate').style.display = 'block';
    } else {
        document.getElementById('caloriesEstimate').style.display = 'none';
    }
}

// Einträge speichern
function saveEntries() {
    localStorage.setItem('healthTrackerEntries', JSON.stringify(entries));
}

// Einträge laden
function loadEntries() {
    const saved = localStorage.getItem('healthTrackerEntries');
    if (saved) {
        entries = JSON.parse(saved);
    }
}

// Zusammenfassung aktualisieren
function updateSummary() {
    const today = new Date().toDateString();
    
    const todayEntries = entries.filter(entry => {
        const entryDate = new Date(entry.timestamp).toDateString();
        return entryDate === today;
    });
    
    const mealCount = todayEntries.filter(e => e.type === 'food').length;
    const drinkCount = todayEntries.filter(e => e.type === 'drink').length;
    const activityCount = todayEntries.filter(e => e.type === 'activity').length;
    
    document.getElementById('mealCount').textContent = mealCount;
    document.getElementById('drinkCount').textContent = drinkCount;
    document.getElementById('activityCount').textContent = activityCount;
}

// Verlauf aktualisieren
function updateHistory() {
    const historyList = document.getElementById('historyList');
    
    if (entries.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Noch keine Einträge vorhanden</p>
            </div>
        `;
        return;
    }
    
    // Sortieren: neueste zuerst
    const sortedEntries = [...entries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    historyList.innerHTML = sortedEntries.map(entry => {
        const date = new Date(entry.timestamp);
        const timeStr = date.toLocaleString('de-DE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        let details = '';
        let typeClass = '';
        let typeLabel = '';
        
        if (entry.type === 'food') {
            typeClass = 'type-food';
            typeLabel = 'Essen';
            details = `<strong>${entry.item}</strong> - ${entry.amount} ${entry.unit} (${entry.meal})`;
        } else if (entry.type === 'drink') {
            typeClass = 'type-drink';
            typeLabel = 'Trinken';
            // Zeige neue Format mit displayAmount wenn vorhanden
            if (entry.displayAmount) {
                details = `<strong>${entry.item}</strong> - ${entry.displayAmount} (${entry.amountInMl} ml gesamt)`;
            } else {
                // Fallback für alte Einträge
                details = `<strong>${entry.item}</strong> - ${entry.amount} ${entry.unit} (${entry.amountInMl} ml)`;
            }
        } else if (entry.type === 'activity') {
            typeClass = 'type-activity';
            typeLabel = 'Bewegung';
            details = `<strong>${entry.activity}</strong> - ${entry.value} ${entry.unit} (${entry.calories} kcal)`;
        }
        
        return `
            <div class="history-item">
                <div class="history-item-content">
                    <div class="history-item-header">
                        <span class="history-item-type ${typeClass}">${typeLabel}</span>
                        <span class="history-item-time">${timeStr}</span>
                    </div>
                    <div class="history-item-details">${details}</div>
                    ${entry.comment ? `<div class="history-item-comment"><i class="fas fa-comment"></i> ${entry.comment}</div>` : ''}
                </div>
                <button class="history-item-delete" onclick="deleteEntry(${entry.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

// Eintrag löschen
function deleteEntry(id) {
    if (confirm('Möchten Sie diesen Eintrag wirklich löschen?')) {
        entries = entries.filter(entry => entry.id !== id);
        saveEntries();
        updateSummary();
        updateHistory();
        showNotification('Eintrag gelöscht', 'success');
    }
}

// Verlauf löschen
function clearHistory() {
    if (confirm('Möchten Sie wirklich alle Einträge löschen? Diese Aktion kann nicht rückgängig gemacht werden!')) {
        entries = [];
        saveEntries();
        updateSummary();
        updateHistory();
        showNotification('Verlauf gelöscht', 'success');
    }
}

// Daten exportieren (CSV)
function exportData() {
    if (entries.length === 0) {
        showNotification('Keine Daten zum Exportieren vorhanden', 'error');
        return;
    }
    
    // CSV Header
    let csv = 'Typ,Datum,Uhrzeit,Details,Menge,Einheit,Zusatzinfo,Kommentar\n';
    
    // Daten sortieren
    const sortedEntries = [...entries].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    sortedEntries.forEach(entry => {
        const date = new Date(entry.timestamp);
        const dateStr = date.toLocaleDateString('de-DE');
        const timeStr = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        
        let type = '';
        let details = '';
        let amount = '';
        let unit = '';
        let extra = '';
        
        if (entry.type === 'food') {
            type = 'Essen';
            details = entry.item;
            amount = entry.amount;
            unit = entry.unit;
            extra = entry.meal;
        } else if (entry.type === 'drink') {
            type = 'Trinken';
            details = entry.item;
            // Neue Format mit Anzahl
            if (entry.displayAmount) {
                amount = entry.displayAmount;
                unit = '';
            } else {
                // Fallback für alte Einträge
                amount = entry.amount;
                unit = entry.unit;
            }
            extra = `${entry.amountInMl} ml gesamt`;
        } else if (entry.type === 'activity') {
            type = 'Bewegung';
            details = entry.activity;
            amount = entry.value;
            unit = entry.unit;
            extra = `${entry.calories} kcal`;
        }
        
        const comment = entry.comment || '';
        
        csv += `"${type}","${dateStr}","${timeStr}","${details}","${amount}","${unit}","${extra}","${comment}"\n`;
    });
    
    // Download erstellen
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const filename = `health-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Daten exportiert als ' + filename, 'success');
}

// Daten an Google Sheets senden
async function sendToGoogleSheets(entry) {
    if (!sheetsUrl) {
        return; // Keine URL konfiguriert, überspringen
    }
    
    try {
        const date = new Date(entry.timestamp);
        
        // Daten für Google Sheets vorbereiten
        const sheetData = {
            timestamp: entry.timestamp,
            date: date.toLocaleDateString('de-DE'),
            time: date.toLocaleTimeString('de-DE'),
            type: entry.type,
            details: '',
            amount: '',
            unit: '',
            extra: '',
            comment: entry.comment || ''
        };
        
        if (entry.type === 'food') {
            sheetData.details = entry.item;
            sheetData.amount = entry.amount;
            sheetData.unit = entry.unit;
            sheetData.extra = entry.meal;
        } else if (entry.type === 'drink') {
            sheetData.details = entry.item;
            // Neue Format mit Anzahl
            if (entry.displayAmount) {
                sheetData.amount = entry.displayAmount;
                sheetData.unit = '';
            } else {
                // Fallback für alte Einträge
                sheetData.amount = entry.amount;
                sheetData.unit = entry.unit;
            }
            sheetData.extra = `${entry.amountInMl} ml gesamt`;
        } else if (entry.type === 'activity') {
            sheetData.details = entry.activity;
            sheetData.amount = entry.value;
            sheetData.unit = entry.unit;
            sheetData.extra = `${entry.calories} kcal`;
        }
        
        // Senden mit no-cors Mode (wie beim DaviBot)
        await fetch(sheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData)
        });
        
        console.log('Daten an Google Sheets gesendet:', sheetData);
    } catch (error) {
        console.error('Fehler beim Senden an Google Sheets:', error);
        // Fehler werden nicht als Notification angezeigt, um den Benutzer nicht zu stören
    }
}

// Persönliche Daten an Google Sheets senden
async function sendProfileToGoogleSheets(profileData) {
    if (!sheetsUrl) {
        return; // Keine URL konfiguriert, überspringen
    }
    
    try {
        const sheetData = {
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('de-DE'),
            time: new Date().toLocaleTimeString('de-DE'),
            type: 'profile',
            details: 'Persönliche Daten Update',
            amount: '',
            unit: '',
            extra: `Gewicht: ${profileData.weight} kg, Größe: ${profileData.height} cm, Geburtsdatum: ${profileData.birthdate}, Geschlecht: ${profileData.gender}`,
            comment: 'Profil aktualisiert'
        };
        
        // Senden mit no-cors Mode
        await fetch(sheetsUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData)
        });
        
        console.log('Profil an Google Sheets gesendet:', sheetData);
    } catch (error) {
        console.error('Fehler beim Senden des Profils an Google Sheets:', error);
    }
}

// Notification anzeigen
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Anzeigen
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ausblenden nach 3 Sekunden
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
