import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Screen from './components/Screen/Screen';
import Quiz from './components/Quiz/Quiz';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Screen/>,
  },
  {
    path: "/quiz",
    element: <Quiz/>
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
