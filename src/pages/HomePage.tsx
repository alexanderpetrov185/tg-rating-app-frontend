import React, {useState} from "react";
import "./HomePage.scss";

export default function HomePage() {
    const [inputValue, setInputValue] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("input value", inputValue) //заглушка
    }

    return (
        <div className={"home-page"}>
            <img src="/assets/images/logo.png" alt="Логотип сервиса" className="home-page__logo" />
            <h1 className={"home-page__title"}>Народный рейтинг телеграмм ботов</h1>
            <form className="home-page__form" onSubmit={handleSubmit}>
                <label htmlFor="input" className={"home-page__label"}>
                    Введите название бота:
                </label>
                <input
                    id="input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="home-page__input"
                    placeholder="@bot_name"
                />
                <button type="submit" className="home-page__button">
                    Отправить
                </button>
            </form>
        </div>
    );
}
