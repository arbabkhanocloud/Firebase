import React, { useState } from "react";
import Button from "../../../component/button/button.component";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { setupRecaptcha } from "../../../util/firebase/firebase.util";
import { useNavigate } from "react-router-dom";
import classes from "./phone.module.scss";

const Phone = () => {
  const [value, setValue] = useState<string>("");
  const [OTP, setOTP] = useState<string>();
  const [confirmObj, setConfirmObj] = useState<any>();
  const [isSending, setIsSending] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await setupRecaptcha(value);
      setConfirmObj(response);
      setIsSending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePhoneNumber = (event: string) => {
    setValue(event);
  };

  const handleSubmitCode = async (event: React.FormEvent) => {
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

  const onOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={onChangePhoneNumber}
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
