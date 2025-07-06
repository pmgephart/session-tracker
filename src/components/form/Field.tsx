/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

interface FieldProps {
    name: string,
    id: string,
    label: string,
    value: string,
    type: string,
    errors: [],
    onChange: () => void
}

const Field: FC<FieldProps> = ({ name, id, label, value, type, errors, onChange }): JSX.Element => {
    const error = errors.find(error => error.field === name);

    return (
        <div className="w-full pb-5">
            <label htmlFor={name} className="block pb-2">{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                className="w-full bg-transparent rounded px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md"
            />
            {error && ((
            <div className="st-errors rounded p-2 text-xs bg-red-100 border-red-600 border-solid mt-3">
                <p className="text-red-600 pb-1">{error.error}</p>
            </div>
            ))}
        </div>
    );
};

export default Field;