import type { selectTriggerVariants } from '@/shared/lib/design-system';
import type { BaseFieldProps } from '@/shared/types';
import type { VariantProps } from 'class-variance-authority';
import type { FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues>,
    VariantProps<typeof selectTriggerVariants> {
  options: SelectOption[];
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
  emptyText?: string;
}

export const FormSelect = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          {props.label && (
            <FormLabel
              className={
                props.required
                  ? "after:content-['*'] after:ml-0.5 after:text-red-300"
                  : ''
              }
            >
              {props.label}
            </FormLabel>
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={props.disabled}
            {...field}
          >
            <FormControl>
              <SelectTrigger
                variant={props.variant}
                size={props.size}
                className="w-full"
              >
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.length === 0 ? (
                <SelectItem value="" disabled>
                  {props.emptyText || 'No options available'}
                </SelectItem>
              ) : (
                props.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
