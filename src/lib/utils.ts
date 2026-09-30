import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, unit: 'L' | 'Cr' = 'L'): string {
  if (unit === 'Cr') return `₹${amount}Cr`;
  return `₹${amount}L`;
}

export function formatPackage(lakhs: number): string {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`;
  return `₹${lakhs}L`;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#059669'; // green
  if (score >= 75) return '#2563eb'; // blue
  if (score >= 60) return '#d97706'; // amber
  return '#dc2626'; // red
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Average';
  return 'Below Average';
}

export function getMatchColor(percent: number): string {
  if (percent >= 85) return '#059669';
  if (percent >= 70) return '#2563eb';
  if (percent >= 55) return '#d97706';
  return '#dc2626';
}

export function getProbabilityLabel(prob: number): { label: string; color: string; bg: string } {
  if (prob >= 75) return { label: 'High Chance', color: '#059669', bg: '#dcfce7' };
  if (prob >= 55) return { label: 'Good Chance', color: '#2563eb', bg: '#dbeafe' };
  if (prob >= 35) return { label: 'Moderate Chance', color: '#d97706', bg: '#fef3c7' };
  if (prob >= 15) return { label: 'Low Chance', color: '#dc2626', bg: '#fee2e2' };
  return { label: 'Highly Competitive', color: '#7c3aed', bg: '#ede9fe' };
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '…';
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
