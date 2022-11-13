import React from 'react';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppViewState } from '../app-main/AppMain';
import { Carousel, CarouselEntry } from '../Carousel/Carousel';
import { WelcomeHeader } from '../welcome-header/WelcomeHeader';
import './MainView.scss';
export type MainViewProps = {
    entries: CarouselEntry[];
    transition: (nextView: AppViewState) => void;
}

export default function MainView(props: MainViewProps) {
    return (
        <>
            <WelcomeHeader/>
            <Carousel entries={props.entries}/>
            <div className="action-container">
                <button onClick={() => props.transition(AppViewState.AddingEntries)}>
                    <span>Add Entries</span>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
                <button className="secondary" onClick={() => props.transition(AppViewState.ViewingAllEntries)}>
                    <span>View All Entries</span>
                    <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                </button>
            </div>
        </>
    );
}