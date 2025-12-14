import facebookIcon from '@/assets/icons/bi_facebook.svg?react';
import instagramIcon from '@/assets/icons/bi_instagram.svg?react';
import twitterIcon from '@/assets/icons/flowbite_x-solid.svg?react';
import linkedinIcon from '@/assets/icons/mdi_linkedin.svg?react';
import logo from '@/assets/images/logo.png';
import { Button } from '../ui';
export const Footer = () => {
  return (
    <div className="bg-warning-300">
      <div className="px-4 gap-6 md:px-6 lg:px-8 2xl:px-30 pt-8 grid md:grid-cols-[50%_25%_25%] 2xl:grid-cols-[60%_20%_20%] pb-10">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex gap-1 items-center pb-1">
              <img src={logo} className="cursor-pointer" alt="RentBook" />
              <h4 className="logo-text text-black-500">rentbook</h4>
            </div>
            <p className="text-body-small text-neutral-600">
              Find your dream home today
            </p>
          </div>
          <div className="flex gap-3 justify-start">
            {icons.map((Icon, index) => (
              <Button variant="link" className="pl-0" key={index}>
                <Icon className="size-5" />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-body-medium text-icons-black">Rentbook</p>
          {footerLinks.slice(0, 3).map((link) => (
            <p className="text-body-18 text-black-400 hover:cursor-pointer hover:underline">{link.name}</p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-body-medium text-icons-black">Support</p>
          {footerLinks.slice(3).map((link) => (
            <p className="text-body-18 text-black-400">{link.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const icons = [facebookIcon, linkedinIcon, twitterIcon, instagramIcon];

const footerLinks = [
  {
    name: 'About Rentbook',
    link: '',
  },
  {
    name: 'Privacy policy',
    link: '',
  },
  {
    name: 'Terms of service',
    link: '',
  },
  {
    name: 'Help center',
    link: '',
  },
  {
    name: 'Contact us',
    link: '',
  },
];
