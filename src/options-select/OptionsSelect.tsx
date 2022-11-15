import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './OptionsSelect.scss';

export default function OptionsSelect() {
    const [opened, setOpened] = useState(false);

    const getClassName = () => {
        return opened ? 'options-select opened' : 'options-select';
    };

    const onClick = () => {
        setOpened(!opened);
    };

    return (
        <div tabIndex={0} className={ getClassName() } onClick={onClick} onBlur={() => setOpened(false)}>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
            <div className='dropdown'>
                <div className='option'>
                    <span>
                            Edit
                    </span>
                </div>
                <div className='option'>
                    <span>
                            Delete
                    </span>
                </div>
            </div>
        </div>
    );
}