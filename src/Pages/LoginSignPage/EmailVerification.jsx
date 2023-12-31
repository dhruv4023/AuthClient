import { useTheme } from "@emotion/react";
import FlexEvenly from "Components/StyledComponents/FlexEvenly";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, sendMail, updateProfile } from "./LoginRegisterChangePass";
import { useDispatch, useSelector } from "react-redux";
import Loading from "Components/Loader/Loading";
import TextFieldSC from "Components/StyledComponents/TextFieldSC";
import ButtonSC from "Components/StyledComponents/ButtonSC";
import { Button } from "@mui/material";

const EmailVerification = () => {
  // Get the current location and navigation function
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redux store dispatch
  const dispatch = useDispatch();
  const values = location.state;
  const theme = useTheme();

  // Redirect to the home page if no values are present
  useEffect(() => {
    !values && navigate("/", { state: null });
  });

  // State variables for OTP handling
  const [sentOtp, setSentOtp] = useState();
  const token = useSelector((s) => s.token);
  const [otp, setOtp] = useState(0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (String(otp).trim() === String(sentOtp)) {
      if (values?.page === "changepass") {
        // Navigate to change password page
        navigate("/changepass", {
          state: { email: values.email, page: "makenewpass" },
        });
      } else if (!values._id) {
        // Handle registration
        alert(await register(values, dispatch, navigate));
        navigate("/login", { state: null });
      } else {
        // Handle profile update
        alert(await updateProfile(values, dispatch, token, navigate));
      }
    } else {
      alert("Invalid OTP");
    }
    setLoading(false);
  };

  // Send OTP email and update UI accordingly
  const sendOtpMail = (otpnum, to_mail) => {
    setLoading(true);
    setSentOtp(otpnum);
    sendMail(to_mail, otpnum);
    setLoading(false);
  };

  // State variables and functions for sending OTP
  const [sendOtpBtnVal, setSendOtpBtnVal] = useState("Click here to Send OTP");
  const [disableBtn, setdisableBtn] = useState(false);
  const sendOtpBtn = () => {
    sendOtpMail(Math.floor(Math.random() * 1000000), values.email);
    let sec = 30;
    setSendOtpBtnVal("Didn't receive OTP? Send Again");
    setdisableBtn(true);
    setTimeout(() => {
      setdisableBtn(false);
      clearInterval(interval);
      setSendOtpBtnVal("Send Again");
    }, sec * 1000);
    let i = sec;
    const interval = setInterval(() => {
      i--;
      setSendOtpBtnVal("Send again in " + i);
    }, 1000);
  };

  // console.log(loading);
  return (
    <>
      Email OTP Verification
      <FlexEvenly flexDirection={"column"}>
        <form onSubmit={handleSubmit}>
          <TextFieldSC
            variant="standard"
            label={"Enter OTP here"}
            required
            type={"text"}
            onChange={(e) => setOtp(e.target.value)}
          />
          <ButtonSC
            fullWidth
            disabled={loading}
            type="submit"
            theme={theme}
          >
            Verify
          </ButtonSC>
        </form>
        <Button disabled={disableBtn} onClick={() => sendOtpBtn()}>
          {sendOtpBtnVal}
        </Button>
      </FlexEvenly>
      {loading && <Loading />}
    </>
  );
};

export default EmailVerification;
