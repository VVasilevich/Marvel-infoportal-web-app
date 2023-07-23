import { motion } from "framer-motion";

import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";

const SingleComicPage = () => {
    return (
        <motion.div
            initial={{ scale: .8, opacity: 0, transformOrigin: '50% 0' }}
            animate={{ scale: 1, opacity: 1, transformOrigin: '50% 0' }}
            exit={{ scale: .8, opacity: 0 }}
            transition={{ duration: .5 }}>
            <AppBanner/>
            <SingleComic/>
        </motion.div>
    )
}

export default SingleComicPage;