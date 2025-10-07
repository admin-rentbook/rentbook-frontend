import type { BaseFieldProps } from '@/shared/types';
import type { FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';

interface FormTextareaProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  rows?: number;
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
}

export const FormTextarea = <TFieldValues extends FieldValues>(
  props: FormTextareaProps<TFieldValues>
) => {
  const { variant = 'default', rows = 4 } = props;
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              variant={variant}
              rows={rows}
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
