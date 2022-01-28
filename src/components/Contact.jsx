import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMsg, setSuccessMsg] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState();

  const onSubmit = async (data, e) => {
    e.target.reset();
    console.log("Message submited: " + JSON.stringify(data));

    try {
      const respond = await fetch(`${"https://cms.im90s.org"}/dayrlism-leads`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(respond);
      setSuccessMsg(true);
    } catch (err) {
      setErrMsg(err);
    }
  };

  return (
    <>
      <form className="contactform" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="YOUR NAME"
              />
              {errors.name && errors.name.type === "required" && (
                <span className="invalid-feedback">Name is required</span>
              )}
            </div>
          </div>
          {/* End .col */}
          <div className="col-12 col-md-6">
            <div className="form-group">
              <input
                {...register(
                  "email",
                  {
                    required: "Email is Required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  },
                  { required: true }
                )}
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
              />
              {errors.email && (
                <span className="invalid-feedback">{errors.email.message}</span>
              )}
            </div>
          </div>
          {/* End .col */}
          <div className="col-12 col-md-6">
            <div className="form-group">
              <input
                {...register("mobile", { required: true })}
                type="text"
                name="mobile"
                placeholder="YOUR MOBILE"
              />
              {errors.mobile && (
                <span className="invalid-feedback">Mobile is required.</span>
              )}
            </div>
          </div>
          {/* End .col */}
          <div className="col-12 col-md-6">
            <div className="form-group">
              <input
                {...register("subject", { required: true })}
                type="text"
                name="subject"
                placeholder="YOUR SUBJECT"
              />
              {errors.subject && (
                <span className="invalid-feedback">Message is required.</span>
              )}
            </div>
          </div>
          {/* End .col */}
          <div className="col-12">
            <div className="form-group">
              <textarea
                {...register("message", { required: true })}
                name="message"
                placeholder="YOUR MESSAGE"
              ></textarea>
              {errors.message && (
                <span className="invalid-feedback">Message is required.</span>
              )}
            </div>
          </div>
          {/* End .col */}
          <div className="col-12">
            <button type="submit" className="button">
              <span className="button-text">Send Message</span>
              <span className="button-icon fa fa-send"></span>
            </button>
          </div>
          {/* End .col */}
          {successMsg && (
            <span className="valid-feedback">Successfully Sent!</span>
          )}
          {errMsg && (
            <span className="invalid-feedback">
              Error, please reach out to Admin!
              <br />
              Message: {errMsg}
            </span>
          )}
        </div>
      </form>

      {/* End contact */}
    </>
  );
};

export default Contact;
