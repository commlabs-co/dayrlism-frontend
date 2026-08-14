execution();

function execution() {
  const educationData = [
    {
      header: "Malaysia",
      title: "Diploma in Software Engineer| APU",
      des:
        "The <a target='_blank' href='https://www.apu.edu.my'>Asia Pacific University</a> of Technology and Innovation (colloquially known as APU) is a private university in Malaysia.",
      year: "2012"
    },
    {
      header: "Malaysia",
      title: "Mobile Web App Developer| Nettium",
      des:
        "Established in Kuala Lumpur in 2009, Nettium creates innovative solutions for online gaming, e-commerce, gamification, and talent management.",
      year: "2014"
    },
    {
      header: "Malaysia",
      title: "Creative Developer/Web Dev| Inspired Mobile",
      des:
        "Inspired is a unique mobile marketing platform offering an evolving suite of solutions from premium publisher ad serving, creative development, application.",
      year: "2015"
    },
    {
      header: "Malaysia",
      title: "Software Engineer| Leet Ent",
      des:
        "Established in 2017, Leet Entertainment Group Limited based in Hong Kong focuses on providing an end-to-end medium for a complete social gaming experience.",
      year: "2017"
    },
    {
      header: "Malaysia",
      title: "Senior Frontend Dev| Carsome",
      des:
        "Carsome is Southeast Asia's fastest growing online car-selling platform that connects customers to used car dealers nationwide.",
      year: "2018"
    },
    {
      header: "Malaysia",
      title: "Fullstack Dev| Rea Group",
      des:
        "REA Group (ASX:REA) is a digital advertising company that operates Australia's leading property websites and real estate websites in Europe, Asia and the US.",
      year: "2019"
    },
    {
      header: "Singapore",
      title: "Fullstack Dev| Plus65",
      des:
        "Plus65 Interactive is at the forefront of exploring possibilities and making real-world advances in the interactive arena.",
      year: "2020"
    }
  ];
  renderEducation(educationData);
}

function renderEducation(educationData) {
  educationData.map((res, index) => {
    if ((index + 1) % 2 === 0) {
      leftEdu(index + 1, res);
    } else {
      rightEdu(index + 1, res);
    }
  });
}

function rightEdu(number, data) {
  $("#dyl-education").append(
    $(`
        <div class="education_box education_firsrtbox firstbox">
            <div class="row">
                <div class="col-lg-6 col-md-4 col-sm-12 col-12 align-self-center">
                    <div class="education_mleft education_left ">
                        <div class="edu_mainyear edu_leftyear">
                            <h1>${data.year}</h1>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-8 col-sm-12 col-12 align-self-center">
                    <div class="education_mright education_right ">
                        <div class="education_minfo education_rinfo ">
                            <div class="prt_rightside_title">
                                <div class="left_title_box">
                                    <div class="left_title">
                                        <h4>${number}</h4>
                                    </div>
                                    <div class="right_title bg-pink">
                                        <h4>${data.header}</h4>
                                    </div>
                                </div>
                            </div>
                            <h3 class="education_place"><span data-hover="Diploma" class="data_hover"></span>${data.title}</h3>
                            <p>${data.des} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
  );
}

function leftEdu(number, data) {
  $("#dyl-education").append(
    $(`
        <div class="education_box education_secondbox secondbox">
            <div class="row">
                <div class="col-lg-6 col-md-8 col-sm-12 col-12 align-self-center">
                    <div class="education_mright education_left ">
                        <div class="education_minfo education_rinfo ">
                            <div class="prt_rightside_title">
                                <div class="left_title_box">
                                    <div class="right_title bg-yellow">
                                        <h4>${data.header}</h4>
                                    </div>
                                    <div class="left_title">
                                        <h4>${number}</h4>
                                    </div>
                                </div>
                            </div>
                            <h3 class="education_place"><span data-hover="Diploma"
                                    class="data_hover"></span> ${data.title}</h3>
                            <p>${data.des}
                            </p>

                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-4 col-sm-12 col-12 align-self-center">
                    <div class="education_mleft education_left ">
                        <div class="edu_mainyear edu_leftyear">
                            <h1>${data.year}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
  );
}
