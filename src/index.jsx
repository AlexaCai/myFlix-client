import { createRoot } from 'react-dom/client';

// Import statement to indicate that I need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of my app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render my app in the root DOM element
root.render(<MyFlixApplication />);