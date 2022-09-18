import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel, CarouselEntry } from "../Carousel/Carousel";
import { Sidebar } from "../Sidebar/Sidebar";
import { WelcomeHeader } from "../welcome-header/WelcomeHeader";
import './AppMain.scss';


function AppMain() {
    console.log('App main rerender');

    const entries: CarouselEntry[] = [
        {
            date: Date.now(),
            entry: 'test entry lolololol'
        },
        {
            date: Date.now(),
            entry: 'test entry number 2'
        },
    ]
    return (
        <div>
            <Sidebar/>
            <div className="main-content">
                <WelcomeHeader/>
                <Carousel entries={entries}/>
                <div className="action-container">
                    <button>
                        <span>Add Entries</span>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </button>
                    <button className="secondary">
                        <span>View All Entries</span>
                        <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppMain;