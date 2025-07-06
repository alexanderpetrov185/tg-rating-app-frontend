import { BotTypes } from "../types/bot";
import logo from "../assets/logo.png"

export const mockBots: BotTypes[] = [
    { id: 1, name: "TestBot", username: "@test_bot", avatarUrl: logo, rating: 4.5, trustScore: 100, scamDetection: {keywords: ["scam"], manualReview: true} },
    { id: 2, name: "SampleBot", username: "@sample_bot", avatarUrl: logo, rating: 3.8, trustScore: 100, scamDetection: {manualReview: false}  },
    { id: 3, name: "Major", username: "@major_bot", avatarUrl: logo, rating: 3, trustScore: 100, scamDetection: {manualReview: false}  }
];