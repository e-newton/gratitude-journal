import React from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppViewState } from '../app-main/AppMain';
import './ViewEntriesView.scss';
import Calendar from '../calendar/Calendar';

type ViewEntriesViewProps = {
    transition: (nextView: AppViewState) => void;
}
export default function ViewEntriesView(props: ViewEntriesViewProps) {

    return (
        <div className='view-container'>
            <button className='back-button secondary' onClick={() => props.transition(AppViewState.MainView)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <Calendar onSelectChange={s => console.log(s)} />
        </div>
    );
}