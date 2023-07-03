import { createRoot } from 'react-dom/client';

//***Import the MainView component. Note: MainView must be enclosed in curly braces because it was exported using the ''named export'' method in the main-view.jsx file.
import { MainView } from './components/main-view/main-view';

//***Import to indicate that ./index.scss needs to be bundle.
import "./index.scss";

//***''const MyFlixApplication'' is the main component (will eventually use all the others).
const MyFlixApplication = () => {
//***''return <MainView />'' uses the component MainView imported upper in this file.
 return <MainView />;
};

//***Finds the root of the app.
const container = document.querySelector("#root");
const root = createRoot(container);

//***Tells React to render the app in the root DOM element.
root.render(<MyFlixApplication />);