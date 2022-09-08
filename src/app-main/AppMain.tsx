import { Carousel, CarouselEntry } from "../Carousel/Carousel";
import { Sidebar } from "../Sidebar/Sidebar";
import './AppMain.scss';


function AppMain() {
    console.log('App main rerender');

    const entries: CarouselEntry[] = [
        {
            date: Date.now(),
            entry: 'test entry lolololol'
        }
    ]
    return (
        <div>
            <Sidebar/>
            <div className="main-content">
                <Carousel entries={entries}/>
            </div>
        </div>
    )
}

export default AppMain;