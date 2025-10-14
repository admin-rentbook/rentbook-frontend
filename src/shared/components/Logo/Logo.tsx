import logo from '@/assets/images/logo.png';

export const Logo = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <img src={logo} alt="logo" />
      <h5 className="font-abeat text-black-500 text-[1.375rem]">rentbook</h5>
    </div>
  );
};
