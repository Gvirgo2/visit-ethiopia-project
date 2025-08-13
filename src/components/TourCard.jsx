import starImg from "../assets/star.svg";
import ertale from "../assets/ertale.jpg";



export default function TourCard({rating, reviewCount, title}) {
  const style = {
    backgroundImage: `url(${ertale})`,
  }

  return (
    <div className="tour-card overlay" style={style}>
      <div className="rating-container">
        <img src={starImg} alt="star" />
        <span>{rating}({reviewCount})</span>
      </div>
      <div>
        <h6>{title}</h6>
      </div>
    </div>
  )
}
