"use client"
import { useUser } from "@stackframe/stack"
import React, { useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api";
import { UserContext } from "./_context/UserContext";


function AuthProvider({ children }) {

    const user = useUser();

    const CreateUser = useMutation(api.users.createUser);
    const {userData, setUserData} = React.useState();

    useEffect(() => {
        console.log("Current user:", user);
        user && CreateNewUser();
    }, [user]);

    const CreateNewUser = async() => {

        const result = await CreateUser({
            name : user?.displayName,
            email: user.primaryEmail,
        });
        console.log("User data from Convex:", result);
    
        setUserData(result);
    }

    return (
        <div>
            <UserContext.Provider value = {{ userData, setUserData }} >
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default AuthProvider