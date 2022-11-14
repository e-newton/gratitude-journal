import React, { useState } from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppViewState } from '../app-main/AppMain';
import './ViewEntriesView.scss';
import Calendar, { CalendarSelection } from '../calendar/Calendar';
import { v4 as uuidv4 } from 'uuid';

type Entry = {
    entry: string;
    id: string;
    date: number | Date;
}

type ViewEntriesViewState = {
    currentEntries: Entry[];
}

type ViewEntriesViewProps = {
    transition: (nextView: AppViewState) => void;
}

const generateEntry = ():Entry => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789                  ';
    return {
        id: uuidv4(),
        entry: Array.from({length: Math.floor(Math.random() * 300)}).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join(''),
        date: new Date()
    };
};

const generateEntries = (): Entry[] => {
    return Array.from({length: Math.floor(Math.random() * 10)}).map(() => generateEntry());
};

export default function ViewEntriesView(props: ViewEntriesViewProps) {

    const [state, setState] = useState<ViewEntriesViewState>({
        currentEntries: generateEntries()
    });

    const onSelectChange = (selection: CalendarSelection) => {
        setState({currentEntries: generateEntries()});
    };

    return (
        <div className='view-container'>
            <button className='back-button secondary' onClick={() => props.transition(AppViewState.MainView)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <Calendar onSelectChange={onSelectChange} />
            <div>
                {
                    state.currentEntries.map((entry, i)=> <p key={i}>{entry.entry}</p>)
                }
            </div>
        </div>
    );
}