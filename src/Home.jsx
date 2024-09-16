import { Link } from "react-router-dom"

const Home = () => {
    return(
        <>
            <ul>
                <li><Link to="/mandelbrot">Mandelbrot</Link></li>
                <li><Link to="/ccurvefractal">CCurve</Link></li>
                <li><Link to="/dragoncurvefractal">Dragon Curve</Link></li>
                <li><Link to="/pythogorastree">Pythagoras Tree</Link></li>
                <li><Link to="/sierpinskitriangle">Sierpinski Triangle</Link></li>
            </ul>
        </>
    )
}

export default Home;