import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const LandingPage = ()=> {
  const [value, setValue] = React.useState(3);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={3} control={<Radio />} label="10" />
        <FormControlLabel value={4} control={<Radio />} label="18" />
      </RadioGroup>
    </FormControl>
  );
}