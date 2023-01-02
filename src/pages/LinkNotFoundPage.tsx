import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Grid } from '@mui/material';
import RowContainer from '../components/RowContainer';

export default function LinkNotFoundPage() {
    const navigate = useNavigate();
    const navigateToMain = React.useCallback(() => {
        navigate(`/`);
    }, [navigate]);

    return (
        <Grid container spacing={2}>
            <RowContainer item xs={12}>
                <h3>Link not found or was removed</h3>
            </RowContainer>
            <RowContainer item xs={12}>
                <Link onClick={navigateToMain}>Create new shortened link</Link>
            </RowContainer>
        </Grid>
    )
}
