import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import animationStyles from '../../utils/animationStyles';

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
            <motion.div {...animationStyles}>
                <AppBanner/>
                <ComicsList/>
            </motion.div>
        </>
    )
}

export default ComicsPage;