/**
 * Google Apps Script — lead sink for /api/lead (deploy as Web App, "Anyone" access).
 *
 * Setup once: Project Settings → Script Properties → add LEAD_SECRET with the same
 * value as the LEAD_WEBHOOK_SECRET env var on Vercel. Until LEAD_SECRET is set the
 * script accepts unsigned requests (so nothing breaks mid-migration) — set it.
 *
 * Accepts POST only (form-encoded from the Vercel proxy). GET returns 405 so the
 * public /exec URL cannot be used to drop rows into the sheet from a browser.
 * Columns: date | name | phone | consent | leadId | source | note
 */
var SHEET_ID = "1jCLDWDZ4VsrwJsZ7RLdR02f1j35_GSJ_0ekB5r2wZfk";

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json({ ok: false, error: "POST only" });
}

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var expected = PropertiesService.getScriptProperties().getProperty("LEAD_SECRET");
    if (expected && p.secret !== expected) {
      return json({ ok: false, error: "unauthorized" });
    }

    var name = String(p.name || "").slice(0, 100);
    var phone = String(p.phone || "").slice(0, 20);
    if (!name || !phone) return json({ ok: false, error: "missing fields" });

    // Replay guard: same leadId within the last 500 rows is ignored.
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];
    var leadId = String(p.leadId || "").slice(0, 40);
    var last = sheet.getLastRow();
    if (leadId && last > 1) {
      var from = Math.max(2, last - 500);
      var ids = sheet.getRange(from, 5, last - from + 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === leadId) return json({ ok: true, duplicate: true });
      }
    }

    var consent = p.consent === "true" || p.consent === true || p.consent === "כן" ? "כן" : "לא";
    var row = [new Date(), name, phone, consent, leadId, String(p.source || "").slice(0, 30), String(p.note || "").slice(0, 120)];
    // Text format on every non-date cell: keeps the leading 0 in phone and stops
    // a value starting with "=" from being parsed as a formula.
    sheet.getRange(last + 1, 2, 1, row.length - 1).setNumberFormat("@");
    sheet.getRange(last + 1, 1, 1, row.length).setValues([row]);
    return json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    return json({ ok: false, error: String(error) });
  }
}
