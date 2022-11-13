import React from 'react';
import { ChangeEvent, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InterimEntry } from '../add-entries-view/AddEntriesView';
import './EntryInput.scss';

export type EntryInputProps = {
    selected: boolean;
    id: string;
    entry: InterimEntry;
    onFocus: (id: string) => void;
};

type EntryInputState = {
    entry: string;
};

export default function EntryInput(props: EntryInputProps) {
    const [state, setState] = useState<EntryInputState>({ entry: '' });
    const nodeRef = useRef<HTMLTextAreaElement>(null);

    const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.entry.entry = event.target.value;
        setState({ ...state, entry: event.target.value });
    };

    const className = () => {
        return state.entry && 'has-content';
    };

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={props.selected}
            classNames='selected'
            addEndListener={() => undefined}
            appear={true}
        >
            <textarea
                className={className()}
                autoFocus={props.selected}
                ref={nodeRef}
                rows={4}
                onChange={onInputChange}
                onFocus={() => props.onFocus(props.id)}
            ></textarea>
        </CSSTransition>
    );
}
