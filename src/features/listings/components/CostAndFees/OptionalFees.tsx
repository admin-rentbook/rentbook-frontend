import { MoneyBag01Icon } from 'hugeicons-react';
import { Switch } from '@/shared/components';
import { useOptionalFees } from '../../hooks';

type OptionalFeesProps = {
  listingId: number;
};

const OPTIONAL_FEE_ITEMS = [
  { name: 'Water', key: 'water' },
  { name: 'Levies', key: 'levies' },
  { name: 'Co-operative fees', key: 'cooperative' },
  { name: 'Electricity', key: 'electricity' },
] as const;

export const OptionalFees = ({ listingId }: OptionalFeesProps) => {
  const { optionalFeesState, toggleOptionalFee, isTogglingFee } =
    useOptionalFees(listingId);

  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-sidebar rounded-[1.25rem]">
      <div className="flex gap-2 items-center text-gray-600">
        <MoneyBag01Icon className="h-5 w-5" />
        <h5 className="text-body-lg">Select fees included in the rental price</h5>
      </div>
      <div className="flex flex-col gap-3">
        {OPTIONAL_FEE_ITEMS.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-2"
          >
            <span className="text-body text-black-500">{item.name}</span>
            <Switch
              checked={optionalFeesState[item.key]}
              onCheckedChange={() => toggleOptionalFee(item.key, item.name)}
              disabled={isTogglingFee === item.key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};