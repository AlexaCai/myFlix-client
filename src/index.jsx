import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./index.scss";
// import "bootstrap/dist/css/bootstrap.min.css";


const MyFlixApplication = () => {
return (
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