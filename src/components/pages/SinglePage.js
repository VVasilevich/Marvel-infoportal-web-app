import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {loading, error, getCharacter, getComic, clearError} = useMarvelService()

    useEffect(() => {
        onRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onRequest = () => {
        clearError()

        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'character':
                getCharacter(id).then(onDataLoaded)
                break
            case 'comic':
                getComic(id).then(onDataLoaded)
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const content = !(loading || error || !data) ? <Component data={data}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <>
            <AppBanner/>
            {content}
            {spinner}
            {errorMessage}
        </>
    )
}

export default SinglePage;