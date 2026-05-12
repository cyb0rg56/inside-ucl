import type { CodeName } from '@/types/person';

export const PLACEHOLDER = 'Not provided';

export function formatText(value: string | null | undefined): string {
  if (value == null) return PLACEHOLDER;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : PLACEHOLDER;
}

export function formatList(values: readonly string[] | null | undefined): string {
  if (!values || values.length === 0) return PLACEHOLDER;
  return values.join(', ');
}

export function formatCodeName(value: CodeName | null | undefined): string {
  return formatText(value?.name ?? null);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return PLACEHOLDER;

  const normalized = value.replace(/T\d{2}:\d{2}:\d{2}$/, '');
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    return normalized;
  }

  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(
  value: number | null | undefined,
  options?: { suffix?: string }
): string {
  if (value == null || Number.isNaN(value)) return PLACEHOLDER;
  return options?.suffix ? `${value} ${options.suffix}` : String(value);
}
