import styles from "./BotCard.module.scss"
import {BotCardProps} from "./BotCard.types.ts"

export default function BotCard({bot} : BotCardProps) {
    return (
        <div className={styles.botListItem} key={bot.id}>
            <h3>{bot.name}</h3>
            <img src={bot.avatarUrl} alt={bot.name} className={styles.botAvatar}/>
        </div>
    )
}
