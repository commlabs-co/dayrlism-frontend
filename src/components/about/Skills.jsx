import React from "react";
import { skillsContent } from "../../helpers/consts";

const Skills = () => {
  return (
    <>
      {skillsContent.map((val, i) => (
        <div className="mb-3 col-6 col-md-3 mb-sm-5" key={i}>
          <div className={`c100 ${val.skillClass}`}>
            <span>{val.skillPercent}%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
          <h6 className="mt-2 text-center text-uppercase open-sans-font mt-sm-4">
            {val.skillName}
          </h6>
        </div>
      ))}
    </>
  );
};

export default Skills;
