import React from 'react';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Link, Snackbar, TextField } from '@mui/material';

const InputContainer = styled(Grid)`
    padding: 1rem;
    padding-left: 2rem;
`

export default function ShortenedResultPage() {
    const {shortUrl} = useParams();
    const navigate = useNavigate();

    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const url = React.useMemo(() => `${window.location.origin}/${shortUrl}`, [shortUrl]);

    const handleCopy = React.useCallback(() => {
        navigator.clipboard.writeText(url);
        setTooltipVisible(true);
    }, [url]);
    
    const navigateToStatistics = React.useCallback(() => {
        navigate(`/statistics/${shortUrl}`)
    }, [shortUrl, navigate]);

    return (
        <Grid container spacing={2}>
            <InputContainer item xs={12}>
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
            </InputContainer>
            <InputContainer item xs={12}>
                <p>Visit <Link onClick={navigateToStatistics}>statistics page</Link> to view clicks statistics</p>
            </InputContainer>
        </Grid>
    )
}
