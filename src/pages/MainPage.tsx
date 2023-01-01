import React, { ChangeEvent } from 'react';
import {TextField, Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';

const InputContainer = styled(Grid)`
    padding: 1rem;
    padding-left: 2rem;
`

export default function MainPage() {
    const [url, setUrl] = React.useState<string>("");

    const handleChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }, [setUrl]);


    return (
        <Grid container spacing={2}>
            <InputContainer xs={12}>
                <TextField
                    label="URL"
                    value={url}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{endAdornment: (
                        <Button
                            variant="contained"
                            size="large"
                        >
                            Shorten
                        </Button>
                    )}}
                />
            </InputContainer>
        </Grid>
    )
}