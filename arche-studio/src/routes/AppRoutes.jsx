import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Designs from "../pages/Designs";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DesignDetails from "../pages/DesignDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/designs" element={<Designs />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/designs/:id" element={<DesignDetails />} />
    </Routes>
  );
}

export default AppRoutes;