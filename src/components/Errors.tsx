/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

interface ErrorsProps {
    errors: []
}

const Errors: FC<ErrorsProps> = ({ errors }): JSX.Element => {
    if(errors.length === 0) {
        return (null);
    }

    return (
        <div className="st-errors rounded mb-3 p-3 text-xs bg-red-100 border-red-600 border-solid">
            {errors.map((error, index) => (
            <p className="text-red-600 pb-1" key={index}>{error.error}</p>
            ))}
        </div>
    );
};

export default Errors;