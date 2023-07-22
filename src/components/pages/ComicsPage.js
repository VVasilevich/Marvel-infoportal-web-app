import { motion } from "framer-motion";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <motion.div
                initial={{ scale: .8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: .5 }}>
                <AppBanner/>
                <ComicsList/>
            </motion.div>
        </>
    )
}

export default ComicsPage;