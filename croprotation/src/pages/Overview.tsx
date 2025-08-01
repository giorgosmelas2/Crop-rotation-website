import React from "react";
import { Text } from "../components/Text";
import style from "../styling/overview.module.css"
import arrowsImage from "../assets/cycle.png"


const Overview = () => {
    return (
        <>
            <section className={style.title}>
                <Text
                    variant="main_title"
                    color="white"
                    as="h2">
                    Εναλλαγές, Αλγόριθμοι και λίγη Φύση… για το μυστικό μείγμα επιτυχίας!
                </Text>
            </section>
            <section className={style.content_area}>
                <div className={style.green_background}>
                    <div className={style.calligraphic}>
                    <Text variant="calligraphic_title"
                        color="white"
                        as="h3">
                            Τι είναι η αμειψισπορά;
                        </Text>
                    </div>
                    
                    <div className={style.text_box}>
                        <Text variant="main_text"
                            color="white"
                            as="p">
                            Η αμειψισπορά — η εναλλαγή διαφορετικών καλλιεργειών 
                            στο ίδιο χωράφι με την πάροδο του χρόνου — είναι μια 
                            από τις πιο σημαντικές και παλιές γεωργικές πρακτικές. 
                            Διατηρεί τη γονιμότητα του εδάφους, περιορίζει την εξάπλωση 
                            ασθενειών και παρασίτων και στηρίζει τη βιώσιμη παραγωγή. 
                            Όμως, το να σχεδιάσει κανείς μια στρατηγική αμειψισποράς που να 
                            είναι και οικολογικά ισορροπημένη και οικονομικά αποδοτική, δεν 
                            είναι εύκολη υπόθεση.

                            Εδώ έρχεται η Τεχνητή Ζωή να αναλάβει δράση. Μέσα από τεχνικές 
                            όπως οι εξελικτικοί αλγόριθμοι, η μοντελοποίηση με πράκτορες 
                            και τα κυψελοειδή αυτόματα, το έργο αυτό δείχνει πώς η υπολογιστική 
                            εξυπνάδα μπορεί να γίνει το νέο εργαλείο του αγρότη. Συνδέοντας την 
                            τεχνολογία με τις πραγματικές ανάγκες του χωραφιού, ανοίγουμε τον δρόμο 
                            για μια γεωργία πιο έξυπνη, πιο βιώσιμη και — γιατί όχι — πιο 
                            αποτελεσματική από ποτέ.
                        </Text>
                    </div>
                </div>
                <div className={style.pink_icon_container}>
                    <div className={style.pink}>
                        <Text variant="main_text"
                            color="black"
                            as="p">
                            Μέσα από την ανάπτυξη ενός πλαισίου προσομοίωσης, το έργο 
                            μοντελοποιεί βασικούς περιβαλλοντικούς και βιολογικούς παράγοντες, 
                            όπως η δυναμική των θρεπτικών συστατικών του Εδάφους, οι κύκλοι 
                            ανάπτυξης των καλλιεργειών, οι καιρικές συνθήκες και οι πληθυσμοί 
                            επιβλαβών οργανισμών. Χρησιμοποιώντας μοντέλα βασισμένα σε πράκτορες 
                            (agent-based models), το σύστημα προσομοιώνει τις αλληλεπιδράσεις 
                            μεταξύ καλλιεργειών, εδάφους και παρασίτων, ενώ τα κυψελοειδή αυτόματα 
                            (cellular automata) χρησιμοποιούνται για να αναπαραστήσουν τη χωρική 
                            κατανομή και τη δομή του εδάφους.
                        </Text>
                    </div>
                    <img src={arrowsImage} alt="recycle" className={style.icon} />
                    <div className={style.pink}>
                        <Text variant="main_text"
                            color="black"
                            as="p">
                            Με την προσομοίωση διαφορετικών σεναρίων αμειψισποράς υπό ποικίλες 
                            συνθήκες, το σύστημα επιτρέπει τη διερεύνηση των μακροπρόθεσμων 
                            επιπτώσεων χωρίς την ανάγκη δοκιμών σε πραγματικά αγροτεμάχια. 
                            Αυτό καθιστά δυνατή την ασφαλέστερη πειραματική προσέγγιση, 
                            υποστηρίζει τον ευέλικτο σχεδιασμό και επιταχύνει την ανάπτυξη πιο 
                            νθεκτικών γεωργικών στρατηγικών.
                        </Text>
                    </div>
                </div>
                <div className={style.green_background}>
                    <div className={style.text_box}>
                        <Text variant="main_text"
                            color="white"
                            as="p">
                            Προηγμένοι αλγόριθμοι βελτιστοποίησης, όπως οι γενετικοί αλγόριθμοι 
                            και η βελτιστοποίηση σμήνους σωματιδίων (particle swarm optimization), 
                            χρησιμοποιούνται για να εξελίξουν ακολουθίες αμειψισποράς που 
                            μεγιστοποιούν την παραγωγικότητα, καταστέλλουν τα παράσιτα και 
                            διατηρούν τη μακροπρόθεσμη υγεία του Εδάφους.

                            Το αποτέλεσμα είναι ένα προσαρμόσιμο και επαναχρησιμοποιήσιμο εργαλείο 
                            υποστήριξης αποφάσεων, το οποίο παρέχει βελτιστοποιημένα πλάνα 
                            αμειψισποράς προσαρμοσμένα σε συγκεκριμένες περιβαλλοντικές συνθήκες. 
                            Το έργο αυτό προσφέρει πολύτιμες γνώσεις και πρακτικές προτάσεις για 
                            αγρότες, ερευνητές και υπεύθυνους χάραξης πολιτικής που επιδιώκουν να 
                            προωθήσουν τη βιώσιμη γεωργία μέσα από λύσεις βασισμένες σε δεδομένα.

                        </Text>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Overview;