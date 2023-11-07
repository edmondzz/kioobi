import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Menu,
  FormControl,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    tax: '',
    maxDays: '',
    ageFrom: '',
    ageTo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  
    let isValid = true;
    if (name === 'ageFrom' || name === 'ageTo') {
      isValid = validateNumberInput(value, name, 0, 99);
    } else if (name === 'tax' || name === 'maxDays') {
      isValid = validateNumberInput(value, name);
    }
  
    if (isValid) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  
  const validateNumberInput = (value, field, min = 0, max = Infinity) => {
    const isNumeric = value === '' || (!isNaN(value) && !isNaN(parseFloat(value)));

    if (!isNumeric) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: 'Only numbers are allowed' }));
      return false;
    }
  
    const numberValue = parseInt(value, 10);
  
    if (numberValue < min || numberValue > max) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: `Value must be between ${min} and ${max}` }));
      return false;
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    }
  };  
  
  const handleSave = () => {
    let newErrors = { ...errors };
    let isFormValid = true;

    Object.keys(form).forEach(key => {
      if (form[key] === '') {
        newErrors[key] = 'This field is required';
        isFormValid = false;
      }
    });

    if (isFormValid) {
      isFormValid = isFormValid && validateNumberInput(form.tax, 'tax');
      isFormValid = isFormValid && validateNumberInput(form.maxDays, 'maxDays');
      isFormValid = isFormValid && validateNumberInput(form.ageFrom, 'ageFrom', 0, 99);
      isFormValid = isFormValid && validateNumberInput(form.ageTo, 'ageTo', 0, 99);
  
      if (parseInt(form.ageFrom, 10) > parseInt(form.ageTo, 10)) {
        newErrors['ageTo'] = 'Age To must be greater than or equal to Age From';
        isFormValid = false;
      }
    }
  
    setErrors(newErrors);

    if (isFormValid) {
      setEntries([...entries, form]);
      setForm({
        tax: '',
        maxDays: '',
        ageFrom: '',
        ageTo: '',
      });
    }
  };

  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{display:'flex', flexWrap:'wrap', flexGrow:1 }} maxWidth="xl" sx={{ marginTop: '8rem'}}>
      <Box display="flex" justifyContent="space-between" p={2}  gap={4}>
        <Paper sx={{ width: { xs: '100%', sm: '35%' }, p: 2, minWidth:'200px' }}>
          <Typography variant="h6" gutterBottom>
            Add New Entry
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <FormControl fullWidth margin="normal">
            <Typography variant="caption" display="block" gutterBottom>
              Enter the tax rate
            </Typography>
            <TextField
              variant="outlined"
              error={!!errors.tax}
              helperText={errors.tax}
              size="small"
              name="tax"
              label="Tax"
              placeholder='Tax'
              value={form.tax}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography variant="caption" display="block" gutterBottom>
              Enter the maximum number of days
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              name="maxDays"
              error={!!errors.maxDays}
              helperText={errors.maxDays}
              label="Max Days"
              placeholder='Max Days'
              value={form.maxDays}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography variant="caption" display="block" gutterBottom>
              Specify the starting age range
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label='Age From'
              error={!!errors.ageFrom}
              helperText={errors.ageFrom}
              placeholder='Age From'
              name="ageFrom"
              value={form.ageFrom}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Typography variant="caption" display="block" gutterBottom>
              Specify the ending age range
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label="Age To"
              name="ageTo"
              error={!!errors.ageTo}
              helperText={errors.ageTo}
              placeholder='Age To'
              value={form.ageTo}
              onChange={handleChange}
              
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 1 }}>
            Save
          </Button>
        </Paper>
        <TableContainer component={Paper} sx={{ width: '65%', minWidth:'250px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Age</TableCell>
                <TableCell>Max Days</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{`${entry.ageFrom} - ${entry.ageTo}`}</TableCell>
                  <TableCell>{entry.maxDays}</TableCell>
                  <TableCell>{entry.tax}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, index)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open && selectedIndex === index}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleDelete(index)}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
