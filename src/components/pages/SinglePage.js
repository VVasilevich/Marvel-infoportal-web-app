import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import animationStyles from '../../utils/animationStyles';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {process, setProcess, getCharacter, getComic, clearError} = useMarvelService()

    useEffect(() => {
        onRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onRequest = () => {
        clearError()

        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                    break
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    return (
        <motion.div
            {...animationStyles}>
            <AppBanner/>
            {setContent(process, Component, data)}
        </motion.div>
    )
}

export default SinglePage;