import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import animationStyles from '../../utils/animationStyles';

const Page404 = () => {
    return (
        <motion.div {...animationStyles}>
            <Helmet>
                <meta
                    name="description"
                    content="This page is not found"
                />
                <title>This page is not found</title>
            </Helmet>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '50px'}}>Page Not Found</p>
            <button className="button button__main" style={{'display': 'block', 'margin': '60px auto'}}>
                <Link to="/" className="inner">Back to main page</Link>
            </button>
        </motion.div>
    )
}

export default Page404;