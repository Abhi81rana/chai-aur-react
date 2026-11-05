import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <h1 className="mt-20 text-center text-3xl text-lime">
      404 - Page Not Found
    </h1>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;