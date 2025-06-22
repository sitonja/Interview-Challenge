import { formatDate } from "../../src/modern/utils/date.util";

describe('formatDate', () => {
  it('should format a date to YYYY-MM-DD', () => {
    const date = new Date('2023-10-15T12:34:56.789Z');
    const result = formatDate(date);
    expect(result).toBe('2023-10-15');
  });

  it('should handle single-digit months and days correctly', () => {
    const date = new Date('2023-01-05T00:00:00.000Z');
    const result = formatDate(date);
    expect(result).toBe('2023-01-05');
  });

  it('should return the current date in YYYY-MM-DD format', () => {
    const now = new Date();
    const expected = now.toISOString().split('T')[0];
    const result = formatDate(now);
    expect(result).toBe(expected);
  });
});