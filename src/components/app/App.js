import { BrowserRouter as Router } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import AnimatedRoutes from "../animatedRoutes/AnimatedRoutes";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <AnimatedRoutes/>
                </main>
            </div>
        </Router>
    )
}

export default App;