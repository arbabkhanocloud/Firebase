import React, { useState } from "react";
import Button from "../../../component/button/button.component";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { setupRecaptcha } from "../../../util/firebase/firebase.util";
import { useNavigate } from "react-router-dom";
import classes from "./phone.module.scss";

const Phone = () => {
  const [value, setValue] = useState();
  const [OTP, setOTP] = useState();
  const [confirmObj, setConfirmObj] = useState<any>();
  const [isSending, setIsSending] = useState(true);
  const navigate = useNavigate();

  const handleSendCode = async (event: any) => {
    event.preventDefault();
    try {
      const response = await setupRecaptcha(value);
      setConfirmObj(response);
      setIsSending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePhoneNumber = (event: any) => {
    setValue(event);
  };

  const handleSubmitCode = async (event: any) => {
    event.preventDefault();
    if (OTP === "" || OTP === null) return;
    try {
      await confirmObj.confirm(OTP);
      navigate("/");
    } catch (error) {
      alert("Invalid OTP");
      console.log("error");
    }
  };

  const onOTPChange = (event: any) => {
    setOTP(event.target.value);
  };

  return (
    <div className={classes["phone-auth"]}>
      <h1>Phone Authentication</h1>
      {isSending && (
        <form onSubmit={handleSendCode}>
          <PhoneInput
            className="input"
            defaultCountry="PK"
            placeholder="Enter phone number"
            value={value}
            onChange={(event) => {
              onChangePhoneNumber(event);
            }}
          />
          <div id="recaptcha-container" />
          <div className={classes["buttons-container2"]}>
            <Button type="submit" buttonType="google">
              Send code
            </Button>
          </div>
        </form>
      )}

      {!isSending && (
        <form onSubmit={handleSubmitCode}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={OTP}
            onChange={onOTPChange}
          />
          <div className={classes["buttons-container2"]}>
            <Button type="submit" buttonType="google">
              Submit code
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Phone;
