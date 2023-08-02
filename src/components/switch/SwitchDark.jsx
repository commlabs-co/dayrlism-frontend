import Image from "next/image";
import React, { useState, useEffect } from "react";
import lightImage from "../../../public/assets/img/sun.png";
import handleSwitchValue from "../../../utils/theme";

const SwitchDark = () => {
  const [isDark, setIsDark] = useState(false);

  const handleLabelClick = () => {
    if (isDark) {
      handleSwitchValue(true);
      setIsDark(false);
    } else {
      handleSwitchValue(false);
      setIsDark(true);
    }
  };

  useEffect(() => {
    const getCurrentTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      // Set the background color based on the time of the day
      if (currentHour >= 6 && currentHour < 18) {
        handleSwitchValue(false);
        setIsDark(true);
      } else {
        handleSwitchValue(true);
        setIsDark(false);
      }
    };

    getCurrentTime();

    // Update the background color every minute
    const interval = setInterval(getCurrentTime, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <label className={`theme-switcher-label d-flex  ${isDark ? "active" : ""}`}>
      <input
        type="checkbox"
        onClick={handleLabelClick}
        className="theme-switcher"
      />
      <div className="switch-handle">
        <span className="light-text">
          <Image src={lightImage} alt="swicher" className="filter_1" priority />
        </span>
        <span className="dark-text">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </span>
      </div>
    </label>
  );
};

export default SwitchDark;
