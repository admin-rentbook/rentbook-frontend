import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import type { BaseFieldProps } from '@/shared/types';
import type { FieldValues } from 'react-hook-form';
import { Label, RadioGroup, RadioGroupItem } from '../ui';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormRadioProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
  showErrorMessage?: boolean;
  itemClassName?: string;
}

export const FormRadio = <TFieldValues extends FieldValues>(
  props: FormRadioProps<TFieldValues>
) => {
  const {
    options,
    orientation = 'vertical',
    showErrorMessage = true,
    itemClassName,
  } = props;

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              disabled={props.disabled}
              className={
                orientation === 'horizontal'
                  ? 'flex flex-wrap gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={
                    itemClassName ||
                    'flex items-center gap-3 border border-neutral-200 rounded-lg p-3 hover:bg-gray-50 transition-colors'
                  }
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`${props.name}-${option.value}`}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={`${props.name}-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          {showErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
