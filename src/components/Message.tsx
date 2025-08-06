/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

"use client";

interface MessageProps {
    type?: string,
    text: string
}

const Message: FC<MessageProps> = ({ type = '', text }): JSX.Element => {
    if(text === '') {
        return (null);
    }

    if(type === "success") {
        return (
            <div className="st-errors rounded mb-3 p-3 text-xs bg-green-100 border-green-600 border-solid">
                <p className="text-green-600 pb-1">{text}</p>
            </div>
        );
    }

    if(type === "error") {
        return (
            <div className="st-errors rounded mb-3 p-3 text-xs bg-red-100 border-red-600 border-solid">
                <p className="text-red-600 pb-1">{text}</p>
            </div>
        );
    }

    return (
        <div className="st-errors rounded mb-3 p-3 text-xs border-solid">
            <p className="pb-1">{text}</p>
        </div>
    );
};

export default Message;