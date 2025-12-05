# 🏥 Health Tracker - Ernährung & Bewegung

Ein umfassendes Web-Tool zum Tracken von Ernährung, Getränken und Bewegung mit automatischer Google Sheets Integration. Speziell entwickelt für die Überwachung von LDL und Triglycerid-Werten.

![Health Tracker](https://img.shields.io/badge/Status-Produktiv-success)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![Mobile](https://img.shields.io/badge/Mobile-Optimiert-green)

---

## 🎯 Projektübersicht

### Ziel
Ein einfaches, übersichtliches Tool zum täglichen Tracking von:
- 🍽️ **Essen** (mit Portionsgrößen und Mahlzeiten)
- 💧 **Getränken** (mit verschiedenen Einheiten)
- 🚶‍♀️ **Bewegung** (mit automatischer Kalorienberechnung)

Alle Daten werden automatisch an Google Sheets übertragen und können jederzeit mit dem Arzt geteilt werden.

### Zielgruppe
- Personen mit erhöhten LDL- und Triglycerid-Werten
- Alle, die ihre Ernährung und Bewegung überwachen möchten
- Patienten, die ihrem Arzt detaillierte Gesundheitsdaten bereitstellen müssen

---

## ✨ Hauptfunktionen

### ✅ Aktuell implementierte Features

#### 1. **Persönliche Daten**
- Gewicht, Größe, Geburtsdatum, Geschlecht
- Wird für Kalorienberechnungen verwendet
- Lokal im Browser gespeichert

#### 2. **Essen tracken**
- Umfangreiche Lebensmittel-Auswahl nach Kategorien:
  - Milchprodukte (Magerquark, Joghurt, Käse, etc.)
  - Proteine (Hähnchen, Fisch, Ei, Tofu, etc.)
  - Kohlenhydrate (Haferflocken, Vollkornbrot, Reis, etc.)
  - Gemüse (Brokkoli, Spinat, Salat, etc.)
  - Obst (Apfel, Beeren, Banane, etc.)
  - Sonstiges (Nüsse, Öle, etc.)
- Flexible Mengenangaben: Gramm, Milliliter, Stück, Scheibe, Esslöffel
- Mahlzeiten-Kategorisierung: Frühstück, Mittag, Snacks, Abendessen
- Kommentarfeld für besondere Anlässe (z.B. "Essengehen", "Weihnachtsfeier")

#### 3. **Trinken tracken**
- Getränke-Kategorien:
  - Ohne Kalorien (Wasser, Tee, schwarzer Kaffee)
  - Mit Kalorien (Milch, Säfte, Smoothies)
  - Alkohol (Bier, Wein, Spirituosen)
- Intelligente Einheiten: ml, Glas (200ml), Tasse (150ml), Flasche (500ml)
- Automatische Umrechnung in Milliliter
- Kommentarfeld für Kontext

#### 4. **Bewegung tracken**
- Vielfältige Aktivitäten:
  - Spazieren (langsam 3 km/h, normal 4 km/h, zügig 5 km/h)
  - Wandern, Joggen, Radfahren
  - Schwimmen, Gymnastik, Yoga, Krafttraining
  - Hausarbeit, Gartenarbeit
- Eingabe als Kilometer oder Minuten
- **Automatische Kalorienberechnung** basierend auf:
  - Körpergewicht
  - Aktivitätstyp (MET-Werte)
  - Dauer/Distanz
- Live-Vorschau der geschätzten Kalorien
- Kommentarfeld (z.B. "Park", "mit Hund")

#### 5. **Tagesübersicht**
- Echtzeit-Zusammenfassung:
  - Anzahl Mahlzeiten heute
  - Anzahl Getränke heute
  - Anzahl Aktivitäten heute
- Anzeige des aktuellen Datums

#### 6. **Verlauf**
- Chronologische Übersicht aller Einträge
- Filterung nach Typ (Essen, Trinken, Bewegung)
- Detailansicht mit allen Informationen
- Einzelne Einträge löschen
- Gesamten Verlauf löschen

#### 7. **Datenexport**
- **CSV-Export** für Excel/LibreOffice
- Perfekt formatiert für ärztliche Dokumentation
- Enthält alle Details: Datum, Uhrzeit, Typ, Menge, Kommentare

#### 8. **Google Sheets Integration**
- Automatische Übertragung ALLER Einträge
- Echtzeit-Synchronisation
- Strukturierte Datenablage mit Headern:
  - Zeitstempel, Datum, Uhrzeit
  - Typ, Details, Menge, Einheit
  - Zusatzinfo, Kommentar
- Einfache Einrichtung über Google Apps Script
- Verbindungstest integriert

#### 9. **Benutzeroberfläche**
- Modern und übersichtlich
- Mobile-optimiert (responsive Design)
- Intuitive Tab-Navigation
- Farbkodierung nach Typ:
  - 🟢 Grün für Essen
  - 🔵 Blau für Trinken
  - 🟠 Orange für Bewegung
- Animationen und visuelles Feedback
- Dark/Light Mode kompatibel

#### 10. **Datenspeicherung**
- Lokale Speicherung im Browser (localStorage)
- Ihre Daten bleiben privat und sicher
- Automatische Google Sheets Backup
- Offline-fähig (Daten werden später synchronisiert)

---

## 🚀 Schnellstart

### 1. Dateien öffnen
```
index.html          → Hauptseite (im Browser öffnen)
css/style.css       → Styling
js/app.js           → Funktionalität
google-apps-script.js → Google Sheets Code
ANLEITUNG.md        → Detaillierte Setup-Anleitung
```

### 2. Google Sheets einrichten
Siehe **[ANLEITUNG.md](ANLEITUNG.md)** für Schritt-für-Schritt Anweisungen!

**Kurzversion:**
1. Neues Google Sheet erstellen
2. Erweiterungen > Apps Script
3. Code aus `google-apps-script.js` einfügen
4. Als Web-App bereitstellen (Zugriff: Jeder)
5. URL kopieren und in Website eintragen

### 3. Verwenden
1. Persönliche Daten eingeben (Gewicht: 99.4 kg, Größe: 173 cm, Geburtsdatum: 01.05.1982, Geschlecht: weiblich)
2. Tracking starten!
3. Daten werden automatisch lokal und in Google Sheets gespeichert

---

## 📁 Projektstruktur

```
health-tracker/
│
├── index.html                 # Hauptseite mit allen Tabs
├── css/
│   └── style.css             # Modernes, responsives Styling
├── js/
│   └── app.js                # Gesamte App-Logik
├── google-apps-script.js     # Google Sheets Integration Code
├── ANLEITUNG.md              # Ausführliche Setup-Anleitung
└── README.md                 # Diese Datei
```

---

## 🔧 Technische Details

### Technologie-Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0 (via CDN)
- **Speicherung**: localStorage (Browser) + Google Sheets API
- **Backend**: Google Apps Script (serverless)

### Browser-Kompatibilität
- ✅ Chrome/Edge (empfohlen)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Browser (iOS Safari, Chrome Android)

### Features im Detail

#### Kalorienberechnung
Die App verwendet **MET-Werte** (Metabolic Equivalent of Task) für präzise Kalorienberechnungen:

```javascript
Kalorien = MET × Gewicht (kg) × Dauer (Stunden)
```

**Beispiel MET-Werte:**
- Spazieren (langsam): 3.0
- Spazieren (normal): 3.5
- Spazieren (zügig): 4.0
- Joggen: 7.0
- Radfahren: 6.0
- Schwimmen: 6.0

**Beispiel:**
- Person: 99.4 kg
- Aktivität: Spazieren (normal, 4 km/h)
- Distanz: 2.5 km
- Dauer: ~37.5 Minuten
- Kalorien: 3.5 × 99.4 × 0.625 = **217 kcal**

#### Datenstruktur
Jeder Eintrag enthält:
```javascript
{
  id: 1234567890,              // Eindeutige ID
  type: 'food',                 // 'food', 'drink', 'activity'
  timestamp: '2024-01-15T14:30:00.000Z',
  item: 'Magerquark',
  amount: 250,
  unit: 'g',
  meal: 'Mittag',              // Nur bei food
  amountInMl: 250,             // Nur bei drink
  activity: 'Spazieren',       // Nur bei activity
  calories: 217,               // Nur bei activity
  comment: 'Essengehen'
}
```

---

## 📊 Verwendung für medizinische Zwecke

### Für Sie
- Tägliches Tracking von Ernährung und Bewegung
- Übersicht über Ihre Gewohnheiten
- Motivation durch Visualisierung

### Für Ihren Arzt
1. **Google Sheets Link teilen**:
   - Öffnen Sie Ihr Sheet
   - Klicken Sie auf "Freigeben"
   - Link generieren und an Arzt senden

2. **CSV-Export**:
   - Im Tab "Verlauf" auf "CSV Export" klicken
   - Datei per E-Mail an Arzt senden
   - Öffnet sich direkt in Excel

3. **Auswertungen**:
   - Arzt kann Trends erkennen
   - Filter nach Datum/Typ möglich
   - Pivot-Tabellen für Analysen

---

## 🎨 Anpassungsmöglichkeiten

### Lebensmittel hinzufügen/ändern
Öffnen Sie `index.html` und bearbeiten Sie die `<option>` Tags:

```html
<optgroup label="Ihre Kategorie">
    <option value="Ihr Lebensmittel">Ihr Lebensmittel</option>
</optgroup>
```

### Styling anpassen
Öffnen Sie `css/style.css` und ändern Sie die CSS-Variablen:

```css
:root {
    --primary-color: #4CAF50;    /* Hauptfarbe */
    --secondary-color: #2196F3;  /* Sekundärfarbe */
    --danger-color: #f44336;     /* Warnfarbe */
}
```

### Funktionen erweitern
Öffnen Sie `js/app.js` und fügen Sie neue Funktionen hinzu.

---

## 📱 Mobile Nutzung

### Als Web-App installieren

**iPhone/iPad:**
1. Öffnen Sie die Seite in Safari
2. Tippen Sie auf das Teilen-Symbol
3. "Zum Home-Bildschirm" auswählen
4. Fertig! Jetzt wie eine App verwendbar

**Android:**
1. Öffnen Sie die Seite in Chrome
2. Tippen Sie auf Menü (⋮)
3. "Zum Startbildschirm hinzufügen"
4. Fertig!

---

## 🔮 Geplante Features (Roadmap)

### Noch nicht implementiert, aber möglich:

- [ ] **Nährwertdatenbank**: Automatische Berechnung von Kalorien, Fett, Proteinen
- [ ] **Diagramme**: Visualisierung von Trends (mit Chart.js)
- [ ] **Zielsetzung**: Tagesziele für Kalorien, Wasser, Schritte
- [ ] **Erinnerungen**: Push-Benachrichtigungen für Tracking
- [ ] **Rezepte**: Speichern von Lieblingsmahlzeiten
- [ ] **Wasser-Tracker**: Separater Quick-Add Button für Wasser
- [ ] **Foto-Upload**: Bilder von Mahlzeiten hochladen
- [ ] **Mehrere Profile**: Für Familienmitglieder
- [ ] **Export als PDF**: Ärztliche Berichte generieren
- [ ] **Synchronisation**: Zwischen mehreren Geräten über Google Drive

---

## 🆘 Problemlösung

### "Verbindung zu Google Sheets fehlgeschlagen"
- Prüfen Sie die Web-App-URL
- Stellen Sie sicher, dass "Zugriff: Jeder" eingestellt ist
- Erstellen Sie eine neue Bereitstellung

### "Daten werden nicht angezeigt"
- Prüfen Sie den Browser (localStorage muss aktiviert sein)
- Öffnen Sie die Browser-Konsole (F12) für Fehlermeldungen

### "Kalorienberechnung funktioniert nicht"
- Stellen Sie sicher, dass Sie Ihre persönlichen Daten eingegeben haben
- Gewicht muss ausgefüllt sein

### "Daten verschwunden nach Browser-Wechsel"
- Daten sind pro Browser gespeichert
- Nutzen Sie denselben Browser oder exportieren Sie regelmäßig

---

## 📄 Datenschutz

- ✅ Alle Daten bleiben lokal in Ihrem Browser
- ✅ Google Sheets nur in IHREM Account
- ✅ Keine externen Server
- ✅ Keine Registrierung erforderlich
- ✅ Keine Cookies
- ✅ Kein Tracking
- ✅ 100% DSGVO-konform

---

## 📞 Support & Kontakt

Bei Fragen oder Problemen:
1. Lesen Sie die [ANLEITUNG.md](ANLEITUNG.md)
2. Prüfen Sie die Google Apps Script Konfiguration
3. Testen Sie die Verbindung in der App

---

## 📜 Lizenz

Dieses Projekt ist Open Source und kann frei verwendet, modifiziert und weitergegeben werden.

---

## 🙏 Danksagungen

Inspiriert von [DaviBot](https://dikodu.github.io/davibot2.1/)

---

**Viel Erfolg bei Ihrem Gesundheitsweg! 💪🥗**

*Erstellt mit ❤️ für bessere Gesundheit*
