import property2 from '@/assets/images/property-2.jpg';
import property3 from '@/assets/images/property-3.jpg';
import property1 from '@/assets/images/property-image.jpg';

interface PropertyImageProps {
  width?: number;
  height?: number;
}
export const PropertyImage = ({
  width = 220,
  height = 200,
}: PropertyImageProps) => {
  const mobileScale = 0.65; 
  const tabletScale = 0.85; 
  
  return (
    <>
      <div className="relative flex items-center justify-center -space-x-8 sm:hidden">
        <img
          src={property1}
          alt="create-property"
          className="rounded-[24px] -rotate-[11.4deg] z-10"
          style={{ 
            width: `${width * mobileScale}px`, 
            height: `${height * mobileScale}px`
          }}
        />
        <img
          src={property2}
          alt="create-property"
          className="rounded-[24px] mb-6 rotate-[3.87deg] z-20"
          style={{ 
            width: `${width * mobileScale}px`, 
            height: `${height * mobileScale}px`
          }}
        />
        <img
          src={property3}
          alt="create-property"
          className="rounded-[24px] -ml-4 mt-3 rotate-[15deg] z-30"
          style={{ 
            width: `${width * mobileScale}px`, 
            height: `${height * mobileScale}px`
          }}
        />
      </div>

      <div className="relative hidden sm:flex md:hidden items-center justify-center -space-x-12">
        <img
          src={property1}
          alt="create-property"
          className="rounded-[30px] -rotate-[11.4deg] z-10"
          style={{ 
            width: `${width * tabletScale}px`, 
            height: `${height * tabletScale}px`
          }}
        />
        <img
          src={property2}
          alt="create-property"
          className="rounded-[30px] mb-8 rotate-[3.87deg] z-20"
          style={{ 
            width: `${width * tabletScale}px`, 
            height: `${height * tabletScale}px`
          }}
        />
        <img
          src={property3}
          alt="create-property"
          className="rounded-[30px] -ml-6 mt-4 rotate-[15deg] z-30"
          style={{ 
            width: `${width * tabletScale}px`, 
            height: `${height * tabletScale}px`
          }}
        />
      </div>

      <div className="relative hidden md:flex items-center justify-center -space-x-16">
        <img
          src={property1}
          alt="create-property"
          className="rounded-[36px] -rotate-[11.4deg] z-10"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`
          }}
        />
        <img
          src={property2}
          alt="create-property"
          className="rounded-[36px] mb-10 rotate-[3.87deg] z-20"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`
          }}
        />
        <img
          src={property3}
          alt="create-property"
          className="rounded-[36px] -ml-8 mt-5 rotate-[15deg] z-30"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`
          }}
        />
      </div>
    </>
  );
};