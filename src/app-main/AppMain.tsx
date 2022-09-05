import { Carousel } from "../Carousel/Carousel";
import { Sidebar } from "../Sidebar/Sidebar";
import './AppMain.scss';


function AppMain() {
    console.log('App main rerender');
    return (
        <div>
            <Sidebar/>
            <div className="main-content">
                <Carousel/>
            </div>
        </div>
    )
}

export default AppMain;