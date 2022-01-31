import { coverImage } from "../constants";
import "./_SingleCardStyle.css";

interface ISingleCard {
  src: string;
  handleClickCardMagic: () => void;
  flipped: boolean;
}

const SingleCard = ({ src, handleClickCardMagic, flipped }: ISingleCard) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front-card" src={src} alt="card front" />
        <img className="back-card" src={coverImage?.src} alt="card back" onClick={handleClickCardMagic} />
      </div>
    </div>
  );
};

export default SingleCard;
