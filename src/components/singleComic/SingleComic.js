import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const content = !(!comic || loading || error) ? <View comic={comic}/> : null
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <>
            {content}
            {spinner}
            {errorMessage}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, language, price, thumbnail} = comic

    return (
        <motion.div
            initial={{ opacity: .7, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}>
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </motion.div>
    )
}

export default SingleComic;