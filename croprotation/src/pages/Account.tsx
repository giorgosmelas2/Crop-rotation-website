import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import CropPlanTable from "../components/CropPlanTable";
import { Text } from "../components/Text";
import style from "../styling/account.module.css";

const Account = () => {
    const [username, setUsername] = useState("");

    // Fetch the user's username when the component mounts
    // This is used to display a personalized greeting on the account page
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user && user.user_metadata?.username) {
                setUsername(user.user_metadata.username);
            }
        };
        fetchUser();
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // Redirect to login page after logout
    }

    const [userPlans, setUserPlans] = useState([]);

    // Fetch the user's crop plans when the component mounts
    useEffect(() => {
        const fetchPlans = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const res = await fetch(`http://localhost:8000/api/user-crop-plans?user_id=${user.id}`);
                const { rotations } = await res.json();
                setUserPlans(rotations);
                setUsername(user.user_metadata?.username ?? "");
            }
        };
        fetchPlans();
    }, []);

    return (
        <section>
            <Text
                variant="main_title"
                color="green"
                as="h2">
                Καλώς ήρθες , {username}!
            </Text>
            <Text
                variant="main_text"
                color="green"
                as="p">
                Το ιστορικό των πλάνων σου
            </Text>
            <div className={style.container}>
                <CropPlanTable plans={userPlans} />
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