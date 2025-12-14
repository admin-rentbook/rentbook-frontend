import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components';
import { Waitlist } from './Waitlist';
import { Wishlist } from './Wishlist';

export const WaitWishLists = () => {
  return (
    <div className="px-8 flex flex-col py-5 gap-6">
      <Tabs className="w-full" defaultValue="WISHLIST">
        <TabsList className="w-fit gap-4">
          <TabsTrigger
            className="data-[state=active]:bg-primary-500 text-black-400 px-4 data-[state=active]:px-4 data-[state=active]:text-white"
            value="WISHLIST"
          >
            Wishlist
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary-500 data-[state=active]:text-white text-black-400 px-4 data-[state=active]:px-4"
            value="WAITLIST"
          >
            Waitlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="WISHLIST" className="flex-1">
          <Wishlist />
        </TabsContent>
        <TabsContent value="WAITLIST" className="flex-1">
          <Waitlist />
        </TabsContent>
      </Tabs>
    </div>
  );
};
