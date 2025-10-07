import { Input } from '@/components/ui';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { BaseFieldProps } from '@/types';
import type { FieldValues } from 'react-hook-form';

interface FormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
}
export const FormInput = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
) => {
  const { variant = 'default' } = props;
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              type={props.type}
              placeholder={props.placeholder}
              variant={variant}
              disabled={props.disabled}
              {...field}
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
