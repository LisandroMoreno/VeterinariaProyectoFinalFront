import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavbarC from "./components/NavbarC";
import FooterC from "./components/FooterC";
import "./App.css";

const App = () => {
  return (
    <>
      <NavbarC />
      <Router>
        <RoutesViews />
      </Router>
      <FooterC />
    </>
  );
};

export default App;
