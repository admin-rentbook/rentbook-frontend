import { useEffect, useState } from 'react';
import type { DayOfWeek } from '../constants';
import { useListingDraft } from '../providers';
import type { DaySchedule, TimeSlot } from '../types';
import { useAutoSaveValue } from './useAutoSave';

export type UseViewingTimes = {
  schedule: DaySchedule;
  addTimeSlot: (day: DayOfWeek) => void;
  updateTimeSlot: (
    day: DayOfWeek,
    slotId: string,
    field: 'startTime' | 'endTime',
    value: string
  ) => void;
  deleteTimeSlot: (day: DayOfWeek, slotId: string) => void;
  deleteAllTimeSlots: (day: DayOfWeek) => void;
  copyTimesToDays: (sourceDay: DayOfWeek, targetDays: DayOfWeek[]) => void;
  deleteConfirmDay: DayOfWeek | null;
  setDeleteConfirmDay: React.Dispatch<React.SetStateAction<DayOfWeek | null>>;
  handleDeleteAll: (day: DayOfWeek) => void;
  confirmDelete: () => void;
};
export const useViewingTimes = (): UseViewingTimes => {
  const { updateStepData, draft } = useListingDraft();
  const [schedule, setSchedule] = useState<DaySchedule>(
    draft?.viewingTimes?.viewingTimesData ?? {}
  );
  const [deleteConfirmDay, setDeleteConfirmDay] = useState<DayOfWeek | null>(
    null
  );

  // Update schedule when draft changes (from API)
  useEffect(() => {
    if (draft?.viewingTimes?.viewingTimesData) {
      setSchedule(draft.viewingTimes.viewingTimesData);
    }
  }, [draft?.viewingTimes?.viewingTimesData]);

  const handleDeleteAll = (day: DayOfWeek) => {
    setDeleteConfirmDay(day);
  };
  const confirmDelete = () => {
    if (deleteConfirmDay) {
      deleteAllTimeSlots(deleteConfirmDay);
      setDeleteConfirmDay(null);
    }
  };

  const addTimeSlot = (day: DayOfWeek) => {
    const newSlot: TimeSlot = {
      id: `${day}-${Date.now()}`,
      startTime: '09:00',
      endTime: '17:00',
    };

    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newSlot],
    }));
  };

  const updateTimeSlot = (
    day: DayOfWeek,
    slotId: string,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  const deleteTimeSlot = (day: DayOfWeek, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }));
  };

  const deleteAllTimeSlots = (day: DayOfWeek) => {
    setSchedule((prev) => {
      const updated = { ...prev };
      delete updated[day];
      return updated;
    });
  };

  const copyTimesToDays = (sourceDay: DayOfWeek, targetDays: DayOfWeek[]) => {
    const sourceSlots = schedule[sourceDay] || [];

    setSchedule((prev) => {
      const updated = { ...prev };
      targetDays.forEach((day) => {
        updated[day] = sourceSlots.map((slot) => ({
          ...slot,
          id: `${day}-${Date.now()}-${Math.random()}`,
        }));
      });
      return updated;
    });
  };

  useAutoSaveValue(schedule, (current) => {
    const currentDraft = draft?.viewingTimes;
    updateStepData('viewingTimes', {
      ...currentDraft,
      viewingTimesData: current,
    });
  });

  return {
    schedule,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    deleteAllTimeSlots,
    copyTimesToDays,
    setDeleteConfirmDay,
    deleteConfirmDay,
    handleDeleteAll,
    confirmDelete,
  };
};
