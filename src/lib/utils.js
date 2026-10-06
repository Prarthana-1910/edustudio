/**
 * Utility functions for EduStudio
 */

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format meters into civil stationing notation (e.g. 1420 -> "STA 14+200")
 */
export function formatStation(meters = 0) {
  const hundreds = Math.floor(meters / 100);
  const remainder = Math.floor(meters % 100);
  const formattedHundreds = String(hundreds).padStart(2, '0');
  const formattedRemainder = String(remainder).padStart(2, '0');
  return `STA ${formattedHundreds}+${formattedRemainder}0`;
}

/**
 * Format date for engineering journals and agendas
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
