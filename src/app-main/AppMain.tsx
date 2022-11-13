import React from 'react';
import { TransitionEvent, useState } from 'react';
import AddEntriesView from '../add-entries-view/AddEntriesView';
import { CarouselEntry } from '../Carousel/Carousel';
import MainView from '../main-view/MainView';
import { Sidebar } from '../Sidebar/Sidebar';
import ViewEntriesView from '../view-entries-view/ViewEntriesView';
import './AppMain.scss';

export enum AppViewState {
    MainView,
    AddingEntries,
    ViewingAllEntries
}

type AppState = {
    view: AppViewState,
    nextView?: AppViewState,
    transitioning: boolean;
}


function AppMain() {
    console.log('App main rerender');

    const [state, setState] = useState<AppState>({view: AppViewState.MainView, transitioning: false});

    const entries: CarouselEntry[] = [
        {
            date: Date.now(),
            entry: 'test entry lolololol'
        },
        {
            date: Date.now(),
            entry: 'test entry number 2'
        },
    ];

    const getClassName = () => {
        const classes = ['main-content'];
        if (state.transitioning) {
            classes.push('hidden');
        }
        return classes.join(' ');
    };

    const changeView = (event: TransitionEvent<HTMLDivElement>) => {
        if (event.nativeEvent.propertyName === 'top' && state.transitioning) {
            if (state.nextView === undefined) {
                throw Error('No next view was provided');
            }
            setState({...state, view: state.nextView, nextView: undefined, transitioning: false});
        }
    };

    const startTransition = (nextView: AppViewState) => {
        console.log(nextView);
        setState({...state, nextView, transitioning: true});
    };

    return (
        <div>
            <Sidebar/>
            <div className={getClassName()} onTransitionEnd={changeView}>
                {state.view === AppViewState.MainView && <MainView entries={entries} transition={startTransition}/>}
                {state.view === AppViewState.AddingEntries && <AddEntriesView transition={startTransition}/>}
                {state.view === AppViewState.ViewingAllEntries && <ViewEntriesView transition={startTransition}/>}
            </div>
        </div>
    );
}

export default AppMain;