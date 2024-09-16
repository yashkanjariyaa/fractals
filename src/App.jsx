import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Mandelbrot = lazy(() => import("./MandelBrotSet.jsx"));
const PythagorasTree = lazy(() => import("./PythogorasTree.jsx"));
const CCurveFractal = lazy(() => import("./CCurve.jsx"));
const DragonCurve = lazy(() => import("./DragonCurveFractal.jsx"));
const SierpinskiTriangle = lazy(() => import("./SierpinskiTriangle.jsx"));
const Home = lazy(() => import("./Home.jsx"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mandelbrot" element={<Mandelbrot />} />
            <Route path="/pythogorastree" element={<PythagorasTree />} />
            <Route path="/ccurvefractal" element={<CCurveFractal />} />
            <Route path="/dragoncurvefractal" element={<DragonCurve />} />
            <Route
              path="/sierpinskitriangle"
              element={<SierpinskiTriangle />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
