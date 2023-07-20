import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newComicsLoading, setNewComicsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    const lastElement = useRef()

    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        // initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
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

    useInfiniteScroll(lastElement, onRequest, loading, comicsEnded)

    function renderArr(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    {/* eslint-disable-next-line */}
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderArr(comicsList)

    const spinner = loading && !newComicsLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner" ref={lastElement}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;