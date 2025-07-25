import styles from "./BotCard.module.scss";
import { BotCardProps } from "./BotCard.types.ts";
import RatingStars from "../RatingStars/RatingStars";

export default function BotCard({ bot }: BotCardProps) {
  return (
    <div className={styles.botListItem} key={bot.id}>
      <div className={styles.botInfo}>
        <img src={bot.avatarUrl} alt={bot.name} className={styles.botAvatar} />
        <h3>{bot.name}</h3>
        <h4>{bot.username}</h4>
        <div className={styles.botRating}>
          <RatingStars rating={bot.rating} />
        </div>
      </div>
    </div>
  );
}
