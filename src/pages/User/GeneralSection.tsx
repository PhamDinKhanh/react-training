import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import type { User } from '../../shared/types';

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


export default function GeneralSection({register, errors}: GeneralInfoFieldsProps) {
    const fields: GeneralInfoFields[] = [
        {label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Bonnie'},
        {label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Green'},
        {label: 'Country', name: 'country', type: 'text', placeholder: 'United States'},
        {label: 'City', name: 'city', type: 'text', placeholder: 'e.g. San Francisco'},
        {label: 'Address', name: 'address', type: 'text', placeholder: 'e.g. California'},
        {label: 'Email', name: 'email', type: 'email', placeholder: 'example@company.com'},
        {label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: 'e.g. +(12)3456 789'},
        {label: 'Birthday', name: 'birthday', type: 'text', placeholder: '15/08/1990'},
        {label: 'Organization', name: 'organization', type: 'text', placeholder: 'Company Name'},
        {label: 'Role', name: 'role', type: 'text', placeholder: 'React Developer'},
        {label: 'Department', name: 'department', type: 'text', placeholder: 'Development'},
        {label: 'Zip/postal code', name: 'zipCode', type: 'text', placeholder: '123456'},
    ];
    
    return (
        <div
            className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
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
                            className={`shadow-sm bg-gray-50 border ${
                                errors[field.name]
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            {...register(field.name, { required: `${field.label} is required` })}
                        />
                        {errors[field.name as keyof User] && (
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
