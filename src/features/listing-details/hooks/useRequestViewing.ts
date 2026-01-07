import { useMemo, useState } from 'react';

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type ViewingAvailability = {
  day: string;
  start_time: string;
  end_time: string;
};

type DaySchedule = {
  [date: string]: TimeSlot[];
};

type UseRequestViewingProps = {
  availabilities: ViewingAvailability[];
  viewingFee: string;
  serviceFee?: string;
};

// Sample viewing schedule data - maps specific dates to available time slots
// TODO: Replace with actual API data
const sampleViewingSchedule: DaySchedule = {
  '2026-01-06': [
    { id: '1', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '2', startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: '3', startTime: '3:00 PM', endTime: '4:00 PM' },
  ],
  '2026-01-07': [
    { id: '4', startTime: '9:00 AM', endTime: '10:00 AM' },
    { id: '5', startTime: '2:00 PM', endTime: '3:00 PM' },
  ],
  '2026-01-08': [
    { id: '6', startTime: '11:00 AM', endTime: '12:00 PM' },
    { id: '7', startTime: '3:00 PM', endTime: '4:00 PM' },
    { id: '8', startTime: '5:00 PM', endTime: '6:00 PM' },
  ],
  '2026-01-13': [
    { id: '9', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '10', startTime: '1:00 PM', endTime: '2:00 PM' },
  ],
  '2026-01-14': [
    { id: '11', startTime: '9:00 AM', endTime: '10:00 AM' },
    { id: '12', startTime: '11:00 AM', endTime: '12:00 PM' },
    { id: '13', startTime: '2:00 PM', endTime: '3:00 PM' },
  ],
  '2026-01-15': [
    { id: '14', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '15', startTime: '3:00 PM', endTime: '4:00 PM' },
  ],
  '2026-01-20': [
    { id: '16', startTime: '9:00 AM', endTime: '10:00 AM' },
    { id: '17', startTime: '1:00 PM', endTime: '2:00 PM' },
    { id: '18', startTime: '4:00 PM', endTime: '5:00 PM' },
  ],
  '2026-01-21': [
    { id: '19', startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: '20', startTime: '2:00 PM', endTime: '3:00 PM' },
  ],
  '2026-01-22': [
    { id: '21', startTime: '11:00 AM', endTime: '12:00 PM' },
    { id: '22', startTime: '3:00 PM', endTime: '4:00 PM' },
  ],
};

export const useRequestViewing = ({
  // availabilities parameter kept for future API integration
  // Currently using sampleViewingSchedule instead
  availabilities: _availabilities,
  viewingFee,
  serviceFee = '0',
}: UseRequestViewingProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [showPaymentView, setShowPaymentView] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Generate years array (current year + next 2 years)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear() - 1;
    return Array.from({ length: 3 }, (_, i) => currentYear + i);
  }, []);

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Check if a date has viewing slots available in the schedule
  const isDateAvailable = (day: number): boolean => {
    const dateString = getDateString(day);
    const date = new Date(currentYear, currentMonth, day);

    // Don't allow past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;

    // Check if this date has any time slots in the schedule
    return (
      !!sampleViewingSchedule[dateString] &&
      sampleViewingSchedule[dateString].length > 0
    );
  };

  // Get time slots for selected date from the schedule
  const selectedTimeSlots = useMemo((): TimeSlot[] => {
    if (!selectedDate) return [];

    // Return predefined time slots for the selected date
    return sampleViewingSchedule[selectedDate] || [];
  }, [selectedDate]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleDayClick = (day: number) => {
    if (!isDateAvailable(day)) return;

    const dateString = getDateString(day);
    setSelectedDate(dateString);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setShowPaymentView(true);
  };

  const handleYearChange = (year: string) => {
    setCurrentYear(parseInt(year));
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const getDateString = (day: number): string => {
    return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const isToday = (dateString: string): boolean => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getFormattedDateForNotification = (): string => {
    if (!selectedDate || !selectedTimeSlot) return '';

    const date = new Date(selectedDate);
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  };

  // Calculate cancellation date (day before selected date)
  const getCancellationDate = (): string => {
    if (!selectedDate) return '';

    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Calculate total cost
  const calculateTotalCost = (): number => {
    const fee = parseFloat(viewingFee) || 0;
    const service = parseFloat(serviceFee) || 0;
    return fee + service;
  };

  return {
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
    viewingFee: parseFloat(viewingFee),
    serviceFee: parseFloat(serviceFee),
    totalCost: calculateTotalCost(),
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
  };
};
