import React from 'react'
import Box from '@mui/material/Box';

function ErrorPage() { 
  document.title = 'FOG Teams- 404 Page Not Found'

  return (
    <Box>
      <div></div>
      <div></div>
      <div>
        <div></div>
        <h4>
          The page you are looking for doesn't exist.
          <br />
          you may have mistyped the address or the page may have moved.
        </h4>
      </div>
    </Box>
  )
}
export default ErrorPage
