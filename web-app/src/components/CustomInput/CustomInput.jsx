import React from 'react';
import { Controller} from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CustomInput = ({
  control,
  name,
  rules = {},
  label,
  type,
  multiline,
  inputProps,
  rows,
  required,
  id,
  // defaultValue,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>{
          type === "file" ?(
            <Button variant="contained" component="label">
              รูปภาพของโรคอ้อย
              <input
                required
                value={value}
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onChange={onChange}
                ></input>
            </Button>
            
          ) :<TextField
          value={value}
          id={id}
          variant="filled"
          required={required}
          name={name}
          autoFocus
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          type={type}
          multiline={multiline}
          rows={rows}
          inputProps={inputProps}
          // defaultValue={defaultValue}
        />
        }
                
          
        </>
      )}
    />
  );
};

export default CustomInput;