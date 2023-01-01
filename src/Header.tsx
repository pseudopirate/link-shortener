import { Link, Outlet } from "react-router-dom"
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import LinkIcon from '@mui/icons-material/Link';

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
    font-size: 46px;
`

export default function Header() {
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                        <IconContainer>
                    <Link to="/">
                            <LinkIcon color="primary" fontSize="inherit"/>
                    </Link>
                        </IconContainer>
                </Grid>
                <Grid item xs={5}>
                    <h2>Link shortener</h2>
                </Grid>
            </Grid>
            <Outlet/>   
        </>
    )
}
