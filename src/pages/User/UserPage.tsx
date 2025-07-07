import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { fetchAccount } from "../../services/fetchAccount";

const UserPage = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        const redirectToUserPage = async () =>{
            if(user !== null || user !== undefined){
                if (user?.uid !== undefined) {
                    const userAccount = await fetchAccount(user?.uid)
                    if(userAccount !== null && userAccount !== undefined) {
                        navigate(`/pages/users/${userAccount.userId}/details`);
                    }
                }   
            }
        }
        redirectToUserPage()
    }, [user]);

    return <Outlet />;
};

export default UserPage;