import React, { ChangeEvent } from 'react';
import {TextField, Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const InputContainer = styled(Grid)`
    padding: 1rem;
    padding-left: 2rem;
`

export default function MainPage() {
    const [url, setUrl] = React.useState<string>("");
    const [error, setError] = React.useState<string>();
    const navigate = useNavigate();

    const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }, [setUrl]);

    const handleSubmit = React.useCallback(() => {
        setError(undefined);

        window.fetch('/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url}),
            })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    return res.text()
                        .then(text => { throw new Error(text) })
                }    
            })
            .then(({shortenedLink}) => {
                navigate(`/shortened/${shortenedLink}`)
            })
            .catch((error: Error) => {
                setError(error.message);
            })
    }, [url]);


    return (
        <Grid container spacing={2}>
            <InputContainer item xs={12}>
                <TextField
                    label="URL"
                    value={url}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(error)}
                    helperText={error}
                    InputProps={{endAdornment: (
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                        >
                            Shorten
                        </Button>
                    )}}
                />
            </InputContainer>
        </Grid>
    )
}