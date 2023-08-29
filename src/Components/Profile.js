import React, {useEffect, useState, useRef} from 'react';
// import fs from 'fs';
import { getUser, currentBalance , addBalanceStripe, updateBalance} from '../util/firebase';


function Profile() {

    const balance = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            balance.current = await currentBalance(localStorage.getItem("username"));
        }
        getData();
        setIsLoading(false);
    }, []);

    async function addBal() {
        window.open("https://buy.stripe.com/test_4gwbLR7zQewR2KAfYY");
        await updateBalance(localStorage.getItem("username"), balance.current + 1000);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
          <h1 class="title">Name: {localStorage.getItem("username")}</h1>
            <h1 class="title">Balance: {balance.current/100}</h1>
            <div class = "row">
                <button class = "submit" onClick = {addBal} >Add balance</button>
            </div>
        </div>
    );
}
  
export default Profile;

