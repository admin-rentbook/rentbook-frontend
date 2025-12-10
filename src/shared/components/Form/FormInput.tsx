import { cn } from '@/shared/lib/utils';
import type { BaseFieldProps } from '@/shared/types';
import type { Formatter } from '@/shared/utils';
import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Input } from '../ui';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface FormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'hidden'
    | 'number'
    | 'date';
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | '4xl';
  showErrorMessage?: boolean;
  customInput?: React.ReactNode;
  leadingAddOn?: React.ReactNode;
  trailingAddOn?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  descriptionNode?: React.ReactNode;
  className?: string;
  formatter?: Formatter;
}
export const FormInput = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
) => {
  const {
    variant = 'default',
    type = 'text',
    size = 'default',
    showErrorMessage = false,
    customInput,
    leadingAddOn,
    trailingAddOn,
    min,
    max,
    step,
    formatter,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (type === 'hidden') {
    return (
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => <input type="hidden" {...field} />}
      />
    );
  }

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (type === 'number') {
      const value = e.target.value;
      if (value === '') {
        onChange('');
        return;
      }
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        // Apply min/max constraints
        let constrainedValue = numValue;
        if (min !== undefined && numValue < min) constrainedValue = min;
        if (max !== undefined && numValue > max) constrainedValue = max;
        onChange(constrainedValue);
      }
    } else {
      onChange(e);
    }
  };

  const hasAddOns = leadingAddOn || trailingAddOn;
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => {
        const displayValue =
          formatter && !isFocused
            ? formatter.format(field.value)
            : isFocused
              ? inputValue
              : (field.value ?? '');

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          if (formatter) {
            // Show raw value when focused
            const rawValue = field.value?.toString() ?? '';
            setInputValue(rawValue);
            setTimeout(() => e.target.select(), 0);
          }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          if (formatter) {
            const parsedValue = formatter.parse(e.target.value);
            field.onChange(parsedValue);
          }
          field.onBlur();
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (formatter && isFocused) {
            // While focused, allow raw input
            setInputValue(e.target.value)
          } else if (type === 'number') {
            const value = e.target.value;
            if (value === '') {
              field.onChange('');
              return;
            }
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              let constrainedValue = numValue;
              if (min !== undefined && numValue < min) constrainedValue = min;
              if (max !== undefined && numValue > max) constrainedValue = max;
              field.onChange(constrainedValue);
            }
          } else {
            field.onChange(e);
          }
        };
        return (
          <FormItem>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>
              {customInput ? (
                React.cloneElement(customInput as React.ReactElement, {
                  ...field,
                  ...inputProps,
                })
              ) : hasAddOns ? (
                <div className="relative flex items-center">
                  {leadingAddOn && (
                    <div
                      className={cn(
                        'absolute left-0 flex items-center justify-center px-3 pointer-events-none',
                        'text-sm text-muted-foreground',
                        size === 'sm' && 'text-xs px-2',
                        size === 'lg' && 'text-base px-4'
                      )}
                    >
                      {leadingAddOn}
                    </div>
                  )}
                  <Input
                    type={type}
                    placeholder={props.placeholder}
                    variant={variant}
                    disabled={props.disabled}
                    size={size}
                    min={min}
                    max={max}
                    step={step}
                    className={cn(
                      leadingAddOn && 'pl-12',
                      trailingAddOn && 'pr-20',
                      size === 'sm' && leadingAddOn && 'pl-10',
                      size === 'sm' && trailingAddOn && 'pr-16'
                    )}
                    {...field}
                    onChange={(e) => handleNumberChange(e, field.onChange)}
                    value={field.value ?? ''}
                  />
                  {trailingAddOn && (
                    <div
                      className={cn(
                        'absolute right-0 flex items-center justify-center px-3 pointer-events-none',
                        'text-sm text-muted-foreground',
                        size === 'sm' && 'text-xs px-2',
                        size === 'lg' && 'text-base px-4'
                      )}
                    >
                      {trailingAddOn}
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  type={type}
                  placeholder={props.placeholder}
                  variant={variant}
                  disabled={props.disabled}
                  size={size}
                  min={min}
                  max={max}
                  step={step}
                  {...field}
                  onChange={handleChange}
                  value={displayValue}
                  className={props.className}
                  onFocus={formatter ? handleFocus : undefined}
                  onBlur={formatter ? handleBlur : field.onBlur}
                />
              )}
            </FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            {props.descriptionNode && props.descriptionNode}
            {props.showErrorMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};
