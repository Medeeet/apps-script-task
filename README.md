# Google Sheets Integration with Website — Project by Medet

**Flow:** Google Sheets → Apps Script (Web App) → Frontend (`index.html`).

## Repository Structure
- `apps-script/`        — Google Apps Script code (.gs)
- `frontend/index.html` — frontend page to display the table
- `deploy-info.txt`     — Web App URL and deployment instructions

## Run Frontend Locally
1. Open terminal inside the `frontend` folder.
2. Start a local server:
   ```bash
   python3 -m http.server 8000

    Open in browser:
    http://localhost:8000

Web App (Apps Script)

    Web App URL:
    https://script.google.com/macros/s/AKfycbx97TeFo9dW5ftHI8ofezKoFDpxri4aBU8GgfKH1u-VhWfDKauU8rMHe1691LsXrQfO6A/exec

    Deployment steps:
    Extensions → Apps Script → Deploy → New deployment → Web app

        Execute as: Me

        Who has access: Anyone

What to Test

    Open index.html → a table with the column Стоимость (₸) should appear.

    Change Price or Weight in Google Sheets → refresh the page → updated values should be reflected automatically.

Author: Medet
Contact: awusincere@gmail.com
