// import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const Footer = ()=> {
    return (
        <footer className="App-footer">
            <>
              <Link
                to="/"
                className="btn btn-primary mx-4"
                
              >
                Back
              </Link>
            </>
          <p>&copy; 2023 MathMate. All rights reserved.</p>
        </footer>


    )

}

export default Footer
