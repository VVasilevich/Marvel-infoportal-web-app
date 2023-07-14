import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{'display': 'flex', 'justify-content': 'center', 'flex-direction': 'column'}}>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '50px'}}>Page Not Found</p>
            <button className="button button__main" style={{'margin': '60px auto'}}>
                <Link to="/" className="inner">Back to main page</Link>
            </button>
        </div>
    )
}

export default Page404;