/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

interface FormErrorProps {
    error: string
}

const FormError: FC<FormErrorProps> = ({ error }): JSX.Element => {
    if(!error) {
        return (null);
    }

    return (
        <div className="st-errors rounded mb-3 p-3 text-xs bg-red-100 border-red-600 border-solid">
            <p className="text-red-600 pb-1" key={index}>{error}</p>
        </div>
    );
};

export default FormError;