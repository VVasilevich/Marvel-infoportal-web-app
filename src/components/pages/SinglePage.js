import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

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
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;