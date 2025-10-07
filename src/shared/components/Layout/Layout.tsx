import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      <main className='px-4' >{children}</main>
    </div>
  );
};
