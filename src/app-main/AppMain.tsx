import { Sidebar } from "../Sidebar/Sidebar";


function AppMain() {
    console.log('App main rerender');
    return (
        <div>
            <Sidebar/>
        </div>
    )
}

export default AppMain;