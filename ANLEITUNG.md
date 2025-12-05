# 📋 Anleitung zur Einrichtung des Health Trackers

## 🎯 Übersicht

Diese Anleitung führt Sie Schritt für Schritt durch die Einrichtung Ihres persönlichen Health Trackers mit automatischer Google Sheets Integration.

---

## 📊 Google Sheets Einrichtung

### Schritt 1: Google Sheet erstellen

1. Öffnen Sie [Google Sheets](https://sheets.google.com)
2. Klicken Sie auf "+ Neu" oder "Leere Tabelle"
3. Geben Sie der Tabelle einen aussagekräftigen Namen, z.B.:
   - **"Health Tracker - Meine Daten"**
   - **"Ernährungstagebuch 2024"**

### Schritt 2: Apps Script öffnen

1. Klicken Sie in Ihrer Google Tabelle auf **"Erweiterungen"** (im Menü oben)
2. Wählen Sie **"Apps Script"**
3. Es öffnet sich ein neues Fenster mit dem Apps Script Editor

### Schritt 3: Code einfügen

1. Im Apps Script Editor sehen Sie bereits etwas Code (z.B. `function myFunction() { }`)
2. **Löschen Sie allen vorhandenen Code**
3. Öffnen Sie die Datei `google-apps-script.js` aus diesem Projekt
4. **Kopieren Sie den gesamten Code** aus dieser Datei
5. **Fügen Sie den Code** in den Apps Script Editor ein

### Schritt 4: Projekt speichern

1. Klicken Sie oben auf das **Disketten-Symbol** (💾) oder drücken Sie `Strg+S` (Windows) / `Cmd+S` (Mac)
2. Geben Sie dem Projekt einen Namen, z.B. "Health Tracker Script"
3. Klicken Sie auf "OK"

### Schritt 5: Web-App bereitstellen

1. Klicken Sie oben rechts auf **"Bereitstellen"**
2. Wählen Sie **"Neue Bereitstellung"**
3. Klicken Sie auf das Zahnrad-Symbol ⚙️ neben "Typ auswählen"
4. Wählen Sie **"Web-App"**
5. Konfigurieren Sie folgende Einstellungen:
   - **Beschreibung**: "Health Tracker" (oder beliebig)
   - **Ausführen als**: "Ich" (Ihre E-Mail-Adresse)
   - **Zugriff haben**: **"Jeder"** ⚠️ (wichtig!)
6. Klicken Sie auf **"Bereitstellen"**

### Schritt 6: Berechtigungen erteilen

1. Es erscheint eine Warnung: "Autorisierung erforderlich"
2. Klicken Sie auf **"Zugriff autorisieren"**
3. Wählen Sie Ihr Google-Konto aus
4. Es erscheint eine Warnung "Diese App wurde nicht von Google bestätigt"
   - Klicken Sie auf **"Erweitert"**
   - Klicken Sie auf **"Zu [Projektname] wechseln (unsicher)"**
5. Klicken Sie auf **"Zulassen"**

### Schritt 7: URL kopieren

1. Nach erfolgreicher Bereitstellung erscheint eine **"Web-App-URL"**
2. Die URL sieht etwa so aus:
   ```
   https://script.google.com/macros/s/ABCDEFG1234567890.../exec
   ```
3. **Kopieren Sie diese URL komplett**
4. Klicken Sie auf **"Fertig"**

---

## 🌐 Health Tracker Website konfigurieren

### Schritt 8: URL in der Website eintragen

1. Öffnen Sie Ihre **Health Tracker Website** (index.html)
2. Scrollen Sie ganz nach unten zum Bereich **"Google Sheets Konfiguration"**
3. Fügen Sie die kopierte URL in das Textfeld ein
4. Klicken Sie auf **"URL Speichern"** (💾)
5. Klicken Sie auf **"Verbindung testen"** (🧪)
6. Wenn alles korrekt ist, erscheint: **"Verbindung erfolgreich!"** ✅

---

## ✅ Fertig! So verwenden Sie den Tracker

### Persönliche Daten eingeben

1. Geben Sie oben Ihre persönlichen Daten ein:
   - **Gewicht**: 99.4 kg (aktuell)
   - **Größe**: 173 cm
   - **Geburtsdatum**: 01.05.1982
   - **Geschlecht**: Weiblich
2. Klicken Sie auf **"Speichern"**

### Essen tracken

1. Gehen Sie zum Tab **"Essen"** 🍽️
2. Wählen Sie ein Lebensmittel aus (z.B. "Magerquark")
3. Geben Sie die Menge ein (z.B. "250")
4. Wählen Sie die Einheit (g, ml, Stück, etc.)
5. Wählen Sie die Mahlzeit (Frühstück, Mittag, etc.)
6. Optional: Kommentar hinzufügen (z.B. "Essengehen", "Weihnachtsfeier")
7. Klicken Sie auf **"Hinzufügen"** ➕

### Trinken tracken

1. Gehen Sie zum Tab **"Trinken"** 💧
2. Wählen Sie ein Getränk aus (z.B. "Wasser")
3. Geben Sie die Menge ein (z.B. "250")
4. Wählen Sie die Einheit (ml, Glas, Tasse, Flasche)
5. Optional: Kommentar hinzufügen
6. Klicken Sie auf **"Hinzufügen"** ➕

### Bewegung tracken

1. Gehen Sie zum Tab **"Bewegung"** 🚶‍♀️
2. Wählen Sie eine Aktivität aus (z.B. "Spazieren normal, 4 km/h")
3. Geben Sie die Distanz ein (z.B. "2.5" km)
4. Die App berechnet **automatisch die verbrannten Kalorien** basierend auf:
   - Ihrem Gewicht
   - Der Aktivität
   - Der Distanz/Dauer
5. Optional: Kommentar hinzufügen (z.B. "Park", "mit Hund")
6. Klicken Sie auf **"Hinzufügen"** ➕

### Verlauf ansehen

1. Gehen Sie zum Tab **"Verlauf"** 📜
2. Hier sehen Sie alle Ihre Einträge chronologisch sortiert
3. Sie können einzelne Einträge löschen (🗑️)
4. Sie können alle Daten als **CSV exportieren** (📥)
   - Diese Datei können Sie in Excel öffnen
   - Ideal für Ihren Arzt

---

## 📱 Verwendung auf dem Smartphone

Der Health Tracker ist **vollständig mobil-optimiert**:

1. Öffnen Sie die Website auf Ihrem Smartphone
2. Fügen Sie ein Lesezeichen hinzu oder speichern Sie die Seite auf dem Homescreen:
   - **iPhone**: Safari > Teilen > "Zum Home-Bildschirm"
   - **Android**: Chrome > Menü (⋮) > "Zum Startbildschirm hinzufügen"
3. Jetzt können Sie die App wie eine normale App öffnen!

---

## 🔄 Automatische Synchronisation

**Sobald Sie etwas hinzufügen**, wird es automatisch:
- ✅ Lokal in Ihrem Browser gespeichert
- ✅ Sofort an Google Sheets übertragen
- ✅ In der Tagesübersicht angezeigt
- ✅ Im Verlauf sichtbar

**Ihre Daten in Google Sheets:**
- Können Sie jederzeit öffnen und einsehen
- Sind perfekt formatiert und übersichtlich
- Können Sie mit Ihrem Arzt teilen (Link oder Download)
- Können Sie mit Excel-Formeln auswerten

---

## 💡 Tipps & Tricks

### Schneller tracken
- Verwenden Sie immer dieselben Lebensmittel → schneller auswählbar
- Nutzen Sie die Kommentarfunktion für besondere Anlässe
- Tracken Sie direkt nach der Mahlzeit, nicht am Abend

### Daten für den Arzt
1. Öffnen Sie Ihr Google Sheet
2. Klicken Sie auf "Datei" > "Herunterladen" > "PDF"
3. Oder: "Datei" > "Freigeben" → Link an Arzt senden

### Daten exportieren
1. Im Tab "Verlauf" auf "CSV Export" klicken
2. Datei öffnet sich in Excel
3. Sie können dann Diagramme erstellen, filtern, etc.

### Bei Problemen
- **"Verbindungstest fehlgeschlagen"**: URL nochmal prüfen, evtl. neu bereitstellen
- **Keine Daten in Google Sheets**: Prüfen Sie, ob "Zugriff: Jeder" eingestellt ist
- **Daten weg nach Browser-Wechsel**: Daten sind im Browser gespeichert (localStorage)
  - Nutzen Sie denselben Browser oder exportieren Sie regelmäßig

---

## 🔐 Datenschutz & Sicherheit

- ✅ **Ihre Daten bleiben privat**: Sie werden NUR in Ihrem Browser und Ihrem Google Sheet gespeichert
- ✅ **Keine Cloud-Speicherung**: Außer Ihrem eigenen Google Account
- ✅ **Keine Registrierung nötig**: Komplett anonym verwendbar
- ✅ **Offline-fähig**: Funktioniert auch ohne Internet (Daten werden später synchronisiert)

---

## 🆘 Häufige Fragen (FAQ)

**F: Kann ich mehrere Geräte verwenden?**
A: Ja! Google Sheets ist überall synchronisiert. Der lokale Browser-Speicher ist pro Gerät, aber Google Sheets zeigt alle Daten.

**F: Was passiert, wenn ich meinen Browser lösche?**
A: Ihre Daten bleiben in Google Sheets gespeichert! Nur die lokale Kopie wird gelöscht.

**F: Kann ich die Lebensmittel-Liste anpassen?**
A: Ja! Öffnen Sie `index.html` und passen Sie die `<option>` Einträge an.

**F: Wie genau sind die Kalorienberechnungen?**
A: Die Berechnungen basieren auf MET-Werten (Metabolic Equivalent of Task) und sind Richtwerte. Für genauere Werte sollten Sie mit einem Ernährungsberater sprechen.

**F: Kann ich alte Daten löschen?**
A: Ja! Im Tab "Verlauf" können Sie einzelne Einträge oder den gesamten Verlauf löschen.

---

## 📞 Support

Bei Fragen oder Problemen:
1. Lesen Sie diese Anleitung nochmal durch
2. Prüfen Sie die Konfiguration in Google Apps Script
3. Testen Sie die Verbindung in der App

---

**Viel Erfolg beim Tracking Ihrer Gesundheitsdaten! 💪🥗**
