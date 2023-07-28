import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const {process, setProcess, getCharacter, clearError} = useMarvelService()

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
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, comics, homepage, wiki} = data;

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