import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.scss";
import {Bot} from "../../types/bot";
import {mockBots} from "../../mocks/botMock";
import logo from "../../assets/logo.png"

export default function HomePage() {
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [botList, setBotList] = useState<Bot[]>([]);

    //заглушка, дефолтные значения бота
    useEffect(()=> {
        setBotList(mockBots)
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.trim();

        if (value && !value.startsWith("@")) {
            value = "@" + value;
        }

        setInputValue(value);

        const botNameRaw = value.slice(1); // Убираем '@'


        if (botNameRaw.length < 4) {
            setError("Введите минимум 3 символа для поиска");
        } else {
            setError("");
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
            <img src={logo} alt="Логотип сервиса" className={styles.homePageLogo} />
            <h1 className={styles.homePageTitle}>Народный рейтинг телеграм-ботов</h1>
            <form className={styles.homePageForm} onSubmit={handleSubmit}>
                <label htmlFor="input">
                    Введите название бота:
                </label>
                <input
                    id="input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`${styles.homePageFormInput} ${!!error ? "error" : ""}`}
                    placeholder="@bot_name"
                />
                <div className={`${styles.errorContainer + !!error ? "visible" : "hide"}`}>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
                <button type="submit" className={styles.homePageButton} disabled={!!error}>
                    Отправить
                </button>
            </form>
            <h2>{!!inputValue?"Поиск:":"Популярные боты:"}</h2>
            <div className={styles.homePageBotList}>
                {botList.map((bot)=> (
                    <div className={styles.homePageBotListItem} key={bot.id}>
                        <h3>{bot.name}</h3>
                        <img src={bot.avatarUrl} alt={bot.name} className={styles.botAvatar}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
