import type { KYCData, User } from "../../shared/types/index.ts";
import GeneralKYCSection from "./GeneralKYC.tsx";
import GeneralSection from "./GeneralSection.tsx";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addUser, deleteUser, updateUser } from "../../store/userSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const KycForm = () => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      resetUser(user);
    }
  }, [user]);

  const {
    register: registerUser,
    getValues: getUserValues,
    reset: resetUser,
    formState: { errors: userErrors },
  } = useForm<User>();

  const {
    register: registerKYCData,
    getValues: getKYCDataValues,
    reset: resetKYCData,
    formState: { errors: KYCDataErrors },
  } = useForm<KYCData>();

  const onSubmitAll = () => {
    onSubmitUser();
    onSubmitKYCData();
  };

  const onSubmitUser = () => {
    const userData = getUserValues();
    try {
      if (user != null) {
        dispatch(updateUser(userData));
      } else {
        dispatch(addUser(userData));
      }
      alert("User added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add user.");
    }
  };


  const onSubmitKYCData = () => {
    const KYCData = getKYCDataValues();
    console.log(KYCData);
    //shoule be implement slice KYC and create document KYC on firebase
  };


  return (
    <>
      <form onSubmit={onSubmitAll}>
        <GeneralSection register={registerUser} errors={userErrors} />

        <GeneralKYCSection register={registerKYCData} errors={KYCDataErrors} />
        <div className="col-span-6 sm:col-full">
          <button
            className="text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default KycForm;
