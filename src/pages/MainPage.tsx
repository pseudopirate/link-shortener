import React, { ChangeEvent } from 'react';
import {TextField, Button, Grid} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import RowContainer from '../components/RowContainer';


// Since we don't have any authentication yet we store all user links in local storage
// So if user wants to delete it we will check his permissions with local storage help
function updateMyLinks(shortLink: string) { 
    const links = window.localStorage.getItem('shortenedLinks');

    if (links) {
        const parsedLinks = JSON.parse(links) || [];

        window.localStorage.setItem('shortenedLinks', JSON.stringify([...parsedLinks, shortLink]));
    } else {
        window.localStorage.setItem('shortenedLinks', JSON.stringify([shortLink]));
    }
}


export default function MainPage() {
    const [url, setUrl] = React.useState<string>("");
    const [error, setError] = React.useState<string>();
    const navigate = useNavigate();

    const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }, [setUrl]);

    const handleSubmit = React.useCallback(() => {
        setError(undefined);

        window.fetch('/api/link', {
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
                
                updateMyLinks(shortenedLink);
                navigate(`/shortened/${shortenedLink}`);
            })
            .catch((error: Error) => {
                setError(error.message);
            })
    }, [url, navigate]);

    const handleEnterDown = React.useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit()
        }
    }, [handleSubmit]);


    return (
        <Grid container spacing={2}>
            <RowContainer item xs={12}>
                <TextField
                    label="URL"
                    value={url}
                    onChange={handleChange}
                    onKeyDown={handleEnterDown}
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
            </RowContainer>
        </Grid>
    )
}