function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var ss = SpreadsheetApp.openById("1jCLDWDZ4VsrwJsZ7RLdR02f1j35_GSJ_0ekB5r2wZfk");
    var sheet = ss.getSheets()[0];
    
    // שליפת נתונים - עבור GET requests הפרמטרים נמצאים ב-e.parameter
    var name = e.parameter.name || "לא צוין";
    var phone = e.parameter.phone || "לא צוין";
    var consent = e.parameter.consent || "false";

    // Debug - לוג את הפרמטרים
    console.log('Received parameters:', {
      name: name,
      phone: phone,
      consent: consent,
      allParams: e.parameter
    });

    // מציאת השורה הבאה להוספה
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;
    
    // הוספת הנתונים
    sheet.getRange(newRow, 1).setValue(new Date()); // תאריך
    sheet.getRange(newRow, 2).setValue(name); // שם
    sheet.getRange(newRow, 3).setValue(phone); // טלפון - נשמר כ-string
    sheet.getRange(newRow, 4).setValue((consent === "true" || consent === true || consent === "כן") ? "כן" : "לא"); // מאשר ליצור קשר
    
    // הגדרת פורמט של עמודת הטלפון כ-text כדי לשמור את ה-0 המוביל
    sheet.getRange(newRow, 3).setNumberFormat("@");

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
