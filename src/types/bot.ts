type TrustScore = number | "undetermined" | "possible scam" | "verified" | "banned"

export interface BotTypes {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
    numberOfUsers?: number;
    rating: number;
    flags?: string[]; // ['new', 'suspicious', 'premium']
    trustScore: TrustScore;
    scamDetection: {
        keywords?: string[]; // автоматически найденные
        manualReview: boolean; // требует ручной проверки
    };
    // categories?: string[];
    // createdDate?: Date;
    // isVerified?: boolean;
}