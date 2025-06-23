import React, { useState, useCallback } from "react";

interface UseSearchInputOptions {
    minLength?: number;
    validationPattern?: RegExp;
    emptyErrorMessage?: string;
    minLengthErrorMessage?: string;
    patternErrorMessage?: string;
}

const DEFAULT_OPTIONS: Required<UseSearchInputOptions> = {
    minLength: 3,
    validationPattern: /^[a-zA-Z][a-zA-Z0-9_]{0,31}$/,
    emptyErrorMessage: "Поле не должно быть пустым",
    minLengthErrorMessage: "Введите минимум {min} символа для поиска",
    patternErrorMessage: "Введите корректное значение",
};

export default function useSearchInput(userOptions: UseSearchInputOptions = {}) {
    const options: Required<UseSearchInputOptions> = {
        ...DEFAULT_OPTIONS,
        ...userOptions
    };

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const validate = useCallback(
        (value: string): string => {
            // Всегда убираем "@" в начале для валидации
            const rawValue = value.startsWith("@") ? value.slice(1) : value;

            if (!rawValue) return options.emptyErrorMessage;
            if (rawValue.length < options.minLength) {
                return options.minLengthErrorMessage.replace("{min}", String(options.minLength));
            }
            if (!options.validationPattern.test(rawValue)) return options.patternErrorMessage;
            return "";
        },
        [options]
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.value.trim();

            // Автоматически добавляем "@" если:
            // 1. Есть текст
            // 2. Не начинается с "@"
            // 3. Начинается с допустимого символа (буква)
            if (value && !value.startsWith("@") && /^[a-zA-Z]/.test(value)) {
                value = "@" + value;
            }

            setInputValue(value);
            setError(validate(value));
        },
        [validate]
    );

    const getRawValue = useCallback(
        () => inputValue.startsWith("@") ? inputValue.slice(1) : inputValue,
        [inputValue]
    );

    return {
        inputValue,
        error,
        handleInputChange,
        getRawValue,
        setInputValue,
        setError,
        validate: () => {
            const errorMsg = validate(inputValue);
            setError(errorMsg);
            return errorMsg;
        }
    };
}