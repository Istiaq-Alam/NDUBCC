# IUPC Real-Time Registration Counter - Implementation Guide

## Overview
The IUPC webpage includes a real-time counter system that displays the number of registered teams, participants, and universities. This document explains how to connect it to your actual registration database.

## Current Implementation
Currently, the counters use simulated data for demonstration purposes. The code generates random numbers to show how the counter animation works.

## Solutions for Real-Time Data

### Solution 1: Google Sheets + Google Apps Script (Recommended for Google Forms)

If you're using Google Forms for registration:

1. **Setup Google Apps Script:**
   - Open your Google Form responses sheet
   - Go to Extensions > Apps Script
   - Create a new script with this code:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Count unique teams (assuming team name is in column 2)
  const teams = new Set(data.slice(1).map(row => row[1])).size;

  // Count total participants (each team has 3 members)
  const participants = teams * 3;

  // Count unique universities (assuming university is in column 3)
  const universities = new Set(data.slice(1).map(row => row[2])).size;

  const stats = {
    teams: teams,
    participants: participants,
    universities: universities,
    lastUpdated: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(stats))
    .setMimeType(ContentService.MimeType.JSON);
}
```

2. **Deploy as Web App:**
   - Click Deploy > New deployment
   - Select "Web app"
   - Set "Execute as" to your account
   - Set "Who has access" to "Anyone"
   - Copy the deployment URL

3. **Update IUPC.html:**
   Replace the `updateCounters()` function (around line 562) with:

```javascript
function updateCounters() {
    // Replace with your Google Apps Script URL
    const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            animateCounter('teamCounter', data.teams);
            animateCounter('participantCounter', data.participants);
            animateCounter('universityCounter', data.universities);
            document.getElementById('lastUpdated').textContent = new Date(data.lastUpdated).toLocaleTimeString();
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
            // Fallback to simulated data if API fails
            const teams = Math.floor(Math.random() * 50) + 50;
            animateCounter('teamCounter', teams);
            animateCounter('participantCounter', teams * 3);
            animateCounter('universityCounter', Math.floor(Math.random() * 15) + 10);
        });
}
```

### Solution 2: Backend API (For Custom Registration System)

If you have a custom backend:

1. **Create API Endpoint:**
   Your backend should provide an endpoint like `/api/iupc/stats` that returns:

```json
{
  "teams": 75,
  "participants": 225,
  "universities": 18,
  "lastUpdated": "2026-04-08T15:30:00Z"
}
```

2. **Update IUPC.html:**
   Replace the API_URL in the fetch call with your backend endpoint:

```javascript
const API_URL = 'https://your-backend.com/api/iupc/stats';
```

### Solution 3: Firebase Realtime Database

For truly real-time updates:

1. **Setup Firebase:**
   - Create a Firebase project
   - Enable Realtime Database
   - Set up security rules

2. **Update Registration Form:**
   When a team registers, update Firebase:

```javascript
firebase.database().ref('iupc/stats').transaction((current) => {
  return {
    teams: (current?.teams || 0) + 1,
    participants: (current?.participants || 0) + 3,
    universities: current?.universities || [] // update university list
  };
});
```

3. **Update IUPC.html:**
   Add Firebase SDK and listen for real-time changes:

```javascript
firebase.database().ref('iupc/stats').on('value', (snapshot) => {
  const data = snapshot.val();
  animateCounter('teamCounter', data.teams);
  animateCounter('participantCounter', data.participants);
  animateCounter('universityCounter', data.universities.length);
});
```

## Update Registration Link

In IUPC.html (line 386), update the registration link:

```html
<!-- Replace this line -->
<a href="#" id="registrationLink" class="register-btn">

<!-- With your actual registration URL -->
<a href="YOUR_GOOGLE_FORM_URL_OR_REGISTRATION_PAGE" id="registrationLink" class="register-btn">
```

Also remove the alert in the JavaScript (lines 619-623):

```javascript
// Remove this entire section when you add the real link
document.getElementById('registrationLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Registration link will be added here by the admin...');
});
```

## Adding IUPC_Extended.png Poster

1. Place your `IUPC_Extended.png` file in:
   `/Computer-Club/programs/fest/cse-fest-26/`

2. The image is already referenced in IUPC.html (line 350):
   ```html
   <img src="IUPC_Extended.png" alt="Extended Registration Notice" class="img-fluid extended-notice" onerror="this.style.display='none'">
   ```

   Note: If the image doesn't exist, it will gracefully hide without breaking the page.

## Testing

1. Open IUPC.html in a browser
2. Check that counters animate properly
3. Verify the registration button works
4. Test on mobile devices for responsiveness
5. Check that header and footer load correctly

## Security Notes

- If using Google Apps Script, ensure your spreadsheet doesn't contain sensitive data
- For custom APIs, implement rate limiting to prevent abuse
- Use CORS headers appropriately
- Consider caching to reduce API calls

## Contact

For questions or issues, contact the NDUB Computer Club development team.
