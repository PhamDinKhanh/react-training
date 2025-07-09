import type { KYCData, User } from "../../shared/types/index.ts";
import GeneralKYCSection from "./GeneralKYC.tsx";
import GeneralSection from "./GeneralSection.tsx";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addUser, updateUser } from "../../store/userSlice";
import { getKYCDataById, addKYC, updateKYC } from "../../store/kycSlice.ts";
import { useEffect } from "react";
import LoadingIndicator from "../../shared/LoadingIndicator.tsx";

const KycForm = () => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  const { kycData } = useAppSelector((state) => state.kyc);

  useEffect(() => {
    if (user !== null) {
      resetUser(user);
      dispatch(getKYCDataById(user.id))
    }
  }, [user]);

  useEffect(() => {
    if(kycData != null){
      resetKYCData(kycData)
    }
  }, [kycData])

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

  const onSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitUser();
    onSubmitKYCData();
  };

  const onSubmitUser = async () => {
    const userData = getUserValues();
    try {
      if (user != null) {
       await dispatch(updateUser(userData)).unwrap();
      } else {
        await dispatch(addUser(userData)).unwrap();
      }
      alert("User added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add user.");
    }
  };


  const onSubmitKYCData = async () => {
    const KYCDataSubmit = getKYCDataValues();
    KYCDataSubmit.id = user?.id!;
    console.log(KYCDataSubmit);
    //shoule be implement slice KYC and create document KYC on firebase
    try {
      if (kycData != null) {
        await dispatch(updateKYC(KYCDataSubmit)).unwrap();
      } else {
        await dispatch(addKYC(KYCDataSubmit)).unwrap();
      }
    }catch (e) {
      alert("Failed to add kyc.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitAll}>
        <GeneralSection register={registerUser} errors={userErrors} />

        {loading && <LoadingIndicator />}
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
