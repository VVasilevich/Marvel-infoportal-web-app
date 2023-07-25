import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                    />
                <title>Comics page</title>
            </Helmet>
            <motion.div
                initial={{ scale: .8, opacity: 0, transformOrigin: '50% 0' }}
                animate={{ scale: 1, opacity: 1, transformOrigin: '50% 0' }}
                exit={{ scale: .8, opacity: 0 }}
                transition={{ duration: .5 }}>
                <AppBanner/>
                <ComicsList/>
            </motion.div>
        </>
    )
}

export default ComicsPage;