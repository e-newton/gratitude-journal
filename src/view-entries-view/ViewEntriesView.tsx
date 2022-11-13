import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppViewState } from '../app-main/AppMain';
import { useState } from 'react';
import './ViewEntriesView.scss';

type ViewEntriesViewProps = {
    transition: (nextView: AppViewState) => void;
}

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
    'December'
];

const DAYS: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const DAYS_ACC: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thr',
    'Fri',
    'Sat'
];

 type CalendarState = {
    selectedDay: Date;
    viewMonth: number;
    viewYear: number;
 }

export default function ViewEntriesView(props: ViewEntriesViewProps) {

    const [state, setState] = useState<CalendarState>(() => {
        const today = new Date();
        return {
            selectedDay: today,
            viewMonth: today.getMonth(),
            viewYear: today.getFullYear()
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
        return Array.from({length: numDays}).map((_, i) => i + 1);
    };

    const getListOfDaysWithBuffer = (month: number, year: number) => {
        let days = getListOfDays(month, year);
        const firstDay = getDayOfWeek(days[0], month, year);
        if (firstDay !== 'Sunday') {
            const dayIndex = new Date(year, month, days[0]).getDay();
            days = [...Array.from({length: dayIndex}).map(() => 0), ...days];
        }
        return days;
    };

    const nextMonth = () => {
        if (state.viewMonth === 11) {
            setState({...state, viewMonth: 0, viewYear: state.viewYear + 1});
        } else {
            setState({...state, viewMonth: state.viewMonth + 1});
        }
    };

    const previousMonth = () => {
        if (state.viewMonth === 0) {
            setState({...state, viewMonth: 11, viewYear: state.viewYear - 1});
        } else {
            setState({...state, viewMonth: state.viewMonth - 1});
        }

    };

    const selectMonth = (month: string) => {
        setState({...state, viewMonth: MONTHS.indexOf(month)});
    };

    const selectYear = (year: string) => {
        setState({...state, viewYear: parseInt(year)});
    };

    const selectDay = (day: number) => {
        setState({...state, selectedDay: new Date(state.viewYear, state.viewMonth, day)});
    };

    return (
        <div className='view-container'>
            <button className='back-button secondary' onClick={() => props.transition(AppViewState.MainView)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <div className='calendar'>
                <div className='month-year'>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => previousMonth()}/>
                    <span>
                        <select value={MONTHS[state.viewMonth]} onChange={e => selectMonth(e.target.value)}>
                            { MONTHS.map(month => <option key={month} value={month}>{month}</option>)}
                        </select>
                        <select value={state.viewYear} onChange={e => selectYear(e.target.value)}>
                            { Array.from({length: 100}).map((_, i) => <option key={i} value={i + 1970}>{i + 1970}</option>)}
                        </select>
                        {/* {`${MONTHS[state.viewMonth]} ${state.viewYear}`} */}
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => nextMonth()}/>
                </div>
                <div className='grid'>
                    {
                        DAYS_ACC.map((day, i) => {
                            return <span key={day + i}>{day}</span>;
                        })
                    }
                    {
                        getListOfDaysWithBuffer(state.viewMonth, state.viewYear).map((day, i) => {
                            const classNames = ['day'];
                            if (!day) {
                                classNames.push('hidden');
                            }
                            if (day === state.selectedDay.getDate() &&
                                state.selectedDay.getMonth() === state.viewMonth &&
                                state.selectedDay.getFullYear() === state.viewYear) {
                                classNames.push('selected');
                            }
                            return <div className={classNames.join(' ')} key={i} onClick={() => selectDay(day)}>
                                <span>
                                    {day}
                                </span>
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>
    );
}