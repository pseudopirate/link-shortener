import React from 'react';
import {TextField, Button, Grid, Link, Snackbar, Alert, AlertTitle} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import RowContainer from '../components/RowContainer';

export default function StatisticsPage() {
    const {shortUrl} = useParams();
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<(readonly [number, string])[]>([]);
    const [error, setError] = React.useState<string>();

    const navigate = useNavigate();

    const userLinks = JSON.parse(window.localStorage.getItem('shortenedLinks') || '[]') as string[];

    const handleDelete = React.useCallback(() => {
        setError(undefined);
        window.fetch('/api/link', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: shortUrl}),
        })
        .then(res => {
            if(res.ok) {
                setTooltipVisible(true);
                return;
            } else {
                return res.text()
                    .then(text => { throw new Error(text) })
            }    
        })
        .catch((error: Error) => {
            setError(error.message);
        })
    }, [shortUrl]);

    const navigateToMain = React.useCallback(() => {
        navigate(`/`);
    }, [navigate]);

    React.useEffect(() => {
        window.fetch('/api/statistics?' + new URLSearchParams({shortUrl: shortUrl as string}))
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return res.text()
                    .then(text => { throw new Error(text) })
            }    
        })
        .then((data) => {
            const groupedData = (data as {createdAt: string}[]).reduce((acc, {createdAt}) => {
                const date = createdAt.split(' ')[0]
                if (acc[date]) {
                    acc[date] = acc[date] + 1;
                } else {
                    acc[date] = 1;
                }
                return acc;
            }, {} as Record<string, number>)
            const clicksData = Object.keys(groupedData).map((date) => [groupedData[date], date] as const);

            setTableData(clicksData);
        })
        .catch((error: Error) => {
            setError(error.message);
        })
    }, [shortUrl]);

    return (
        <Grid container spacing={2}>
            <RowContainer item xs={9}>
                <h3>Link clicks statistics</h3>
            </RowContainer>
            {userLinks.includes(shortUrl as string) && (
                <RowContainer item xs={3}>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete link
                    </Button>
                    <Snackbar
                        open={tooltipVisible}
                        onClose={() => setTooltipVisible(false)}
                        autoHideDuration={2000}
                        message="Link deleted"
                    />
                </RowContainer>
            )}

                {error && (
                    <RowContainer item xs={12}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    </RowContainer>
                )}

            <RowContainer item xs={12}>
                <Grid container spacing={1} columns={2}>
                    <Grid item xs={1}>
                        Day
                    </Grid>
                    <Grid item xs={1}>
                        Visits
                    </Grid>
                    {tableData.map(([visits, day]) => (
                        <React.Fragment key={day}>
                            <Grid item xs={1}>
                                {new Date(day).toDateString()}
                            </Grid>
                            <Grid item xs={1}>
                                {visits}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </RowContainer>

            <RowContainer item xs={12}>
                <Link onClick={navigateToMain}>Create new shortened link</Link>
            </RowContainer>
        </Grid>
    )
}
