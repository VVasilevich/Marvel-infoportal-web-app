import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import setListContent from '../../utils/setListContent';
import useMarvelService from '../../services/MarvelService';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newListLoading, setNewListLoading] = useState(false)
    const [offset, setOffset] = useState (210)
    const [charEnded, setCharEnded] = useState(false)
    const lastElement = useRef()

    const {process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        setCharList(charList => [...charList, ...newCharList])
        setNewListLoading(newListLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    useInfiniteScroll(lastElement, onRequest, process, charEnded)

    const itemRefs = useRef([]);

    const onFocus = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
    }

    function renderArr(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <motion.li
                    className="char__item"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: (i % 9) * 0.25}}}
                    key={item.id}
                    tabIndex={0}
                    ref={elem => itemRefs.current[i] = elem}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        onFocus(i)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.onCharSelected(item.id)
                            onFocus(i)
                        }
                    }}>
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </motion.li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderArr(charList);

    return (
        <div className="char__list">
            {items}
            {setListContent(process)}
            <button
                className="button button__main button__long"
                disabled={!newListLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner" ref={lastElement}>load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;