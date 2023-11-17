import React, { useState } from 'react'

import { Box, Button, FormControl, Input, Table, Typography } from '@mui/material';

function QueryInput({handleFileChange,
    handleUpload,selectedFile}) {
  
  return (
    <Box mb={2}>
    <Typography variant="h5" gutterBottom>
      Upload a File
    </Typography>
    <Input
      type="file"
      onChange={handleFileChange}
      style={{ display: 'none' }}
      inputProps={{ 'aria-label': 'upload file' }}
      id='upload-button'
    />
    <label htmlFor="upload-button">
      <Button
        variant="contained"
        color="primary"
        component="span"
      >
        Choose File
      </Button>
    </label>
    {selectedFile && (
      <Typography variant="body1" gutterBottom>
        Selected File: {selectedFile.name}
      </Typography>
    )}
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpload}
      disabled={!selectedFile}
    >
      Upload
    </Button>
  </Box>

  )
}


export default QueryInput