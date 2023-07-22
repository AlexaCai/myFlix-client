import { createRoot } from 'react-dom/client';

//***Import the MainView component. Note: MainView must be enclosed in curly braces because it was exported using the ''named export'' method in the main-view.jsx file.
import { MainView } from './components/main-view/main-view';

//***Import the Container Bootstrap component for Bootstrap grid UI design.
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//***Import the bootstrap CSS file (needs to be imported before the line import "./index.scss";). This link provides the default Bootstrap styles and allows to use Bootstrap's predefined classes and components without any customization (to be removed later when want to customize Bootstrap's default styles - necessary to removed this link and import bootstrap/scss/bootstrap.scss into index.scss to allow customization instead).
// import "bootstrap/dist/css/bootstrap.min.css";

//***Import to indicate that ./index.scss needs to be bundle.
import "./index.scss";

//***''const MyFlixApplication'' is the main component (will eventually use all the others).
const MyFlixApplication = () => {
//***''return <MainView />'' uses the component MainView imported upper in this file.
return (
    //***<Container> is a Bootstrap component. It is added here and it wraps up <MainView /> to allow the MainView component having a responsive grid with other Bootstrap features such as Col and Row. It is necessary to wrap the whole app within a <Container></Container> to used other Bootstrap grid features. Also important to import the ''Container'' Bootstrap component into the current file at the top of the file (which is done above).
    <Container fluid className='styling'>
      <Row>
        <Col>
        <MainView />
        </Col>
      </Row>
    </Container>
  );
}
//***Finds the root of the app.
const container = document.querySelector("#root");
const root = createRoot(container);

//***Tells React to render the app in the root DOM element.
root.render(<MyFlixApplication />);