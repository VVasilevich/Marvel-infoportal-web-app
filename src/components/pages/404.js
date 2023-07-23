import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Page404 = () => {
    return (
        <motion.div
            initial={{ scale: .8, opacity: 0, transformOrigin: '50% 0' }}
            animate={{ scale: 1, opacity: 1, transformOrigin: '50% 0' }}
            exit={{ scale: .8, opacity: 0 }}
            transition={{ duration: .5 }}>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '50px'}}>Page Not Found</p>
            <button className="button button__main" style={{'display': 'block', 'margin': '60px auto'}}>
                <Link to="/" className="inner">Back to main page</Link>
            </button>
        </motion.div>
    )
}

export default Page404;