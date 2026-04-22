# Google Sheets: contact form integration

Your site sends form data as **JSON (POST)** to a **Google Apps Script** web app URL. The script appends one row per submission to a Google Sheet.

---

## 1. Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and create a blank spreadsheet.
2. Name it (e.g. **JayKishan — Contact enquiries**).
3. In **row 1**, set these **headers** (exact order helps when mapping in script):

   | A | B | C | D | E | F | G | H | I |
   |---|---|---|---|---|---|---|---|---|
   | Timestamp | Name | Email | Phone | Business | Service | Budget | Timeline | Message |

4. Copy the **Spreadsheet ID** from the URL:

   `https://docs.google.com/spreadsheets/d/`**`THIS_PART_IS_THE_ID`**`/edit`

---

## 2. Create the Apps Script project

1. In the spreadsheet: **Extensions → Apps Script** (or go to [script.google.com](https://script.google.com) and create a project).
2. Delete any sample code and paste the contents of **`src/scripts/google-sheet-webapp.gs`** from this repo.
3. Replace **`SHEET_ID`** with your real ID from step 1 (keep the quotes).
4. **Save** (disk icon). Name the project if prompted (e.g. **Contact Form Handler**).

---

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to **Select type** → choose **Web app**.
3. Settings:
   - **Description:** e.g. `v1 contact POST`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone** (so your public website can POST without Google login)
4. Click **Deploy**.
5. **Authorize** the app when asked (review permissions → allow).
6. Copy the **Web app URL** (ends with `/exec`).

---

## 4. Connect the website

1. In the project root, create **`.env`** (copy from **`.env.example`**).
2. Set:

   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

   Use the **exact** URL from step 3.

3. Restart the dev server (`npm run dev`) so Vite picks up the variable.
4. For production, set the same env var on your host (Netlify, Vercel, etc.).

---

## 5. Test

1. Open your site, go to **Contact**, fill the form, submit.
2. Check the sheet: a new row should appear with **Timestamp** and all fields.

If it fails:

- Open **browser DevTools → Network** and inspect the POST to the script URL (status, response body).
- Confirm **Deploy** is not an old version: after script changes, use **Deploy → Manage deployments → Edit** (pencil) → **New version** → **Deploy**, then update `.env` if the URL changed (usually it does not).

---

## 6. CORS / “Failed to fetch” on submit

- Deploy with **Who has access: Anyone**.
- The site sends JSON with **`Content-Type: text/plain`** (not `application/json`) so the browser does **not** send a CORS **OPTIONS** preflight. Google Apps Script web apps do not handle preflight; using `application/json` from the browser often shows **Failed to fetch** even when the script URL is correct.
- If it still fails: redeploy a **new version** of the web app, confirm **`VITE_GOOGLE_SCRIPT_URL`** has no spaces, and use **HTTPS** on your live site.

---

## 7. Get notified on your device

The form does **not** push to your phone by itself. The usual approach with this setup is an **email** each time someone submits; your **Gmail** (or Apple Mail, etc.) app can show a **lock-screen or banner notification** on your phone.

### A. Email alert (built into `google-sheet-webapp.gs`)

1. In Apps Script, set **`NOTIFY_EMAIL`** to your address, for example:

   ```js
   var NOTIFY_EMAIL = "jay@jaykishansolutions.com.au";
   ```

2. **Save** the script, then **Deploy → Manage deployments → Edit** (pencil) → **New version** → **Deploy** so the live web app picks up the change.

3. The first time the script tries to send mail, Google may ask you to **authorize** extra permissions (sending email as you). Complete that in the Apps Script editor if prompted (you can run **`notifyNewLead_`** once from the editor with a test object, or submit the real form).

4. On your **phone**, turn on notifications for the **Gmail** (or mail) app for that inbox.

If `NOTIFY_EMAIL` is left as `""`, the sheet still records rows; no email is sent.

### B. Other options (more setup)

- **Telegram / Slack:** Extend the script with `UrlFetchApp.fetch()` to a bot webhook so you get instant chat alerts.
- **Zapier / Make:** Trigger when a new row appears in the sheet and send SMS, push, etc.

---

## 8. Security notes

- The web app URL is a **public endpoint**; anyone who has the URL could POST to it. For a simple contact form this is common; for abuse protection you can add a **honeypot** field, **rate limiting** (advanced), or move submissions to a backend you control.
- Do **not** commit **`.env`** to git (it should stay in `.gitignore`).

---

## Quick checklist

- [ ] Sheet created with header row  
- [ ] `SHEET_ID` and (optional) `NOTIFY_EMAIL` set in the script  
- [ ] Web app deployed, **Anyone** can access  
- [ ] `VITE_GOOGLE_SCRIPT_URL` set in `.env`  
- [ ] Dev server restarted / production env configured  
- [ ] Test submission appears in the sheet  
- [ ] If using email alerts: new deployment after setting `NOTIFY_EMAIL`, mail permissions granted, phone mail notifications on  

For reference, the script expects JSON keys: `name`, `email`, `phone`, `business`, `service`, `budget`, `timeline`, `message` — matching `submitToSheet` in **`src/scripts/submitToSheet.ts`**.
