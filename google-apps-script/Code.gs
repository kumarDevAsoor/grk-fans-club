const CONFIG = {
  spreadsheetId: "10_DQClPTs-me4B_2nioYfpJFOWhOkV98I1mhPMOiTGM",
  sheetName: "Members",
  driveFolderId: "1oKoB6D80Y_lJAC5P6e59Du3UFhKKDDrA",
};

const HEADERS = [
  "memberId",
  "fullName",
  "mobileNumber",
  "whatsappNumber",
  "email",
  "dateOfBirth",
  "gender",
  "bloodGroup",
  "state",
  "district",
  "constituency",
  "city",
  "pincode",
  "address",
  "photoUrl",
  "photoFileId",
  "status",
  "createdAt",
  "approvedAt",
  "approvedBy",
  "rejectedAt",
  "rejectedBy",
  "rejectionReason",
];

function doGet() {
  return jsonResponse({
    success: true,
    message: "Membership API is running",
    sheetName: CONFIG.sheetName,
    configured: Boolean(CONFIG.spreadsheetId && CONFIG.driveFolderId),
  });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    validatePayload(payload);

    const sheet = getMembersSheet();
    ensureHeaders(sheet);

    const photo = savePhoto(payload.photo, payload.fullName);
    const createdAt = new Date();
    const memberId = getAvailableMemberId(sheet, payload.memberId);
    const row = [
      memberId,
      payload.fullName,
      payload.mobileNumber,
      payload.whatsappNumber || "",
      payload.email || "",
      payload.dateOfBirth || "",
      payload.gender || "",
      payload.bloodGroup || "",
      payload.state,
      payload.district,
      payload.constituency || "",
      payload.city,
      payload.pincode || "",
      payload.address || "",
      photo.url,
      photo.id,
      "pending",
      createdAt,
      "",
      "",
      "",
      "",
      "",
    ];

    sheet.appendRow(row);
    return jsonResponse({ success: true, message: "Membership application received" });
  } catch (error) {
    return jsonResponse({ success: false, message: error.message });
  }
}

function getAvailableMemberId(sheet, requestedId) {
  const existingIds = sheet.getLastRow() < 2
    ? []
    : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();

  if (requestedId && !existingIds.includes(requestedId)) {
    return requestedId;
  }

  const numbers = existingIds
    .map(function (id) {
      const match = String(id).match(/^GRK(\d+)$/i);
      return match ? Number(match[1]) : 0;
    })
    .filter(Boolean);
  const nextNumber = Math.max.apply(null, numbers.concat([0])) + 1;
  return `GRK${String(nextNumber).padStart(2, "0")}`;
}

function getMembersSheet() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  return spreadsheet.getSheetByName(CONFIG.sheetName) || spreadsheet.insertSheet(CONFIG.sheetName);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function savePhoto(photo, fullName) {
  if (!photo || !photo.base64) {
    throw new Error("Photo is required");
  }

  const bytes = Utilities.base64Decode(photo.base64);
  const extension = getExtension(photo.mimeType);
  const fileName = `${sanitizeFileName(fullName)}-${Date.now()}.${extension}`;
  const blob = Utilities.newBlob(bytes, photo.mimeType || "image/jpeg", fileName);
  const file = DriveApp.getFolderById(CONFIG.driveFolderId).createFile(blob);

  return { id: file.getId(), url: file.getUrl() };
}

function validatePayload(payload) {
  const requiredFields = [
    "fullName",
    "mobileNumber",
    "state",
    "district",
    "city",
  ];

  requiredFields.forEach(function (field) {
    if (!String(payload[field] || "").trim()) {
      throw new Error(`${field} is required`);
    }
  });
}

function getExtension(mimeType) {
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return extensions[mimeType] || "jpg";
}

function sanitizeFileName(value) {
  return String(value || "member")
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "") || "member";
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
