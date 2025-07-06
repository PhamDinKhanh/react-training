import GeneralKYCSection from './GeneralKYC.tsx';
import GeneralSection from './GeneralSection.tsx';
import { useForm } from 'react-hook-form';

const KycForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('Submitted data:', data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <GeneralSection register={register} errors={errors}/>
    
                <GeneralKYCSection register={register} errors={errors}/>
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
