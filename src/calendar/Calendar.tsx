import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Calendar.scss';

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

export type CalendarSelection = CalendarView & {
    day: number;
};

export type CalendarView = {
    month: number;
    year: number;
};

export type CalendarProps = {
    onViewChange?: (view: CalendarView) => void;
    onSelectChange?: (selection: CalendarSelection) => void;
    initialSelectedDay?: CalendarSelection;
    initialView?: CalendarView;
};

type CalendarState = {
    selectedDay: Date;
    viewMonth: number;
    viewYear: number;
};

export default function Calendar(props: CalendarProps) {
    const [state, setState] = useState<CalendarState>(() => {
        const selectedDay = props.initialSelectedDay
            ? new Date(props.initialSelectedDay.year, props.initialSelectedDay.month, props.initialSelectedDay.day)
            : new Date();
        return {
            selectedDay: selectedDay,
            viewMonth: props.initialView?.month ?? selectedDay.getMonth(),
            viewYear: props.initialView?.year ?? selectedDay.getFullYear(),
        };
    });

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

    const setViewState = (newState: CalendarState) => {
        setState(newState);
        props.onViewChange?.({ month: newState.viewMonth, year: newState.viewYear });
    };

    const nextMonth = () => {
        let newState: CalendarState;
        if (state.viewMonth === 1) {
            newState = { ...state, viewMonth: 0, viewYear: state.viewYear + 1 };
        } else {
            newState = { ...state, viewMonth: state.viewMonth + 1 };
        }
        setViewState(newState);
    };

    const previousMonth = () => {
        let newState: CalendarState;
        if (state.viewMonth === 0) {
            newState = { ...state, viewMonth: 11, viewYear: state.viewYear - 1 };
        } else {
            newState = { ...state, viewMonth: state.viewMonth - 1 };
        }
        setViewState(newState);
    };

    const selectMonth = (month: string) => {
        const newState = { ...state, viewMonth: MONTHS.indexOf(month) };
        setViewState(newState);
    };

    const selectYear = (year: string) => {
        const newState = { ...state, viewYear: parseInt(year) };
        setViewState(newState);
    };

    const selectDay = (day: number) => {
        const newState = { ...state, selectedDay: new Date(state.viewYear, state.viewMonth, day) };
        setState(newState);
        props.onSelectChange?.({
            day: newState.selectedDay.getDate(),
            month: newState.viewMonth,
            year: newState.viewYear,
        });
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
