import { useState } from "react";
import { Sidebar, SidebarToggle } from "../Sidebar/Sidebar";

type AppState = {
    sidebarOpen: boolean;
}

function AppMain() {
    const [state, setState] = useState<AppState>({sidebarOpen: false})
    const onSidebarToggle = (sidebarOpen: boolean) => {
        setState({...state, sidebarOpen});
    }

    console.log('App main rerender');
    return (
        <div>
            <div>
                <Sidebar opened={state.sidebarOpen}/>
            </div>
            <div>
                <SidebarToggle onToggle={onSidebarToggle}/>
            </div>
        </div>
    )
}

export default AppMain;