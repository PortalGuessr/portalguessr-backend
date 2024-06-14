import crypto from "crypto";

export function generateDocumentId(dataType) {
  const hex = crypto.randomBytes(3).toString("hex").toUpperCase();
  const myDate = new Date();
  const currentYear = myDate.getFullYear().toString().slice(2);
  const currentMonth = myDate.getMonth();
  return hex + dataType + currentYear + currentMonth;
}
