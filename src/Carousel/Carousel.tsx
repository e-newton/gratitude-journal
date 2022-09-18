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

    const mod = (n: number, m: number) => {
        return ((n % m) + m) % m;
      }

    const cantMove = () => {
        return props.entries.length <= 1;
    }

    const moveLeft = () => {
        if (cantMove()) {
            return;
        }
        setState({...state, index: mod(state.index - 1, props.entries.length)});
    }

    const moveRight = () => {
        if (cantMove()) {
            return;
        }
        setState({...state, index: mod(state.index + 1, props.entries.length)});
    }

    const getRightEntry = () => {
        return props.entries[mod(state.index + 1, props.entries.length)]
    }

    const getLeftEntry = () => {
        return props.entries[mod(state.index - 1, props.entries.length)]
    }

    const getCentreEntry = () => {
        return props.entries[state.index];
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
            <button onClick={moveLeft} disabled={cantMove()}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <div className='carousel-item-container' ref={carouselItemContainer}>
                <CarouselItem entry={getLeftEntry()} index={0} selectedIndex={1}/>
                <CarouselItem entry={getCentreEntry()} index={1} selectedIndex={1}/>
                <CarouselItem entry={getRightEntry()} index={2} selectedIndex={1}/>
            </div>
            <button onClick={moveRight} disabled={cantMove()}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>
        </div>
    )
}