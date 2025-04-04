import React, {useEffect, useState} from "react";
import "./HomePage.scss";
import {Bot} from "../types/bot";
import {mockBots} from "../mocks/botMock";

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

        if (botNameRaw.length < 3) {
            setError("Введите минимум 3 символа для поиска");
            return;
        }

        const botNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,31}$/;

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
        <div className="home-page">
            <img src="/assets/images/logo.png" alt="Логотип сервиса" className="home-page__logo" />
            <h1 className="home-page__title">Народный рейтинг телеграм-ботов</h1>
            <form className="home-page__form" onSubmit={handleSubmit}>
                <label htmlFor="input" className="home-page__label">
                    Введите название бота:
                </label>
                <input
                    id="input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`home-page__input ${!!error ? "error" : ""}`}
                    placeholder="@bot_name"
                />
                <div className={`error-container ${!!error ? "visible" : "hide"}`}>
                    <p className="error-message">Введите корректное имя бота (латиница, цифры, _)</p>
                </div>
                <button type="submit" className="home-page__button" disabled={!!error}>
                    Отправить
                </button>
            </form>
            <h2 className={"home-page__list-title"}>{!!inputValue?"Поиск:":"Популярные боты:"}</h2>
            <div className="home-page__bot-list">
                {botList.map((bot)=> (
                    <div className="home-page__bot-list__item" key={bot.id}>
                        <h3 className={"bot-title"}>{bot.name}</h3>
                        <img src={bot.avatarUrl} alt={bot.name} className={"bot-Avatar"}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
