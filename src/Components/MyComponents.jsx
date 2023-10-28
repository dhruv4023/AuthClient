import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import { City } from "country-state-city";
import React, { useEffect, useState } from "react";
import FlexEvenly from "./StyledComponents/FlexEvenly";
import MyTextField from "./StyledComponents/TextFieldSC";
export const SelectAutoComplete = ({
  msg,
  setInputVal,
  options,
  label,
  value,
  req = true,
}) => {
  return (
    <Tooltip title={msg}>
      <Autocomplete
        sx={{ width: "100%" }}
        options={options}
        autoHighlight
        value={value}
        getOptionLabel={(option) => option}
        onInputChange={(e, newInputValue) => {
          setInputVal(newInputValue, String(label).replace(" ", ""));
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ width: "100%" }}
            // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            required={req}
            value={value}
            {...params}
            label={
              String(label).charAt(0).toUpperCase() + String(label).substring(1)
            }
          />
        )}
      />
    </Tooltip>
  );
};

export const SelectLocation = ({ location, inputValues }) => {
  const initialLocation = {
    city: location ? location.city : "",
    pincode: location ? location.pincode : "",
    state: "Gujarat",
  };
  // console.log(location);
  const [values, setValues] = useState(initialLocation);
  const onChangehandle = (val, name) => {
    // e.preventDefault();
    let tmp = { ...values };
    // console.log(val);
    tmp[name] = val;
    setValues(tmp);
  };
  useEffect(() => {
    inputValues(values, "location");
  }, [values]);
  // console.log(values);
  return (
    <>
      <FlexEvenly gap={"1rem"} width={"100%"}>
        <MyTextField
          required
          label="State"
          onChange={(e) => onChangehandle(e.target.value, "state")}
          name="state"
          value={values.state}
          disabled={true}
          sx={{ flexGrow: 1 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <SelectAutoComplete
            label={"city"}
            value={values.city}
            setInputVal={onChangehandle}
            options={City.getCitiesOfState("IN", "GJ")
              .map((m) => m.name)
              .filter((f) => !f.includes(","))}
          />
        </Box>
        <MyTextField
          required
          inputProps={{
            minLength: 6,
            maxLength: 6,
          }}
          label="Pincode"
          onChange={(e) => onChangehandle(e.target.value, "pincode")}
          name="pincode"
          value={values.pincode}
          sx={{ flexGrow: 1 }}
        />
      </FlexEvenly>
    </>
  );
};
