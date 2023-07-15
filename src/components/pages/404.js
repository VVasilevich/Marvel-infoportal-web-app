import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '50px'}}>Page Not Found</p>
            <button className="button button__main" style={{'display': 'block', 'margin': '60px auto'}}>
                <Link to="/" className="inner">Back to main page</Link>
            </button>
        </div>
    )
}

export default Page404;