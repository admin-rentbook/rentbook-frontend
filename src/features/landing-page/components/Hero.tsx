import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/shared/components/Form';
import {
  Button,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui';
import { Label } from '@/shared/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowMoveDownLeftIcon } from 'hugeicons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const validationSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'), // Fixed
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(100, 'Description must be at most 100 characters'),
  role: z.string().min(1, 'Please select a role'), // Added validation
});
export const Hero = () => {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      username: '',
      email: '',
      description: '',
      role: '',
    },
  });

  function onSubmit(data: z.infer<typeof validationSchema>) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-abeat text-black-500 text-4xl">rentbook</h1>
      <div>
        <Form form={form} onSubmit={onSubmit}>
          <div className="grid gap-4 pb-10">
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              // disabled
              placeholder="Enter email"
            />
            <FormInput
              control={form.control}
              name="username"
              label="Username"
              placeholder="Enter username"
            />
            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              placeholder="enter description"
            />
            <FormSelect
              control={form.control}
              name="role"
              label="Role"
              placeholder="select role"
              options={[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Owner', value: 'OWNER' },
              ]}
            />
            <Checkbox size="lg" />
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit">submit</Button>
        </Form>

        <div className="flex gap-3 pt-10 ">
          <div className="flex flex-col gap-5">
            <h5>Primary Button variants</h5>
            <div className="flex gap-10">
              <Button>Primary</Button>
              <Button disabled>Disabled</Button>
              <Button>
                <ArrowMoveDownLeftIcon />
                Primary
              </Button>
            </div>
            <div className="flex gap-10">
              <Button variant="secondary">
                <ArrowMoveDownLeftIcon />
                Secondary
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button variant="secondary">Disabled</Button>
            </div>
            <div className="flex gap-10">
              <Button variant="foundation">
                <ArrowMoveDownLeftIcon />
                Foundation
              </Button>
              <Button variant="foundation" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex gap-10">
              <Button variant="tertiary">
                <ArrowMoveDownLeftIcon />
                Tertiary
              </Button>
              <Button variant="tertiary" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" variant='outlined' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
      </div>
    </div>
  );
};
