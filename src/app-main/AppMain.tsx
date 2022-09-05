import { useState } from "react";
import { Sidebar, SidebarToggle } from "../Sidebar/Sidebar";

type AppState = {
    sidebarOpen: boolean;
}

function AppMain() {
    console.log('App main rerender');
    return (
        <div>
            <Sidebar/>
        </div>
    )
}

export default AppMain;