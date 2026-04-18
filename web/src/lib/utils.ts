/**
 * Halqa Unified Utility Layer
 * Phase 33: Enterprise Sanitation
 */

/**
 * Joins class names and filters out falsy values.
 * Simple replacement for clsx/tailwind-merge.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Generates a clean, URL-safe slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

/**
 * Generic debounce utility for performance-critical events.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
