import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [newListLoading, setNewListLoading] = useState(false)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState (210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)

    }

    const onCharListLoading = () => {
        setNewListLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        setCharList(charList => [...charList, ...newCharList])
        setLoading(loading => false)
        setNewListLoading(newListLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        setError(true)
        setLoading(loading => false)
    }

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
                <li className="char__item"
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
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderArr(charList);

    const content = !(loading || error) ? items : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {content}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                disabled={newListLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;