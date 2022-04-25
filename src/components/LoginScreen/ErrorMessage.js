import React from 'react'
import useStyles from './styles'
function ErrorMessage({message}) {
    const classes = useStyles()
    return (
        <div className={classes.errorMessage}>{message}</div>
    )
}
export default ErrorMessage