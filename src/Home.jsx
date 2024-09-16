import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    }}>
      <header
        style={{
          textAlign: "center",
          fontSize: "4.5rem",
          marginTop: "2rem",
        }}
      >
        Mathematical Fractals
      </header>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          marginTop: "1rem",
          width: "60vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Explore the fascinating world of mathematical fractals, where simplicity
        meets infinite complexity. Discover the hidden beauty in patterns that
        emerge from mathematical equations.
      </p>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          listStyleType: "none",
          width: "70vw",
          height: "7vh",
          fontSize: "1.5rem",
          marginTop: "3rem",
        }}
      >
        <li>
          <Link to="/mandelbrot">Mandelbrot</Link>
        </li>
        <li>
          <Link to="/ccurvefractal">CCurve</Link>
        </li>
        <li>
          <Link to="/dragoncurvefractal">Dragon Curve</Link>
        </li>
        <li>
          <Link to="/pythogorastree">Pythagoras Tree</Link>
        </li>
        <li>
          <Link to="/sierpinskitriangle">Sierpinski Triangle</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
