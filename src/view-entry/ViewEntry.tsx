import React from 'react';
import { Entry } from '../view-entries-view/ViewEntriesView';
import './ViewEntry.scss';

export type ViewEntryProps = {
    entry: Entry;
}

export default function ViewEntry(props: ViewEntryProps) {
    return (
        <div className='entry'>
            <span>
                {props.entry.entry}
            </span>
        </div>
    );
}