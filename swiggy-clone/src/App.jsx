
import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Restaurants from "./components/Restaurants";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Restaurants
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
        />

        <AppDownload />
      </main>

      <Footer />
    </>
  );
}

export default App;
