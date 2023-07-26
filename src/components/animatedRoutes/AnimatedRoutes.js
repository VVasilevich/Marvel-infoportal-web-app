import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const Page404 = lazy(() => import('../pages/404'));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<Spinner/>}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsPage/>}/>
                    <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>} />
                    <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </AnimatePresence>
        </Suspense>
    )
}

export default AnimatedRoutes;