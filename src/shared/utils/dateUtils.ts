export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// utils/timezone.ts

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
