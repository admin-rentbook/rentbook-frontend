export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface TimezoneInfo {
  abbreviation: string;
  name: string;
  offset: string;
  time: string;
}

export const getNamibiaTimezone = (): TimezoneInfo => {
  const timezone = 'Africa/Windhoek';
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });

  const parts = formatter.formatToParts(now);
  const abbreviation =
    parts.find((part) => part.type === 'timeZoneName')?.value || 'CAT';

  const longFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'long',
  });

  const longParts = longFormatter.formatToParts(now);
  const name =
    longParts.find((part) => part.type === 'timeZoneName')?.value ||
    'Central Africa Time';

  const offsetMinutes = getTimezoneOffset(timezone);
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const offset = `UTC${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const time = timeFormatter.format(now);

  return {
    abbreviation,
    name,
    offset,
    time,
  };
};

const getTimezoneOffset = (timezone: string): number => {
  const now = new Date();
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
};

export const getNamibiaTimezoneString = (): string => {
  const info = getNamibiaTimezone();
  return `${info.abbreviation} (${info.name}), ${info.offset}, ${info.time}`;
};

export const getNamibiaTimezoneShort = (): string => {
  const info = getNamibiaTimezone();
  return `${info.abbreviation}, ${info.offset}`;
};

export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

export const formatTimeToDisplay = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${period}`;
};

export function formatForDateInput(date: string | Date | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  console.log('date', d);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().substring(0, 10);
}

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
  if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  return 'Just now';
};

export const formatDateForInput = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0];
};

/**
 * Converts HH:mm format to HH:mm:ss format for API requests
 * @param time - Time string in HH:mm format (e.g., "09:30")
 * @returns Time string in HH:mm:ss format (e.g., "09:30:00")
 */
export const formatTimeForApi = (time: string): string => {
  if (!time) return '';
  // If already has seconds, return as is
  if (time.split(':').length === 3) return time;
  // Add :00 seconds
  return `${time}:00`;
};

/**
 * Extracts HH:mm from ISO datetime string or HH:mm:ss format
 * @param isoTime - ISO datetime string or time string with seconds
 * @returns Time string in HH:mm format
 */
export const formatTimeFromISO = (isoTime: string): string => {
  if (!isoTime) return '';
  const date = new Date(isoTime);
  // Check if valid date
  if (!isNaN(date.getTime())) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  // If not a valid date, try to extract HH:mm from time string
  const parts = isoTime.split(':');
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return '';
};
