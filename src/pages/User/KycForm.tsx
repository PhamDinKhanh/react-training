import type { KYCData, User } from '../../shared/types/index.ts';
import GeneralKYCSection from './GeneralKYC.tsx';
import GeneralSection from './GeneralSection.tsx';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addUser, deleteUser, updateUser } from "../../store/userSlice";

const KycForm = () => {
    const {
        register: registerUser,
        getValues: getUserValues,
        formState: { errors: userErrors },
    } = useForm<User>();

    const {
        register: registerKYCData,
        getValues: getKYCDataValues,
        formState: { errors: KYCDataErrors },
    } = useForm<KYCData>();

   const onSubmitAll = () => {
        const userData = getUserValues();
        const KYCData = getKYCDataValues();
        console.log(userData)
        console.log(KYCData)
    };

    return (
        <>
            <form onSubmit={onSubmitAll}>
                <GeneralSection register={registerUser} errors={userErrors} />

                <GeneralKYCSection register={registerKYCData} errors={KYCDataErrors} />
                <div className="col-span-6 sm:col-full">
                    <button
                        className="text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit">Submit
                    </button>
                </div>
            </form>
        </>
    );
}

export default KycForm;
