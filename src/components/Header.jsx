// import React from "react";
import { useLocation } from "react-router-dom"

const Header = () => {
    const location = useLocation()

    return (
        <>
            {location.pathname === "/" &&
                <>
                    <header className="App-header">
                        <h1>Welcome to MathMate</h1>
                    </header>
                </>
            }
        </>
    )
}

export default Header
