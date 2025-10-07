import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { BaseFieldProps } from '@/types';
import type { FieldValues } from 'react-hook-form';

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
