import React from 'react';
import { Entry } from '../view-entries-view/ViewEntriesView';
import './ViewEntry.scss';
import OptionsSelect from '../options-select/OptionsSelect';

export type ViewEntryProps = {
    entry: Entry;
}

export default function ViewEntry(props: ViewEntryProps) {
    return (
        <div className='entry'>
            <OptionsSelect/>
            <span>
                {props.entry.entry}
            </span>
        </div>
    );
}