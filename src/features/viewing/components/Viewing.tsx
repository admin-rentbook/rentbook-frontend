import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components';
import { Cancelled } from './Cancelled';
import { Past } from './Past';
import { Unconfirmed } from './Unconfirmed';
import { Upcoming } from './Upcoming';

export const Viewing = () => {
  return (
    <div>
      <div className="border-b-gray-50 border-0 lg:border-b p-6">
        <h3 className="text-heading-3 text-neutral.600">Viewing</h3>
      </div>
      <div className="p-3 lg:p-6">
        <Tabs className="w-full" defaultValue="UPCOMING">
          <TabsList className="w-auto gap-4 max-w-md overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.value}
                className="data-[state=active]:bg-primary-500 bg-sidebar py-2 text-black-400 px-1 lg:px-4 data-[state=active]:px-4 data-[state=active]:text-white"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.value} className="px-2">
              <tab.content />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

const tabs = [
  {
    name: 'Upcoming',
    value: 'UPCOMING',
    content: Upcoming,
  },
  {
    name: 'Unconfirmed',
    value: 'UNCONFIRMED',
    content: Unconfirmed,
  },
  {
    name: 'Past',
    value: 'PAST',
    content: Past,
  },
  {
    name: 'Cancelled',
    value: 'CANCELLED',
    content: Cancelled,
  },
];
