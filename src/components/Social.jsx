import React from "react";
import { SocialShare } from "../helpers/consts";

const Social = () => {
  return (
    <ul className="pt-1 mb-5 social list-unstyled">
      {SocialShare.map((val, i) => (
        <li key={i}>
          <a href={val.link} target="_blank" rel="noreferrer">
            <i className={val.iconName}></i>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Social;
