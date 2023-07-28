import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import setListContent from '../../utils/setListContent';
import useMarvelService from '../../services/MarvelService';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newComicsLoading, setNewComicsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    const lastElement = useRef()

    const {process, setProcess, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        // initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setNewComicsLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(ended)
    }

    useInfiniteScroll(lastElement, onRequest, process, comicsEnded)

    function renderArr(arr) {
        const items = arr.map((item, i) => {
            return (
                <motion.ul
                    key={i}
                    initial={{ opacity: 0, transformOrigin: '50% 0' }}
                    animate={{ opacity: 1, transformOrigin: '50% 0' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .5 }}>
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </motion.ul>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderArr(comicsList)

    return (
        <div className="comics__list">
            {items}
            {setListContent(process)}
            <button
                className="button button__main button__long"
                disabled={!newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner" ref={lastElement}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;