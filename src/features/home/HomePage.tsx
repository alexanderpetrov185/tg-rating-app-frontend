import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.scss";
import {BotTypes} from "../../types/bot";
import {mockBots} from "../../mocks/botMock";
import BotCard from "../../components/molecules/BotCard/BotCard"
import logo from "../../assets/logo.png"
import ValidationError from "../../components/atoms/ValidationError/ValidationError";
import useSearchInput from "../../hooks/useSearchInput";

export default function HomePage() {
    const [botList, setBotList] = useState<BotTypes[]>([]);

    const {
        inputValue,
        error,
        handleInputChange,
        getRawValue,
        validate
    } = useSearchInput({
        minLength: 3,
        validationPattern: /^[a-zA-Z][a-zA-Z0-9_]{0,31}$/,
        patternErrorMessage: "Введите корректное имя бота (латиница, цифры, _)",
    });

    //заглушка, дефолтные значения бота
    useEffect(()=> {
        setBotList(mockBots)
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Валидируем текущее значение
        const validationError = validate();
        if (validationError) return;

        // Получаем значение без "@"
        const botName = getRawValue();
        console.log("Отправка данных:", botName);

        // Здесь логика поиска/отправки
    };


    return (
        <div className={styles.homePage}>
            <img src={logo} alt="Логотип сервиса" className={styles.logo} />
            <h1 className={styles.title}>Народный рейтинг телеграм-ботов</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="input">
                    Введите название бота:
                </label>
                <input
                    id="input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`${styles.input} ${error && styles.inputError}`}
                    placeholder="@bot_name"
                />
                <ValidationError error={error} visible={!!error}/>
                <button type="submit" className={styles.button} disabled={!!error}>
                    Отправить
                </button>
            </form>
            <h2 className={styles.botListTitle}>{!!inputValue?"Поиск:":"Популярные боты:"}</h2>
            <div className={styles.botListContainer}>
                {botList.map((bot)=> (
                    <BotCard bot={bot} key={bot.id}/>
                ))}
            </div>
        </div>
    );
}
