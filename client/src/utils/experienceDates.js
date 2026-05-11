const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const YM_REGEX = /^\d{4}-\d{2}$/;

function formatYearMonth(ym) {
  if (!YM_REGEX.test(String(ym || ''))) return ym || '';
  const [year, month] = ym.split('-');
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return ym;
  return `${MONTHS[monthIndex]} ${year}`;
}

export function encodePeriod(startDate, endDate, isPresent) {
  if (!startDate) return '';
  if (isPresent) return `${startDate}|present`;
  return `${startDate}|${endDate}`;
}

export function parsePeriod(period) {
  const raw = String(period || '').trim();
  if (!raw) return null;

  if (raw.includes('|')) {
    const [startDate, endPart] = raw.split('|');
    const isPresent = String(endPart || '').toLowerCase() === 'present';
    const endDate = isPresent ? '' : endPart;
    if (YM_REGEX.test(startDate) && (isPresent || YM_REGEX.test(endDate))) {
      return {
        startDate,
        endDate,
        isPresent,
      };
    }
  }

  return null;
}

export function formatPeriod(period) {
  const parsed = parsePeriod(period);
  if (!parsed) return period || '';
  const start = formatYearMonth(parsed.startDate);
  const end = parsed.isPresent ? 'Present' : formatYearMonth(parsed.endDate);
  return `${start} - ${end}`;
}

function getLegacyYearScore(period) {
  const years = String(period || '').match(/\b(19|20)\d{2}\b/g);
  if (!years || !years.length) return 0;
  return Number(years[0]) * 100 + 1;
}

export function getExperienceSortScore(exp) {
  const parsed = parsePeriod(exp?.period);
  if (parsed?.startDate) {
    return Number(parsed.startDate.replace('-', ''));
  }
  return getLegacyYearScore(exp?.period);
}

export function sortExperienceByDate(experience) {
  return [...(experience || [])].sort((a, b) => getExperienceSortScore(b) - getExperienceSortScore(a));
}

export function toFormInitialValues(experienceItem) {
  if (!experienceItem) return {};
  const parsed = parsePeriod(experienceItem.period);
  return {
    ...experienceItem,
    startDate: parsed?.startDate || '',
    endDate: parsed?.endDate || '',
    isPresent: parsed?.isPresent || false,
  };
}
