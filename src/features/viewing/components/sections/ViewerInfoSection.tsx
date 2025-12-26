import agentImg from '@/assets/images/avatar.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components';
import { Call02Icon, Flag02Icon, Mail02Icon } from 'hugeicons-react';
import { useState } from 'react';
import { ReportModal } from '../ReportModal';

type ViewerInfoSectionProps = {
  viewer: {
    name: string;
    email: string;
    image?: string;
  };
};

const contactItems = [
  {
    name: 'Phone',
    icon: Call02Icon,
  },
  {
    name: 'Message',
    icon: Mail02Icon,
  },
  {
    name: 'Report',
    icon: Flag02Icon,
  },
];

export const ViewerInfoSection = ({ viewer }: ViewerInfoSectionProps) => {
  const [isOpenReport, setIsOpenReport] = useState(false);

  const handleContactClick = (contactName: string) => {
    if (contactName === 'Report') {
      setIsOpenReport(true);
    }
    // Handle other contact actions (Phone, Message) here
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-body-sm-semi text-black-300">Viewer</p>

        <div className="h-[1px] w-full bg-custom-neutral-100" />

        <div className="flex gap-3 items-center justify-between pb-3">
          <div className="flex gap-3 items-center">
            <Avatar className="size-[50px]">
              <AvatarImage className="object-cover" src={viewer.image || agentImg} />
              <AvatarFallback>
                {viewer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body text-neutral-600">{viewer.name}</p>
              <p className="text-body-small text-black-300">{viewer.email}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            {contactItems.map((contact) => (
              <div
                key={contact.name}
                className="size-[45px] grid place-items-center rounded-full border border-custom-gray-300 hover:bg-custom-neutral-50 transition-colors cursor-pointer"
                onClick={() => handleContactClick(contact.name)}
              >
                <contact.icon className="size-5 text-black-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReportModal isOpen={isOpenReport} setIsOpen={setIsOpenReport} />
    </>
  );
};