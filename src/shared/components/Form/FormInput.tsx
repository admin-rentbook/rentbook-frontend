import type { BaseFieldProps } from '@/shared/types';
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
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg' ;
}
export const FormInput = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
) => {
  const { variant = 'default', type = 'text', size = 'md' } = props;
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={props.placeholder}
              variant={variant}
              disabled={props.disabled}
              size={size as any}
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
