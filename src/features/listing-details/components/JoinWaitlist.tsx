import { usePropertyInfoStore } from '@/core/store';
import { Button } from '@/shared/components';
import type { PropertyDTO } from '@/shared/types';
import { currencyFormatter } from '@/shared/utils';
import { CalendarLock01Icon } from 'hugeicons-react';

type JoinWaitlistProps = {
  property: PropertyDTO;
};

export const JoinWaitlist = ({ property }: JoinWaitlistProps) => {
  const toggleWaitlist = usePropertyInfoStore((s) => s.toggleWaitlist);
  const isWaitlisted = usePropertyInfoStore((s) =>
    s.isWaitlisted(property?.id ?? '')
  );
  return (
    <div className="flex flex-col gap-10 p-3 shadow-ter rounded-[1.25em] aspect-[4/3] w-full max-w-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-body text-neutral-600/50">Rental price</p>
          <p>
            <span className="text-heading-4 text-black-500">
              {currencyFormatter.format(property.amount)}
            </span>
            <span className="text-body text-black-300">/month</span>
          </p>
          <p className="text-caption underline">View price breakdown</p>
        </div>
        <div className="rounded-full grid place-items-center bg-sidebar-accent p-2">
          <p className="text-caption text-black-500">Available in 10 days</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={() => toggleWaitlist(property)}>
          {isWaitlisted ? 'Leave waitlist' : 'Join waitlist'}{' '}
        </Button>
        <Button size="lg" variant="tertiary">
          Request a viewing (N$99)
        </Button>

        <div className="flex text-primary-500 text-body gap-2 pt-3">
          <CalendarLock01Icon />
          <p>
            Listing will be available on Tue, November 13, 2025, 10:00AM.{' '}
            <span className="underline hover:cursor-pointer">Read more</span>
          </p>
        </div>
      </div>
    </div>
  );
};
