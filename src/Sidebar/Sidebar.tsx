import { useState } from "react"

export type SidebarToggleProps = {
    onToggle: ( opened: boolean ) => void;
}

export type SidebarProps = {
    opened: boolean;
}

export function SidebarToggle(props: SidebarToggleProps) {
    const [state, setState] = useState(false);
    const onClick = () => {
        setState(!state);
        props.onToggle(state);
    }

    return (
        <button onClick={onClick}>{state ? 'Close' : 'Open'}</button>
    )
}

export function Sidebar(props: SidebarProps) {
    
    return props.opened ? <div>Sidebar</div> : <div></div>
}
