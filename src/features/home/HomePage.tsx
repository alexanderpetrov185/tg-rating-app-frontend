import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.scss";
import {BotTypes} from "../../types/bot";
import {mockBots} from "../../mocks/botMock";
import BotCard from "../../components/molecules/BotCard/BotCard"
import logo from "../../assets/logo.png"
import ValidationError from "../../components/atoms/ValidationError/ValidationError";

export default function HomePage() {
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [botList, setBotList] = useState<BotTypes[]>([]);

    //заглушка, дефолтные значения бота
    useEffect(()=> {
        setBotList(mockBots)
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.trim();

        // Автодобавление @
        if (value && !value.startsWith("@")) {
            value = "@" + value;
        }

        setInputValue(value);
        const botNameRaw = value.slice(1); // Убираем '@'

        // Валидация
        if (botNameRaw.length < 4) {
            setError("Введите минимум 3 символа для поиска");
            return;
        }

        const botNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{0,31}$/;
        if (!botNameRegex.test(botNameRaw)) {
            setError("Введите корректное имя бота (латиница, цифры, _)");
        } else {
            setError("");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!inputValue) {
            setError("Поле не должно быть пустым");
            return;
        }

        if (error) return;

        const botName = inputValue.slice(1); // Убираем '@' перед отправкой
        console.log("Отправка данных:", botName);
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
