import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
