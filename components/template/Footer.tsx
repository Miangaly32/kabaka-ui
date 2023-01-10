import { Typography, AppBar, Toolbar } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar sx={{ justifyContent: "space-evenly" }}>
                <Typography variant="body1" color="inherit">
                    © 2023 Kàbaka
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Footer;