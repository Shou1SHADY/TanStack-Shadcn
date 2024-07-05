// loading.tsx
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Loading...
            </Typography>
        </Box>
    );
};

export default Loading;
