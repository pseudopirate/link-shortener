import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import StatisticsPage from './pages/StatisticsPage';
import ShortenedResultPage from './pages/ShortenedResultPage';
import { Global } from '@emotion/react';
import Header from './Header';
import { Card } from '@mui/material';
import styled from '@emotion/styled';

const AppCard = styled(Card)`
  padding: 1rem;
`

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  },
});

function App() {
	return (
		<BrowserRouter>
      <Global
        styles={{
            body: {
            },
        }}
      />
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Container maxWidth="md">
            <AppCard>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route index element={<MainPage/>} />
                  <Route path='/shortened/:shortUrl' element={<ShortenedResultPage/>} />
                  <Route path='/statistics/:shortUrl' element={<StatisticsPage/>} />
                </Route>
                <Route path='*' element={<MainPage/>} />
              </Routes>
            </AppCard>
          </Container>
        </ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
