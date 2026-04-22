/**
 * Deploy: Extensions → Apps Script → paste → Deploy → New deployment → Web app
 * Execute as: Me | Who has access: Anyone
 * Replace SHEET_ID with your spreadsheet ID (from the URL).
 * Set NOTIFY_EMAIL to your address to get an email on each submission (phone can alert via Gmail).
 * First row in Sheet: Timestamp | Name | Email | Phone | Business | Service | Budget | Timeline | Message
 */
var SHEET_ID = "1a2j41TAFe4erIoYBGa4P9AcB6X9i0jQMY4EKDgUFdFA";
/** Your email — leave "" to skip MailApp notifications */
var NOTIFY_EMAIL = "jay@jaykishansolutions.com.au";

function toSafeSheetText_(value) {
  var text = String(value == null ? "" : value).trim();
  // Prevent formula parsing/injection in Google Sheets.
  if (/^[=+\-@]/.test(text)) return "'" + text;
  return text;
}

function notifyNewLead_(body) {
  if (!NOTIFY_EMAIL) return;
  var lines = [
    "New contact form submission (JayKishan site)",
    "",
    "Name: " + (body.name || ""),
    "Email: " + (body.email || ""),
    "Phone: " + (body.phone || ""),
    "Business: " + (body.business || ""),
    "Service: " + (body.service || ""),
    "Budget: " + (body.budget || ""),
    "Timeline: " + (body.timeline || ""),
    "",
    "Message:",
    body.message || "",
  ];
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New lead: " + (body.name || "Website contact"),
    body: lines.join("\n"),
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var body = JSON.parse(e.postData.contents);
    var phoneRaw = String(body.phone || "");
    var phoneDigits = phoneRaw.replace(/\D/g, "");
    var phoneForSheet = toSafeSheetText_(phoneDigits || phoneRaw);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([
      new Date(),
      toSafeSheetText_(body.name),
      toSafeSheetText_(body.email),
      phoneForSheet,
      toSafeSheetText_(body.business),
      toSafeSheetText_(body.service),
      toSafeSheetText_(body.budget),
      toSafeSheetText_(body.timeline),
      toSafeSheetText_(body.message),
    ]);
    try {
      notifyNewLead_(body);
    } catch (mailErr) {
      // Row is saved; log email failure (check NOTIFY_EMAIL, quotas, permissions)
      console.error(mailErr);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON
    );
  } finally {
    lock.releaseLock();
  }
}
