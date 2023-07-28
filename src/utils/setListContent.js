import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setListContent = (process) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return null
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}

export default setListContent;