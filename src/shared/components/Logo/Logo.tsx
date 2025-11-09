import logo from '@/assets/images/logo.png';

type LogoProps = {
  textSize?: string;
  imgSize?: string;
};
export const Logo = ({
  textSize = 'text-[1.375rem]',
  imgSize = 'size-10',
}: LogoProps) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <img src={logo} alt="logo" className={`${imgSize}`} />
      <h5 className={`font-abeat text-black-500 ${textSize}`}>rentbook</h5>
    </div>
  );
};
