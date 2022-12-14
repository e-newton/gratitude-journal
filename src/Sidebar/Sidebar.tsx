import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Sidebar.scss';

export type SidebarToggleProps = {
    onToggle: (opened: boolean) => void;
    opened: boolean;
};

export type SidebarState = {
    opened: boolean;
};

export function SidebarToggle(props: SidebarToggleProps) {
    const onClick = () => {
        props.onToggle(!props.opened);
    };

    return (
        <button className='toggle' onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    );
}

export function Sidebar() {
    const [state, setState] = useState<SidebarState>({ opened: false });

    const onSidebarToggle = (sidebarToggle: boolean) => {
        setState({ ...state, opened: sidebarToggle });
    };

    const getClassName = () => {
        const classes = ['sidebar'];
        state.opened && classes.push('opened');
        return classes.join(' ');
    };

    return (
        <div className='sticky-anchor'>
            <div className={getClassName()}>
                {state.opened ? 'opened' : 'closed'}
                <SidebarToggle onToggle={onSidebarToggle} opened={state.opened} />
            </div>
        </div>
    );
}
