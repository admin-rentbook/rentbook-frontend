import { Add01Icon } from 'hugeicons-react';
import { DAYS_OF_WEEK } from '../../constants';
import type { UseViewingTimes } from '../../hooks';
import { DeleteDayConfirmation } from './DeleteDayConfirmation';
import { TimeSlotRow } from './TimeSlotRow';

type PropertyViewingTimeProps = {
  viewTimesHook: UseViewingTimes;
};

export const PropertyViewingTime = ({
  viewTimesHook,
}: PropertyViewingTimeProps) => {
  return (
    <div className="rounded-[1.5em] border border-custom-gray-100">
      <div className="">
        {DAYS_OF_WEEK.map((day) => {
          const daySlots = viewTimesHook.schedule[day] || [];
          const hasSlots = daySlots.length > 0;

          return (
            <div key={day} className="grid grid-cols-[15%_85%]">
              <div
                className={`bg-sidebar p-5 ${day === 'Sun' ? 'border-b-0 ' : 'border-b'}
                 ${day === 'Mon' ? 'rounded-tl-[1.25em]' : 'rounded-none'} border-b-custom-gray-100
                 ${day === 'Sun' ? 'rounded-bl-[1.25em]' : 'rounded-none'}
                 `}
              >
                <p className="text-body-base-normal text-center text-icons-black/50">
                  {day}
                </p>
              </div>
              <div className="flex items-center px-4">
                {!hasSlots ? (
                  <div
                    className="flex justify-center py-2 gap-2 text-icons-black/50 cursor-pointer border border-dashed border-custom-gray-500 rounded-[0.75em] w-full"
                    onClick={() => viewTimesHook.addTimeSlot(day)}
                  >
                    <Add01Icon className="size-5" />
                    <p className="text-body-medium">Add time</p>
                  </div>
                ) : (
                  <div className='w-full py-1'>
                    {daySlots.map((slot, index) => (
                      <TimeSlotRow
                        key={slot.id}
                        day={day}
                        index={index}
                        slot={slot}
                        onUpdate={(field, value) =>
                          viewTimesHook.updateTimeSlot(
                            day,
                            slot.id,
                            field,
                            value
                          )
                        }
                        onDelete={() =>
                          viewTimesHook.deleteTimeSlot(day, slot.id)
                        }
                        onCopy={viewTimesHook.copyTimesToDays}
                        addTimeSlot={viewTimesHook.addTimeSlot}
                        deleteAllTimeSlots={viewTimesHook.handleDeleteAll}
                        showCopyButton={index === 0}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <DeleteDayConfirmation
        isOpen={!!viewTimesHook.deleteConfirmDay}
        onDeleteAll={viewTimesHook.confirmDelete}
        setIsOpen={() => viewTimesHook.setDeleteConfirmDay(null)}
      />
    </div>
  );
};
