import type { FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import React, { useState } from 'react';
import type { BaseFieldProps } from '@/shared/types';

interface FormNumberInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showErrorMessage?: boolean;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  formatDisplay?: boolean; // Format with commas in display
}

export const FormNumberInput = <TFieldValues extends FieldValues>(
  props: FormNumberInputProps<TFieldValues>
) => {
  const {
    variant = 'default',
    size = 'default',
    showErrorMessage = true,
    min,
    max,
    step = 1,
    allowDecimals = true,
    formatDisplay = true,
    ...otherProps
  } = props;

  // Format number with commas for display
  const formatNumber = (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === '') return '';
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '';

    if (!formatDisplay) return numValue.toString();

    // Format with commas
    const parts = numValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // Remove commas and parse to number
  const parseNumber = (value: string): number | undefined => {
    if (value === '' || value === undefined) return undefined;
    
    // Remove commas
    const cleanValue = value.replace(/,/g, '');
    const parsed = parseFloat(cleanValue);
    
    return isNaN(parsed) ? undefined : parsed;
  };

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => {
        const [displayValue, setDisplayValue] = useState<string>(
          formatNumber(field.value)
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let inputValue = e.target.value;

          // Remove commas for processing
          inputValue = inputValue.replace(/,/g, '');

          // Handle decimals
          if (!allowDecimals) {
            inputValue = inputValue.replace(/\./g, '');
          }

          // Only allow valid number characters
          const validChars = allowDecimals ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
          if (inputValue !== '' && !validChars.test(inputValue)) {
            return;
          }

          setDisplayValue(inputValue);

          // Convert to number and update form
          const numValue = parseNumber(inputValue);
          field.onChange(numValue);
        };

        const handleBlur = () => {
          // Format on blur
          setDisplayValue(formatNumber(field.value));
          field.onBlur();
        };

        const handleFocus = () => {
          // Remove formatting on focus for easier editing
          if (field.value !== undefined && field.value !== null) {
            setDisplayValue(field.value.toString());
          }
        };

        return (
          <FormItem>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>
              <Input
                type="text"
                placeholder={props.placeholder}
                variant={variant}
                disabled={props.disabled}
                size={size}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                inputMode="decimal"
                {...otherProps}
              />
            </FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            {showErrorMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};