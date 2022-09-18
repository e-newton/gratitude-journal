import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                <h1>Good morning $USER! I hope your day is going well.</h1>
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