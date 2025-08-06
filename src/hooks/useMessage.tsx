/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

// TODO: define prop and return types

"use client";

import { useState, useCallback } from "react";

const INITIAL_MESSAGE = {
    text: '',
    type: ''
}

export function useMessage(initialText: string = '', initialType: string = ''): object {
    const [message, setMessage] = useState({
        text: initialText,
        type: initialType
    });

    const showMessage = useCallback((text, type) => {
        setMessage({
            text: text,
            type: type
        });
    }, []);

    const clearMessage = useCallback(() => {
        setMessage(INITIAL_MESSAGE);
    }, []);

    return {
        message,
        showMessage,
        clearMessage,
        hasMessage: Boolean(message.text)
    };
}
