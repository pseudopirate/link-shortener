import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Link, Snackbar, TextField, Grid } from '@mui/material';
import RowContainer from '../components/RowContainer';


export default function ShortenedResultPage() {
    const {shortUrl} = useParams();
    const navigate = useNavigate();

    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const url = React.useMemo(() => `${process.env.REACT_APP_LINK_HOST}/l/${shortUrl}`, [shortUrl]);

    const handleCopy = React.useCallback(() => {
        navigator.clipboard.writeText(url);
        setTooltipVisible(true);
    }, [url]);
    
    const navigateToStatistics = React.useCallback(() => {
        navigate(`/statistics/${shortUrl}`)
    }, [shortUrl, navigate]);

    return (
        <Grid container spacing={2}>
            <RowContainer item xs={12}>
                <TextField
                    variant="standard"
                    label="Your short URL"
                    value={url}
                    disabled
                    fullWidth
                    InputProps={{endAdornment: (
                        <>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleCopy}
                            >
                                Copy
                            </Button>
                            <Snackbar
                                open={tooltipVisible}
                                onClose={() => setTooltipVisible(false)}
                                autoHideDuration={2000}
                                message="Copied to clipboard"
                            />
                        </>
                    )}}
                />
            </RowContainer>
            <RowContainer item xs={12}>
                <p>Visit <Link onClick={navigateToStatistics}>statistics page</Link> to view clicks statistics</p>
            </RowContainer>
        </Grid>
    )
}
