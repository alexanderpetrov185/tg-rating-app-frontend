import { Bot } from "../types/bot";
import logo from "../assets/logo.png"

export const mockBots: Bot[] = [
    { id: 1, name: "TestBot", username: "@test_bot", avatarUrl: logo, rating: 4.5 },
    { id: 2, name: "SampleBot", username: "@sample_bot", avatarUrl: logo, rating: 3.8 },
    { id: 3, name: "Major", username: "@major_bot", avatarUrl: logo, rating: 3 }
];