import React from "react";
import { Text } from "../components/Text";
import AnimatedDots from "../components/AnimatedDots"
import style from "../styling/about.module.css"
import nameImage from "../assets/name.png"
import educationImage from "../assets/education.png"
import aiImage from "../assets/ai.png"
import tractorImage from "../assets/tractor.png"

const About = () => {
    return (
        <>
            <section className={style.photo}>
                <Text
                    variant="main_title"
                    color="white"
                    as="h2">Μυαλό για data, καρδιά για το Έδαφος.</Text>
            </section>
            <section className={style.green_personal_info_background}>
                <div className={style.short_info_container}>
                    <div className={style.short_info_box}>
                        <img
                            src={nameImage}
                            className={style.info_image}
                            alt="name" />
                        <Text
                            variant="box_text"
                            color="white"
                            as="p">
                            Γιώργος-Σεραφείμ Μελάς
                        </Text>
                    </div>
                    <div className={style.short_info_box}>
                        <img
                            src={educationImage}
                            className={style.info_image}
                            alt="name" />
                        <Text
                            variant="box_text"
                            color="white"
                            as="p">
                            Μηχανίκων Πληροφορικής και Ηλεκτρονίκων Συστημάτων (ΔΙΠΑΕ)
                        </Text>
                    </div>
                    <div className={style.short_info_box}>
                        <img
                            src={aiImage}
                            className={style.info_image}
                            alt="name" />
                        <Text
                            variant="box_text"
                            color="white"
                            as="p">
                            Εστίαση στην Τεχνητή Νοημοσύνη
                        </Text>
                    </div>
                    <div className={style.short_info_box}>
                        <img
                            src={tractorImage}
                            className={style.info_image}
                            alt="name" />
                        <Text
                            variant="box_text"
                            color="white"
                            as="p">
                            Απο μια αγροτική οικογένεια
                        </Text>
                    </div>
                </div>
            </section>
            <section className={style.info_text}>
                <div className={style.extended_info_container}>
                    <Text
                        variant="secondary_title"
                        color="black"
                        as="h2">
                        Λίγα λόγια για εμένα 
                        <AnimatedDots />
                    </Text>
                    <div className={style.extended_info_box}>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            Είμαι ο Γιώργος-Σεραφείμ Μελάς και βρίσκομαι στο πέμπτο έτος των σπουδών 
                            μου στο Διεθνές Πανεπιστήμιο της Ελλάδος (ΔΙΠΑΕ), στο Τμήμα Μηχανικών 
                            Πληροφορικής και Ηλεκτρονικών Συστημάτων.
                        </Text>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            Η σχέση μου με την τεχνολογία ξεκίνησε νωρίς — πολύ νωρίς. Από τότε που 
                            θυμάμαι τον εαυτό μου, ήθελα να καταλαβαίνω πώς δουλεύουν τα πράγματα 
                            πίσω από την οθόνη. Με τα χρόνια, το ενδιαφέρον μου μεγάλωσε και κατέληξε… 
                            σε πάθος για την Τεχνητή Νοημοσύνη.

                            Αυτό που με κέρδισε στο AI είναι η δυνατότητά του να δίνει λύσεις σε 
                            αληθινά προβλήματα — και όχι μόνο θεωρητικά. Καθώς προέρχομαι από 
                            αγροτική οικογένεια, ήθελα να δω πώς μπορεί η τεχνολογία να "μιλήσει" 
                            με τη γη. Πώς μπορεί να σταθεί δίπλα στον αγρότη, να τον βοηθήσει να 
                            παράγει καλύτερα, εξυπνότερα και με περισσότερη φροντίδα για το περιβάλλον.
                        </Text>
                        <Text
                            variant="main_text"
                            color="black"
                            as="p">
                            Έτσι γεννήθηκε αυτό το project: μια προσπάθεια να συνδυάσω την τεχνολογία 
                            αιχμής με τις ανάγκες του χωραφιού. Έξυπνα συστήματα, φτιαγμένα για να 
                            είναι πρακτικά, αποδοτικά και ανθεκτικά απέναντι στις σύγχρονες 
                            προκλήσεις της γεωργίας.
                            Ο στόχος μου; Να δημιουργήσω λύσεις που να μην μένουν στα χαρτιά. 
                            Να προσφέρουν πραγματική αξία — και στον άνθρωπο και στον πλανήτη.
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;