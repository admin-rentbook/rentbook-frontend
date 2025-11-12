import { Button } from '@/shared/components';
import { Logo } from '@/shared/components/Logo';
import { useNavigate } from '@tanstack/react-router';
import { getStartedItems } from '../../constants';

export const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 px-10 py-8 h-screen gap-10">
      <div className="flex flex-col items-start lg:col-span-2 h-full w-full lg:w-3/4 xl:w-1/2">
        <Logo />
        <div className="flex flex-col gap-6  items-start justify-center h-full">
          <div>
            <h1 className="text-heading-1 text-black-500 ">
              It’s easy to get started on rentbook
            </h1>
            <p className="text-body-xl text-black-400 pt-4">
              List your property, manage your leases, get viewing requests all
              in one place
            </p>
          </div>
          <div>
            <Button onClick={() => navigate({ to: '/properties/create' })}>
              Get started
            </Button>
            <p className="text-body-medium text-black-400 pt-1">
              Next: Create your first property
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 h-full">
        <div className="flex flex-col items-start  justify-center h-full gap-20 w-full lg:w-3/4 xl:w-1/2">
          {getStartedItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-4">
              <item.icon className={`size-6 ${item.color}`} />
              <h4 className="text-body-medium text-custom-neutral-900">
                {item.title}
              </h4>
              <p className="text-body-small text-custom-neutral-900/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
