import { useState } from 'react';
import type { DaySchedule, TimeSlot } from '@/features/listings/types/listingTypes';

// Sample data for demonstration
const sampleScheduleData: DaySchedule = {
  '2025-09-20': [
    { id: '1', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '2', startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: '3', startTime: '3:00 PM', endTime: '4:00 PM' },
  ],
  '2025-09-15': [
    { id: '4', startTime: '9:00 AM', endTime: '10:00 AM' },
    { id: '5', startTime: '2:00 PM', endTime: '3:00 PM' },
  ],
  '2025-09-25': [
    { id: '6', startTime: '11:00 AM', endTime: '12:00 PM' },
  ],
  '2025-12-05': [
    { id: '7', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '8', startTime: '2:00 PM', endTime: '3:00 PM' },
  ],
  '2025-12-12': [
    { id: '9', startTime: '9:00 AM', endTime: '10:00 AM' },
    { id: '10', startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: '11', startTime: '4:00 PM', endTime: '5:00 PM' },
  ],
  '2025-12-20': [
    { id: '12', startTime: '11:00 AM', endTime: '12:00 PM' },
    { id: '13', startTime: '3:00 PM', endTime: '4:00 PM' },
  ],
  '2025-12-25': [
    { id: '14', startTime: '10:00 AM', endTime: '11:00 AM' },
  ],
};

export const useReschedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showRescheduleView, setShowRescheduleView] = useState(false);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate 20 years (10 before and 10 after current year)
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasSchedule = sampleScheduleData[dateString];

    if (hasSchedule) {
      setSelectedDate(dateString);
    }
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    console.log(timeSlot)
    setShowRescheduleView(true);
  };

  const handleYearChange = (year: string) => {
    setCurrentYear(Number(year));
  };

  const selectedTimeSlots = selectedDate ? sampleScheduleData[selectedDate] || [] : [];
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const getDateString = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const hasSchedule = (dateString: string) => {
    return !!sampleScheduleData[dateString];
  };

  const isToday = (dateString: string) => {
    return dateString === todayString;
  };

  return {
    currentMonth,
    currentYear,
    selectedDate,
    showRescheduleView,
    todayString,
    monthNames,
    years,
    selectedTimeSlots,
    daysInMonth,
    firstDay,
    handlePrevMonth,
    handleNextMonth,
    handleDayClick,
    handleTimeSlotClick,
    handleYearChange,
    setShowRescheduleView,
    getDateString,
    hasSchedule,
    isToday,
  };
};