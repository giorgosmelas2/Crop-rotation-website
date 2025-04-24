import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Text } from "../components/Text";
import style from "../styling/account.module.css";

const Account = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user && user.user_metadata?.username) {
                setUsername(user.user_metadata.username);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // Redirect to login page after logout
    }

    return (
        <section>
            <Text
                variant="main_title"
                color="green"
                as="h2">
                Wellcome , {username}!
            </Text>
            <Text
                variant="main_text"
                color="green"
                as="p">
                Here is your rotation history
            </Text>
            <div className={style.container}>
                <div className={style.rotation_history}>

                </div>
            </div>
            <button
                className={style.logout_button}
                onClick={handleLogout}>
                <Text
                    variant="button_text"
                    color="white"
                    as="span">
                    Log out
                </Text>
            </button>

        </section>
    );
}

export default Account;