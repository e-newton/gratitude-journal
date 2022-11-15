import React from 'react';
import { Entry } from '../view-entries-view/ViewEntriesView';
import ViewEntry from '../view-entry/ViewEntry';
import './ViewEntriesList.scss';

type ViewEntriesListProps = {
    entries: Entry[];
}

export default function ViewEntriesList(props: ViewEntriesListProps) {
    return (
        <div className='entry-list'>
            {
                props.entries.map((entry, i) =>
                    <ViewEntry key={i} entry={entry}/>
                )
            }
        </div>
    );
}