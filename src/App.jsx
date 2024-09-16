import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Mandelbrot = lazy(() => import("./MandelBrotSet.jsx"));
const JuliaSet = lazy(() => import("./JuliaSet.jsx"));
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
            <Route path="/mandelbrotset" element={<Mandelbrot />} />
            <Route path="/juliaset" element={<JuliaSet />} />
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
