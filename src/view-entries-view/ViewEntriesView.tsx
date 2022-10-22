import { AppViewState } from '../app-main/AppMain';
import './ViewEntriesView.scss';

type ViewEntriesViewProps = {
    transition: (nextView: AppViewState) => void;
}

export default function ViewEntriesView(props: ViewEntriesViewProps) {
    return (
        <h1>Holla Holla Make Dolla</h1>
    )
}