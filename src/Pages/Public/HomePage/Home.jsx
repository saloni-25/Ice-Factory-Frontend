import React from "react";
/*import CURRENTIceRatesAndAvailabilityAtYourFingertips from "./CURRENT-ICE-RATES-AND-AVAILABILITY-AT-YOUR-FINGERTIPS.png";
import GETStarted from "./GET-STARTED.png";
import LOGIN from "./LOGIN.png";
import fileDelivery2 from "./file-delivery-2.png";*/
import fileDelivery from "/ImagePool/file-delivery.png";

import lockOpen from "/ImagePool/lock-open.png";
import rectangle1 from "/ImagePool/rectangle-1.png";
/*import "./style.css";*/
import unsplashXnzrf6Rrkm4 from "/ImagePool/unsplash-xnzrf6rrkm4.png";
import winter from "/ImagePool/winter.png";
import './homes.css';
import './homestyle.css';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="rectangle" alt="Rectangle" src={rectangle1} />

          <img className="unsplash" alt="Unsplash" src={unsplashXnzrf6Rrkm4} />

          <p className="heading">CURRENT ICE RATES AND AVAILABILITY AT YOUR FINGERTIPS</p>

          <p className="text-wrapper">
            Stay updated with our competitive ice rates and real-time
            availability. Order effortlessly and ensure your business never runs
            out of ice
          </p>

          <div className="div" />

          <img className="file-delivery" alt="File delivery" src={fileDelivery} />

          <img className="img" alt="File delivery" src={fileDelivery} />

          <div className="text-wrapper-2">Faster Delivery</div>

          <div className="abcd-falan-dhimkhana">
            abcd falan dhimkhana
            <br />
            jnfjneajkvneajfnb
          </div>

          <div className="abcd-falan-dhimkhana-2">
            abcd falan dhimkhana
            <br />
            jnfjneajkvneajfnb
          </div>

          <div className="abcd-falan-dhimkhana-3">
            abcd falan dhimkhana
            <br />
            jnfjneajkvneajfnb
          </div>

          <div className="text-wrapper-3">Faster Delivery</div>

          <div className="text-wrapper-4">Faster Delivery</div>

          <div className="text-wrapper-5">HOME</div>

          <div className="text-wrapper-6">ABOUT US</div>

          <div className="text-wrapper-7">PLACE ORDER</div>

          <div className="text-wrapper-8">CONTACT US</div>

          <div className="rectangle-2" />

         
          <p className="LOGIN">LOGIN</p>

          <img className="lock-open" alt="Lock open" src={lockOpen} />

          <div className="text-wrapper-9">Ice Factory</div>

          <img className="winter" alt="Winter" src={winter} />

          <div className="rectangle-3" />

          <p className="GET-STARTED">GET STARTED</p>

          <img
            className="file-delivery-2"
            alt="File delivery"
            src={fileDelivery}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;