import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import type { KYCData } from '../../shared/types';

interface GeneralInfoFieldsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

interface GeneralInfoFields {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}

export default function GeneralKYCSection({ register, errors }: GeneralInfoFieldsProps) {
    const fields: GeneralInfoFields[] = [
        { label: 'Id Type', name: 'idType', type: 'text', placeholder: 'CCCD' },
        { label: 'Id Number', name: 'idNumber', type: 'text', placeholder: '0790xxxxxxxx' },
        { label: 'Address', name: 'address', type: 'text', placeholder: '364 Cong Hoa' },
        { label: 'City', name: 'city', type: 'text', placeholder: 'Ho Chi Minh, City' },
        { label: 'Distric', name: 'distric', type: 'text', placeholder: 'Tan Binh Ward' },
    ];
    return (
        <div
            className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">General KYC Information</h3>
            <div className="grid grid-cols-6 gap-6">
                {fields.map((field) => (
                    <div key={field.name} className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor={field.name}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {field.label}
                        </label>
                        <input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`shadow-sm bg-gray-50 border ${errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            {...register(field.name, { required: `${field.label} is required` })}
                        />
                        {errors[field.name as keyof KYCData] && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors[field.name]?.message)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}