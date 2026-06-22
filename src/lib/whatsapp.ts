export function getWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  const international = cleaned.startsWith("0") ? "212" + cleaned.slice(1) : cleaned.startsWith("212") ? cleaned : "212" + cleaned;
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`;
}

export function getConfirmationMessage(patientName: string, date: string, time?: string): string {
  const formattedDate = new Date(date + "T00:00:00.000Z").toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const heure = time || "à confirmer";
  return `Bonjour ${patientName},\n\nVotre rendez-vous au cabinet dentaire est confirmé pour le ${formattedDate} à ${heure}.\n\nMerci de votre confiance.\n\nCabinet Dentaire`;
}
