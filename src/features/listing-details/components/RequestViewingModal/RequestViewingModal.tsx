import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import {
  Button,
  CalendarGrid,
  DialogComponent,
  NotificationModal,
  Sheet,
} from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import { useRequestViewing } from '../../hooks/useRequestViewing';
import type { PublicListingDTO } from '../../types';
import { RequestViewingContent } from './RequestViewingContent';

type RequestViewingModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  property: PublicListingDTO;
};

export const RequestViewingModal = ({
  isOpen,
  setIsOpen,
  property,
}: RequestViewingModalProps) => {
  const { isMobile } = useMobile();

  const {
    currentMonth,
    currentYear,
    selectedDate,
    selectedTimeSlot,
    showPaymentView,
    showSuccessModal,
    monthNames,
    years,
    selectedTimeSlots,
    daysInMonth,
    firstDay,
    viewingFee,
    serviceFee,
    totalCost,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
    handleTimeSlotClick,
    handleYearChange,
    setShowPaymentView,
    setShowSuccessModal,
    getDateString,
    isDateAvailable,
    isToday,
    getFormattedDateForNotification,
    getCancellationDate,
  } = useRequestViewing({
    availabilities: property.viewing.availabilities,
    viewingFee: property.viewing.viewing_fee,
    serviceFee: '10.00', // TODO: Get from API or config
  });

  const handleConfirmPayment = () => {
    console.log('Payment confirmed');
    // Handle payment logic here
    setShowPaymentView(false);
    setIsOpen(false);
    setShowSuccessModal(true);
  };

  const ModalContent = () => {
    if (showPaymentView) {
      return (
        <RequestViewingContent
          property={property}
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          viewingFee={viewingFee}
          serviceFee={serviceFee}
          totalCost={totalCost}
          cancellationDate={getCancellationDate()}
          onBack={() => setShowPaymentView(false)}
          onConfirm={handleConfirmPayment}
          onClose={() => setIsOpen(false)}
        />
      );
    }

    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between">
          <div>
            <h2 className="text-heading-5 text-neutral-600 mb-2">
              Request viewing
            </h2>
            <p className="text-body-small text-black-400">
              Select a date and time slot for your viewing
            </p>
          </div>

          {!isMobile && (
            <Button
              variant="icon"
              className="text-black-300"
              onClick={() => setIsOpen(false)}
            >
              <Cancel01Icon className="size-6" />
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[65%_35%] gap-4">
          {/* Calendar Side */}
          <div>
            <CalendarGrid
              currentMonth={currentMonth}
              currentYear={currentYear}
              monthNames={monthNames}
              years={years}
              daysInMonth={daysInMonth}
              firstDay={firstDay}
              selectedDate={selectedDate}
              highlightColor="primary"
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onYearChange={handleYearChange}
              onDayClick={handleDayClick}
              getDateString={getDateString}
              isDateAvailable={isDateAvailable}
              isToday={isToday}
            />
          </div>

          {/* Time Slots */}
          <div className="border-t lg:border-t-0 lg:border-l border-border/30 pt-4 lg:pt-0 lg:pl-4">
            {selectedTimeSlots.length > 0 ? (
              <div className="space-y-2">
                {selectedTimeSlots.map((slot) => (
                  <Button
                    variant="outline"
                    key={slot.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    className="rounded-full w-full !h-10"
                  >
                    <p className="text-body-medium text-black-500">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-body-small text-black-400">
                {selectedDate
                  ? 'No time slots available'
                  : 'Select a date to see available time slots'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const RequestViewingModalWrapper = isMobile ? (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
      children={<ModalContent />}
      className="h-[90vh]"
    />
  ) : (
    <DialogComponent
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-3/4 xl:w-1/2"
    >
      <ModalContent />
    </DialogComponent>
  );

  return (
    <>
      {RequestViewingModalWrapper}
      <NotificationModal
        modalOptions={{
          open: showSuccessModal,
          onOpenChange: setShowSuccessModal,
        }}
        title="Viewing request successful"
        description={`You have successfully requested a viewing on ${getFormattedDateForNotification()}. Your request is pending approval`}
        icon={SuccessIcon}
        className="w-full md:w-1/2 xl:w-1/3"
        actions={
          <div className="flex gap-2 w-full justify-center px-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-2/3 lg:w-1/2 h-11"
              size="lg"
            >
              Done
            </Button>
          </div>
        }
      />
    </>
  );
};
