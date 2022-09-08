import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import './Carousel.scss'

export type CarouselEntry = {
    entry: string;
    date: Date | number;
}

export type CarouselItemProps = {
    entry: CarouselEntry;
    index: number;
    selectedIndex: number;
}

export type CarouselState = {
    index: number;
}

export type CarouselProps = {
    entries: CarouselEntry[];
}

export function CarouselItem(props: CarouselItemProps) {
    const getIndexLeft = () => {
        return `-${props.selectedIndex * 100}%`;
    }
    const getClassName = () => {
        const classes = ['carousel-item'];
        if (props.index === props.selectedIndex) {
            classes.push('selected');
        }
        return classes.join(' ');
    }

    const getDate = () => {
        const date = typeof props.entry.date === 'number' ? new Date(props.entry.date) : props.entry.date;
        return date.toLocaleDateString();
    }
    return (
        <div className={getClassName()} style={{left: getIndexLeft()}}>
            <div className='inner-display'>
                <div className='date'>
                    {getDate()}
                </div>
                <div className='entry'>
                    {props.entry.entry}
                </div>
            </div>
        </div>
    )
}

export function Carousel(props: CarouselProps) {

    const [state, setState] = useState<CarouselState>({index: 0});
    const carouselItemContainer = useRef<HTMLDivElement>(null);

    const cantMoveLeft = () => {
        return state.index === 0;
    }

    const cantMoveRight = () => {
        if (!carouselItemContainer.current) return true;
        return state.index === carouselItemContainer.current.children.length - 1;
    }

    const moveLeft = () => {
        if (cantMoveLeft()) {
            return;
        }
        setState({...state, index: state.index - 1});
    }

    const moveRight = () => {
        if (cantMoveRight()) {
            return;
        }
        setState({...state, index: state.index + 1});
    }

    if (!props.entries.length) {
        return (
            <div className='carousel'>
                <div className='empty-entries'>
                    Nothing to show yet!
                </div>
            </div>
        )
    }
    return (
        <div className='carousel'>
            <button onClick={moveLeft} disabled={cantMoveLeft()}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <div className='carousel-item-container' ref={carouselItemContainer}>
                {props.entries.map((entry, i) => <CarouselItem
                key={i}
                entry={entry}
                index={i}
                selectedIndex={state.index}
                />)}
            </div>
            <button onClick={moveRight} disabled={cantMoveRight()}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>
        </div>
    )
}