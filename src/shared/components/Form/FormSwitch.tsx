import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import type { BaseFieldProps } from '@/shared/types';
import type { FieldValues } from 'react-hook-form';

interface FormSwitchProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldProps<TFieldValues> {
  showErrorMessage?: boolean;
  className?: string;
  thumbClassName?:string
}

export const FormSwitch = <TFieldValues extends FieldValues>(
  props: FormSwitchProps<TFieldValues>
) => {
  const {
    control,
    name,
    label,
    description,
    showErrorMessage = true,
    disabled,
    className,
  } = props;

  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            {props.label && <Label htmlFor={name}>{label}</Label>}
            <FormControl>
              <Switch
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className={className}
                thumbClassName={props.thumbClassName}
              />
            </FormControl>
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          {showErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
