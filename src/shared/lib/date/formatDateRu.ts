type DateInput = string | number | Date;

function toDate(value: DateInput) {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateRu(value: DateInput) {
  return toDate(value).toLocaleDateString('ru-RU');
}

export function formatDateTimeRu(value: DateInput) {
  return toDate(value).toLocaleString('ru-RU');
}

export function formatShortDateRu(value: DateInput) {
  return toDate(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatLongDateRu(value: DateInput) {
  return toDate(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatShortMonthRu(value: DateInput) {
  return toDate(value).toLocaleDateString('ru-RU', {
    month: 'short',
  });
}

export function formatMatchDateTimeRu(date: DateInput, time: string) {
  return `${formatDateRu(date)} в ${time}`;
}
