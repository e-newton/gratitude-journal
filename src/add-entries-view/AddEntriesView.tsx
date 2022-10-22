import { faChevronLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppViewState } from '../app-main/AppMain';
import EntryInput from '../entry-input/EntryInput';
import './AddEntriesView.scss';

type AddEntriesProps = {
    transition: (nextView: AppViewState) => void;
}

export type InterimEntry = {
    entry: string,
    id: string,
}

type AddEntriesViewState = {
    showEntries: boolean;
    entries: InterimEntry[];
    currentlySelectedEntryId?: string;
}

export default function AddEntriesView(props: AddEntriesProps) {
    const [state, setState] = useState<AddEntriesViewState>(() => {
        const id = uuidv4();
        return {
            entries: [
                {
                    id,
                    entry: ""
                }
            ],
            currentlySelectedEntryId: id,
            showEntries: false
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setState(s => ({...s, showEntries: true}));
        }, 1)
    }, [])

    const onGhostEntryFocus = (_: string) => {
        const id = uuidv4();
        setState({...state, entries: [...state.entries, { id, entry: ""}], currentlySelectedEntryId: id});
    }

    const onEntryFocus = (id: string) => {
        setState({...state, currentlySelectedEntryId: id});
    }

    const deleteEntry = (id: string) => {
        const index = state.entries.findIndex(entry => entry.id === id);
        const newFocusId = state.entries.at(index)?.id === id ? undefined : state.currentlySelectedEntryId;
        state.entries.splice(index, 1);
        setState({
            ...state,
            entries: state.entries,
            currentlySelectedEntryId: newFocusId
        })
    }

    const submit = () => {
        console.log(state.entries.filter(entry => !!entry.entry));
        props.transition(AppViewState.MainView);
    }

    return (
        <div className='view-container'>
            <button className='back-button secondary' onClick={() => props.transition(AppViewState.MainView)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <h1>What are you grateful for today?</h1>
            <div className='entries'>
                {
                    state.entries.map((entry, i) =>
                    <div className='entry-container' key={entry.id}>
                        <EntryInput entry={entry} id={entry.id} onFocus={onEntryFocus} selected={state.showEntries && entry.id === state.currentlySelectedEntryId}/>
                        {
                            i > 0 &&
                            <button onClick={() => deleteEntry(entry.id)}>
                                <FontAwesomeIcon icon={faX}/>
                            </button>
                        }
                    </div>
                    )
                }
                <EntryInput entry={{entry: '', id: 'ghost-id'}} id={'ghost-id'} onFocus={onGhostEntryFocus} selected={false}/>
            </div>
            <button className='submit-button' onClick={submit}>Submit</button>
        </div>
    )
}