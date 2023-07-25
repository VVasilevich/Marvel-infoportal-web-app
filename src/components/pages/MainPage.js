import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <motion.div
                initial={{ scale: .8, opacity: 0, transformOrigin: '50% 0' }}
                animate={{ scale: 1, opacity: 1, transformOrigin: '50% 0' }}
                exit={{ scale: .8, opacity: 0 }}
                transition={{ duration: .5 }}>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <div className="char__sidepanel">
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearchForm/>
                        </ErrorBoundary>
                    </div>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </motion.div>
        </>
    )
}

export default MainPage;