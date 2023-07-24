import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { MainPage, ComicsPage, SinglePage, SingleCharacterLayout, SingleComicLayout, Page404 } from "../pages";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/comics" element={<ComicsPage/>}/>
                <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>} />
                <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;