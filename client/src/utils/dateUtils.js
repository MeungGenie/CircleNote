import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
