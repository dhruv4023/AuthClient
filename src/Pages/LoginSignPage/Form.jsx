import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "Components/StyledComponents/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexEvenly from "Components/StyledComponents/FlexEvenly";
import { getUserNames, login, updateProfile } from "./LoginRegisterChangePass";
import { SelectLocation } from "../../Components/MyComponents";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import Loading from "Components/Loader/Loading";
import MyTextField from "Components/StyledComponents/TextFieldSC";
import ButtonSC from "Components/StyledComponents/ButtonSC";
import LinkedText from "Components/StyledComponents/LinkedText";

const Form = ({ pgType, editProfile, user }) => {
  // Initial values for registration and login
  const initialValuesRegister = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    password: "",
    picPath: "",
    location: {
      state: "Gujarat",
      city: "",
      pincode: "",
    },
  };
  const initialValuesLogin = {
    uid: "",
    password: "",
  };

  const theme  = useTheme();
  const [loading, setLoading] = useState(false);
  const [pageType, setPageType] = useState(pgType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";

  // Set initial values based on page type
  const [values, setValues] = useState(
    isLogin ? initialValuesLogin : editProfile ? user : initialValuesRegister
  );

  // Handle form field changes
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };

  // Handle image change
  const imgChangeHandl = (fl, name) => {
    let tmp = values;
    tmp[name] = fl;
    setValues(tmp);
  };

  const token = useSelector((s) => s.token);

  const [userNames, setUserNames] = useState();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editProfile) values["_id"] = true;

    if (isLogin) {
      // Handle login
      await login(values, dispatch, setLogin, navigate);
    } else if (userNames?.includes(values.username)) {
      alert("Please select a unique username.");
    } else if (editProfile && values.email === user.email) {
      // Handle profile update
      alert(await updateProfile(values, dispatch, token, navigate));
    } else {
      // Navigate to email verification if registering
      navigate("/verifyemail", { state: values });
    }
    setLoading(false);
  };

  // Reset form values
  const resetForm = () => {
    setValues(!isLogin ? initialValuesLogin : initialValuesRegister);
  };

  const [getUserNamesOnce, setGetUserNamesOnce] = useState(false);

  useEffect(() => {
    // Get user names for registration once
    !editProfile && isRegister && getUserNames(setUserNames);
  }, [getUserNamesOnce]);

  return (
    <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
      {loading ? (
        <Loading />
      ) : (
        <FormFields
          onChangehandle={onChangehandle}
          values={values}
          isRegister={isRegister}
          userNames={userNames}
          isLogin={isLogin}
          imgChangeHandl={imgChangeHandl}
          editProfile={editProfile}
        />
      )}
      <Box>
        <ButtonSC
          theme={theme}
          fullWidth
          type="submit"
          disabled={loading}
        >
          {isLogin ? "LOGIN" : editProfile ? "Save Changes" : "REGISTER"}
        </ButtonSC>
        {!editProfile && (
          <LinkedText
            onClick={() => {
              setPageType(isLogin ? "Register" : "Login");
              setGetUserNamesOnce(true);
              resetForm();
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </LinkedText>
        )}{" "}
        {isLogin && (
          <LinkedText
            onClick={() => {
              navigate("/changepass", { state: { page: "enteremail" } });
            }}
          >
            Forgot Password ?
          </LinkedText>
        )}
      </Box>
    </form>
  );
};
export default Form;

const FormFields = ({
  onChangehandle,
  userNames,
  values,
  isRegister,
  isLogin,
  editProfile,
  imgChangeHandl,
}) => {
  const [addPic, setAddPic] = useState(false);
  const theme = useTheme();
  console.log(values);
  return (
    <>
      {isRegister && (
        <FlexEvenly>
          <MyTextField
            required
            label="First Name"
            onChange={(e) => onChangehandle(e.target.value, "firstName")}
            name="firstName"
            value={values.firstName}
          />
          <MyTextField
            required
            label="Last Name"
            onChange={(e) => onChangehandle(e.target.value, "lastName")}
            name="lastName"
            value={values.lastName}
          />
        </FlexEvenly>
      )}
      <FlexEvenly flexDirection="column" margin={"0 .5rem 0 .5rem"}>
        <MyTextField
          required
          type={isRegister ? "email" : "text"}
          label={isLogin ? "Email or Username" : "Email"}
          onChange={(e) =>
            isLogin
              ? onChangehandle(e.target.value, "uid")
              : onChangehandle(e.target.value, "email")
          }
          value={values.email}
          name="email"
        />
        {!editProfile && (
          <MyTextField
            required
            label="Password"
            type="password"
            onChange={(e) => onChangehandle(e.target.value, "password")}
            value={values.password}
            name="password"
          />
        )}
        {isRegister && (
          <>
            {editProfile ? (
              <MyTextField disabled={editProfile} value={values.username} />
            ) : userNames ? (
              <MyTextField
                disabled={editProfile}
                required
                label="Username"
                error={userNames?.includes(values.username) && !editProfile}
                onChange={(e) => onChangehandle(e.target.value, "username")}
                value={values.username}
                name="username"
                helperText={"Enter Unique Username"}
              />
            ) : (
              <Loading />
            )}
            <MyTextField
              required
              label="About"
              onChange={(e) => onChangehandle(e.target.value, "about")}
              name="about"
              value={values.about}
            />
            <FlexBetween width={"100%"}>
              <IconButton
                onClick={() => {
                  setAddPic(!addPic);
                  imgChangeHandl("", "picPath");
                }}
              >
                {addPic ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </IconButton>
              <Typography flexGrow={"1"}>
                {addPic
                  ? "Click to turn off Picture Option"
                  : "Click to turn on Picture Option"}
              </Typography>
            </FlexBetween>
            {addPic && (
              <Box
                border={`2px solid ${theme.palette.neutral.medium}`}
                borderRadius="5px"
                width={"100%"}
                p="1rem"
                margin={"0.5rem"}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    imgChangeHandl(acceptedFiles[0], "picPath");
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`1px dashed ${theme.palette.primary.main}`}
                      textAlign="center"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {values?.picPath === "" ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography padding={"0.5rem "}>
                            {values.picPath.name}
                          </Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}
          </>
        )}
      </FlexEvenly>

      {isRegister && (
        <>
          <SelectLocation
            location={values?.location}
            inputValues={onChangehandle}
          />
        </>
      )}
    </>
  );
};
