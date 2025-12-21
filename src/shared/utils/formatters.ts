export type Formatter = {
  format: (value: any) => string;
  parse: (value: string) => any;
};

export const currencyFormatter = {
  format: (value: number | string | undefined, includeDecimals: boolean = true): string => {
    if (value === undefined || value === null || value === '') return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: includeDecimals ? 2 : 0,
      maximumFractionDigits: includeDecimals ? 2 : 0,
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

export const squareMeterFormatter: Formatter = {
  format: (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';

    return `${new Intl.NumberFormat('en-US').format(numValue)} m²`;
  },
  parse: (value: string): number | undefined => {
    if (!value || value.trim() === '') return undefined;
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  },
};
