# Google Sheets Integration — Project by Medet

This project demonstrates integration of **Google Sheets → Apps Script (Web App) → Frontend**.

## Repository Structure
- `apps-script/Code.gs` — Google Apps Script backend code
- `frontend/index.html` — web page to display table data
- `deploy-info.txt` — Web App URL and deployment instructions

## How to Run (Frontend)
1. Open terminal in the `frontend` folder.
2. Start local server:
   ```bash
   python3 -m http.server 8000

    Open http://localhost:8000/index.html

    in your browser.

## Web App (Apps Script)

    Web App URL:
    https://script.google.com/macros/s/AKfycbx97TeFo9dW5ftHI8ofezKoFDpxri4aBU8GgfKH1u-VhWfDKauU8rMHe1691LsXrQfO6A/exec

    Deployment:

        Open Apps Script Editor → Deploy → New deployment → Web app.

        Execute as: Me

        Who has access: Anyone

## What to Test

    Open index.html → should display a table with the Стоимость (₸) column.

    Change a value in Google Sheet (price/weight) → refresh the page → values update automatically.

Author: Medet
Email: awusincere@gmail.com
Telegram: @awulanba
