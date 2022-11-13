import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const MONTHS: string[] = [
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

const DAYS: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DAYS_ACC: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

type CalendarSelection = CalendarView & {
    day: number;
};

type CalendarView = {
    month: number;
    year: number;
};

export type CalendarProps = {
    onViewChange?: (view: CalendarView) => void;
    onSelectChange?: (selection: CalendarSelection) => void;
};

type CalendarState = {
    selectedDay: Date;
    viewMonth: number;
    viewYear: number;
};

export default function Calendar(props: CalendarProps) {
    const [state, setState] = useState<CalendarState>(() => {
        const today = new Date();
        return {
            selectedDay: today,
            viewMonth: today.getMonth(),
            viewYear: today.getFullYear(),
        };
    });

    const onViewChange = () => {
        props.onViewChange?.({ month: state.viewMonth, year: state.viewYear });
    };

    const onSelectChange = () => {
        props.onSelectChange?.({ day: state.selectedDay.getDate(), month: state.viewMonth, year: state.viewYear });
    };

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDayOfWeek = (day: number, month: number, year: number) => {
        return DAYS[new Date(year, month, day).getDay()];
    };

    const getListOfDays = (month: number, year: number) => {
        const numDays = daysInMonth(month, year);
        return Array.from({ length: numDays }).map((_, i) => i + 1);
    };

    const getListOfDaysWithBuffer = (month: number, year: number) => {
        let days = getListOfDays(month, year);
        const firstDay = getDayOfWeek(days[0], month, year);
        if (firstDay !== 'Sunday') {
            const dayIndex = new Date(year, month, days[0]).getDay();
            days = [...Array.from({ length: dayIndex }).map(() => 0), ...days];
        }
        return days;
    };

    const nextMonth = () => {
        setState(
            state.viewMonth === 1
                ? { ...state, viewMonth: 0, viewYear: state.viewYear + 1 }
                : { ...state, viewMonth: state.viewMonth + 1 }
        );
        onViewChange();
    };

    const previousMonth = () => {
        if (state.viewMonth === 0) {
            setState({ ...state, viewMonth: 11, viewYear: state.viewYear - 1 });
        } else {
            setState({ ...state, viewMonth: state.viewMonth - 1 });
        }
        onViewChange();
    };

    const selectMonth = (month: string) => {
        setState({ ...state, viewMonth: MONTHS.indexOf(month) });
        onViewChange();
    };

    const selectYear = (year: string) => {
        setState({ ...state, viewYear: parseInt(year) });
        onViewChange();
    };

    const selectDay = (day: number) => {
        setState({ ...state, selectedDay: new Date(state.viewYear, state.viewMonth, day) });
        onSelectChange();
    };

    return (
        <div className='calendar'>
            <div className='month-year'>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => previousMonth()} />
                <span>
                    <span className='dropdown'>
                        <select value={MONTHS[state.viewMonth]} onChange={e => selectMonth(e.target.value)}>
                            {MONTHS.map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        {MONTHS[state.viewMonth]}
                    </span>
                    <span className='dropdown'>
                        <select value={state.viewYear} onChange={e => selectYear(e.target.value)}>
                            {Array.from({ length: 100 }).map((_, i) => (
                                <option key={i} value={i + 1970}>
                                    {i + 1970}
                                </option>
                            ))}
                        </select>
                        {state.viewYear}
                    </span>
                </span>
                <FontAwesomeIcon icon={faChevronRight} onClick={() => nextMonth()} />
            </div>
            <div className='grid'>
                {DAYS_ACC.map((day, i) => {
                    return <span key={day + i}>{day}</span>;
                })}
                {getListOfDaysWithBuffer(state.viewMonth, state.viewYear).map((day, i) => {
                    const classNames = ['day'];
                    if (!day) {
                        classNames.push('hidden');
                    }
                    if (
                        day === state.selectedDay.getDate() &&
                        state.selectedDay.getMonth() === state.viewMonth &&
                        state.selectedDay.getFullYear() === state.viewYear
                    ) {
                        classNames.push('selected');
                    }
                    return (
                        <div className={classNames.join(' ')} key={i} onClick={() => selectDay(day)}>
                            <span>{day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
