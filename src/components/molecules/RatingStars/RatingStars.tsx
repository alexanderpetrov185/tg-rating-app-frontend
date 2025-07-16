import StarIcon from "../../atoms/StarIcon/StarIcon";
import styles from "./RatingStars.module.scss"
import {RatingStarsProps} from "./RatingStars.types.ts"

export default function RatingStars({rating}: RatingStarsProps) {
    const fullStars = Math.floor(rating)
    const partialValue = rating - fullStars

    return (
        <>
            {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.starField}>
                    <StarIcon filled={false} className={styles.starCarcass}/>
                    {(i < fullStars || (i === fullStars && partialValue > 0)) && (
                        <div className={styles.starFilled}>
                            <StarIcon filled={true}/>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
