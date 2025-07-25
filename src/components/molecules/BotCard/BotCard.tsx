import styles from "./BotCard.module.scss";
import { BotCardProps } from "./BotCard.types.ts";
import RatingStars from "../RatingStars/RatingStars";

export default function BotCard({ bot }: BotCardProps) {
  return (
    <section className={styles.botListItem}>
      <div className={styles.botInfo}>
        <img src={bot.avatarUrl} alt={bot.name} className={styles.botAvatar} />
        <h3>{bot.name}</h3>
        <h4>{bot.username}</h4>
        <div className={styles.botRating}>
          <RatingStars rating={bot.rating} />
          <span className={styles.ratingValue}>{bot.rating}</span>
          <span className={styles.numberOfVotesValue}>
            ({bot.numberOfVotes})
          </span>
        </div>
      </div>
    </section>
  );
}
