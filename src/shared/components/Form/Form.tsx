import { Form as ShadForm } from '@/shared/components/ui/form';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export const Form = <TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues>
) => {
  return (
    <ShadForm {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </ShadForm>
  );
};
