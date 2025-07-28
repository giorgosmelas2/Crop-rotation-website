import React from "react"
import { motion } from "framer-motion";
import style from "../styling/home.module.css"
import soilImage from "../assets/soil.png";
import climateImage from "../assets/climate.png"
import { Text } from "../components/Text";

const Home = () => {
    return (
        <>
            <motion.section
                className={style.photo}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}>
                <motion.div
                    className={style.photo_motion}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>
                    <div className={style.vertical_container}>
                        <Text
                            variant="main_title"
                            color="green"
                            as="h2">
                            Καλώς ήρθες στον AI-Powered Σύμβουλο Αμειψισποράς!
                        </Text>
                        <div className={style.green_line}></div>
                        <Text
                            variant="calligraphic_title"
                            color="white"
                            as="h3">
                            Άφησε τη φύση και το AI να σχεδιάσουν τη σοδειά του αύριο.
                        </Text>
                    </div>
                </motion.div>
            </motion.section>
            <section className={style.info}>
                <div className={style.vertical_container}>
                    <div className={style.info_text_block}>
                    <Text
                        variant="main_text"
                        color="black"
                        as="p">
                        Αυτό το σύστημα προτάσεων εναλλαγής καλλιεργειών, 
                        βασισμένο στην τεχνητή νοημοσύνη, έχει σχεδιαστεί για να βοηθά τους αγρότες
                        να στήνουν στρατηγικά το πλάνο αμειψισποράς τους. Ο στόχος; 
                        Πιο υγιές έδαφος, καλύτερες αποδόσεις και φυσικά, 
                        μεγαλύτερα κέρδη.

                        Το έξυπνο μοντέλο μας αναλύει τα θρεπτικά στοιχεία του εδάφους, 
                        τις τοπικές κλιματικές συνθήκες και τις τιμές της αγοράς, 
                        για να σου προτείνει την ιδανική ακολουθία καλλιεργειών. 
                        Έτσι, η γεωργία γίνεται πιο αποδοτική, πιο βιώσιμη και... 
                        λίγο πιο έξυπνη από το συνηθισμένο.
                    </Text>
                    </div>
                    
                    <div className={style.horizontally_container}>
                        <div className={style.green_box}>
                            <Text
                                variant="box_title"
                                color="white"
                                as="h4">
                                Έδαφος
                            </Text>
                            <img src={soilImage}
                                className={style.box_image}
                                alt="soilImg" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                Κράτα το έδαφος σου ζωντανό και δυνατό — 
                                με εναλλαγές καλλιεργειών που ξέρουν τι κάνουν!
                            </Text>
                        </div>
                        <div className={style.green_box}>
                            <Text
                                variant="box_title"
                                color="white"
                                as="h4">
                                Κλίμα
                            </Text>
                            <img
                                src={climateImage}
                                className={style.box_image}
                                alt="soilImg" />
                            <Text
                                variant="box_text"
                                color="white"
                                as="p">
                                Ο καιρός αλλάζει — εσύ προσαρμόζεσαι έξυπνα. 
                                Καλλιέργησε ότι ζητάει η αγορά και δες το ταμείο να χαμογελά!
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;