export type Formatter = {
  format: (value: any) => string;
  parse: (value: string) => any;
};

export const currencyFormatter: Formatter = {
  format: (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(numValue)
      .replace('$', 'N$');
  },
  parse: (value: string): number | undefined => {
    if (!value || value.trim() === '') return undefined;
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  },
};

export const percentageFormatter: Formatter = {
  format: (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';
    return `${numValue}%`;
  },
  parse: (value: string): number | undefined => {
    if (!value || value.trim() === '') return undefined;
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  },
};

export const numberFormatter: Formatter = {
  format: (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';
    return new Intl.NumberFormat('en-US').format(numValue);
  },
  parse: (value: string): number | undefined => {
    if (!value || value.trim() === '') return undefined;
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  },
};

export const phoneFormatter: Formatter = {
  format: (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  },
  parse: (value: string): string => {
    return value.replace(/\D/g, '');
  },
};

// Add more formatters as needed
export const dateFormatter: Formatter = {
  format: (value: Date | string): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US');
  },
  parse: (value: string): Date => {
    return new Date(value);
  },
};
