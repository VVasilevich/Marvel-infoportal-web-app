import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {content}
            {spinner}
            {errorMessage}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, comics, homepage, wiki} = char;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <motion.div
                className="char__basics"
                initial={{ opacity: 0, transformOrigin: '50% 0' }}
                animate={{ opacity: 1, transformOrigin: '50% 0' }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}>
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </motion.div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <motion.ul
                className="char__comics-list"
                initial={{ opacity: 0, transformOrigin: '50% 0' }}
                animate={{ opacity: 1, transformOrigin: '50% 0' }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}>
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;

                        const comicId = item.resourceURI.split('/').pop();

                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comicId}`}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </motion.ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;