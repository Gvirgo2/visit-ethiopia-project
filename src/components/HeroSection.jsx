import Profile from "./Profile"
import userImgUrl1 from "../assets/userImg-1.png"
import userImgUrl2 from "../assets/userImg-2.png"
import userImgUrl3 from "../assets/userImg-3.png"
import userImgUrl4 from "../assets/userImg-4.png"
import userImgUrl5 from "../assets/userImg-5.png"
import userImgUrl6 from "../assets/userImg-6.png"
import locationSvg from "../assets/location.svg"
import planeSvg from "../assets/plane.svg"
import personSvg from "../assets/person.svg"
import timeSvg from "../assets/time.svg"

import "../index.css"


export default function HeroSection() {
  return (
    <section className="hero-section overlay" >
      <h1>Plan tours to dream locations with just a click!</h1>
      <p className="he">"From the soaring peaks of the Simien Mountains to the lava lakes of Danakil, Ethiopia is nature’s untamed masterpiece waiting to be explored."</p>
      <div className="profile-container">
        <Profile img={userImgUrl1} />
        <Profile img={userImgUrl2} />
        <Profile img={userImgUrl3} />
        <Profile img={userImgUrl4} />
        <Profile img={userImgUrl5} />
        <Profile img={userImgUrl6} />
        <div className="customer-no">10K+</div>
      </div>
      <div className="hero-form-container">
        <div className="hero-form">
          <label htmlFor="location">
            <img src={locationSvg} alt="location" />
            <span>Location</span>
          </label>
          <select name="location" id="location">
            <option value="Bale Mountains">Bale Mountains</option>
            <option value="Lalibela">Lalibela</option>
            <option value="Axum">Axum</option>
            <option value="Harar">Harar</option>
            <option value="Danakil">Danakil</option>
          </select>
        </div>
        <div className="hero-form">
          <label htmlFor="tour-type">
            <img src={planeSvg} alt="plane" />
            <span>Tour Type</span>
          </label>
          <select name="tour-type" id="tour-type">
            <option value="pre-book">pre-book</option>
            <option value="Cultural">Cultural</option>
            <option value="Historical">Historical</option>
            <option value="Nature">Nature</option>
            <option value="Wildlife">Wildlife</option>
          </select>
        </div>
        <div className="hero-form">
          <label htmlFor="date">
            <img src={timeSvg} alt="date" />
            <span>Date</span>
          </label>
          <input type="date" name="date" id="date" />
        </div>
        <div className="hero-form last-form">
          <label htmlFor="guest-no">
            <img src={personSvg} alt="person" />
            <span>Number of Guests</span>
          </label>
          <select name="guest-no" id="guest-no">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
        </div>
        <button className="btn btn-primary">Search</button>
      </div>
      
    </section>
  )
}
