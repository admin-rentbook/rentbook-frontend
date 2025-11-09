import logo from '@/assets/images/auth-logo.png';
import {
  AvatarFallback,
  AvatarImage,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/components';
import { useCarouselHook } from '@/shared/hooks';
import { getInitials } from '@/shared/utils';
import { Avatar } from '@radix-ui/react-avatar';
import Autoplay from 'embla-carousel-autoplay';
import { Cancel01Icon } from 'hugeicons-react';
import type { TestimonialInfo } from '../types';

type TestimonialProps = {
  testimonials: TestimonialInfo[];
  onClose: (open: boolean) => void;
};
export const Testimonials = (props: TestimonialProps) => {
  const { setApi, api, currentIndex } = useCarouselHook();
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex justify-end">
        <div
          className="size-10 items-center cursor-pointer text-icons-black flex justify-center bg-white p-[10px] shadow-xs rounded-full"
          onClick={() => props.onClose(false)}
        >
          <Cancel01Icon className="size-6 " />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img src={logo} alt="logo" className="object-cover h-auto w-2/3" />
      </div>
      <div className="flex flex-col gap-2 pb-2">
        <Carousel
          opts={{ align: 'start', loop: false }}
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {props.testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.fullName}
                className={`transition-all duration-500 ease-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
              >
                <div className="flex flex-col gap-3">
                  <p className="text-body-base text-black-500">
                    {`"${testimonial.testimony}"`}
                  </p>
                  <div className="flex gap-2 items-center">
                    <Avatar className="size-[50px] rounded-full">
                      <AvatarImage
                        className="object-cover rounded-full size-[50px]"
                        src={testimonial.image}
                      />
                      <AvatarFallback>
                        {getInitials(testimonial.fullName)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-body-medium text-black-500">
                        {testimonial.fullName}
                      </p>
                      <p className="text-body-small text-black-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  {props.testimonials.length > 1 && (
                    <div className="flex gap-1">
                      {Array.from({ length: props.testimonials.length }).map(
                        (_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              api?.scrollTo(index);
                            }}
                            className={`h-[3px] rounded-[3px] transition-all duration-300 hover:scale-110 ${
                              index === currentIndex
                                ? 'w-4 bg-primary-500'
                                : 'w-4 bg-custom-gray-300'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

// background: linear-gradient(180deg, #D91875 0%, #EA8E04 100%);
