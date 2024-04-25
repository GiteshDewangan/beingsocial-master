import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../states";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

// creating schema using yup library for validation
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required!")
    .max(50, "Must be not greater then 50 characters!"),
  lastName: yup
    .string()
    .required("Required!")
    .max(50, "Must be not greater then 50 characters!"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Required!")
    .max(50, "Must be not greater then 50 characters!"),
  password: yup.string().required("Required!"),
  location: yup
    .string()
    .required("Required!")
    .max(25, "Must be not greater then 25 characters!"),
  occupation: yup
    .string()
    .required("Required!")
    .max(20, "Must be not greater then 20 characters!"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email!").required("Required!"),
  password: yup.string().required("Required!"),
});

// initial values for all fields to reset forms
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // defining theme colors
  const { palette } = useTheme();
  const neutralMedium = palette.neutral.medium;
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;

  //registering a user
  const register = async (values, onSubmitProps) => {
    // this allows us to send the Form data with picture
    const formData = new FormData();
    for (let value in values) {
      //appending a key and corrsponding value for each data in values
      formData.append(value, values[value]);
    }
    // appending picturePath in formData at last
    formData.append("picturePath", values.picture.name);

    const sendUserResponse = await fetch(
      "http://localhost:8080/auth/register",
      {
        method: "POST",
        body: formData,
        // only there we don't need to convert formData to string because of FormData() interface
      }
    );

    const savedUser = await sendUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  // login with user
  const login = async (values, onSubmitProps) => {
    const loginUserResponse = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const loggedInUser = await loginUserResponse.json();
    onSubmitProps.resetForm();

    if (loggedInUser) {
      dispatch(
        setLogin({
          user: loggedInUser.userData,
          token: loggedInUser.token,
        })
      );
      console.log(loggedInUser);
      Navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    // // *using Formik according to the documentation from https://formik.org/docs/overview *
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* getting and destructuring some things from Formik which is predefined in the Formik */}
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 2fr))"
            sx={{
              "&>div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${neutralMedium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${primaryMain}`}
                        p="1rem"
                        borderRadius="5px"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p style={{ textAlign: "left" }}>
                            Add or Drop Picture here...
                          </p>
                        ) : (
                          <FlexBetween color={primaryMain}>
                            <Typography>{values.picture.name}</Typography>
                            <IconButton>
                              <EditOutlinedIcon />
                            </IconButton>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              type={showPassword ? "text" : "password"}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Creating submit button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                m: "2rem auto",
                p: "0.6rem",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                color: primaryMain,
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": {
                  color: primaryDark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Register here"
                : "Already have an Account?  Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;

{
  /* <div className="flex flex-col justify-start items-start">
  <label className="text-base font-medium leading-6 text-slate-700">
    Profile Image File
  </label>
  <div
    className={`w-full border-2 border-dashed ${
      values.profileImageFile ? "border-blue-600" : "border-slate-500"
    } rounded-md my-2`}
  >
    <Dropzone
      acceptedFiles=".jpg, .jpeg, .png"
      multiple={false}
      onDrop={(acceptedFiles) =>
        setFieldValue("profileImageFile", acceptedFiles[0])
      }
    >
      {({ getInputProps, getRootProps }) => (
        <div {...getRootProps()} className="p-3 w-full cursor-copy">
          <input {...getInputProps()} />
          <div className="flex flex-col justify-center items-center">
            <FiUploadCloud
              className={`text-4xl ${
                values.profileImageFile ? "text-blue-600" : "text-slate-500"
              }`}
            />
            {!values.profileImageFile ? (
              <p className="text-slate-600">Add or Drop Picture here...</p>
            ) : (
              <p className="text-blue-600 font-semibold">
                {values.profileImageFile && values.profileImageFile.name}
              </p>
            )}
          </div>
        </div>
      )}
    </Dropzone>
  </div>
  <p className="text-red-500 text-left text-sm">
    {touched.profileImageFile && errors.profileImageFile}
  </p>
</div>; */
}
