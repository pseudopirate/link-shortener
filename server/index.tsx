import express, {NextFunction, Request, Response} from 'express';
import {
    getShortLinksStatement, createShortLinkVisitStatement, listShortLinkVisitsStatement, deleteShortLink,
} from './db';
import { shortenLink } from './shortener';
import { LinkDeleteRequest, LinkPostRequest } from './types';
import {validateUrl} from './validate';

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/ping', (__, res) => {
    res.send('It is fine');
});

app.use(express.json());

app.post('/api/link', validateUrl, (req: Request<unknown, LinkPostRequest>, res: Response) => {
    const shortenedLink = shortenLink(req.body.url);

    res.json({
        shortenedLink,
    });
});

app.delete('/api/link', (req: Request<unknown, LinkDeleteRequest>, res: Response) => {
    const shortenedLink = req.body.url;
    deleteShortLink(shortenedLink)();

    res.sendStatus(204);
});

app.get('/l/:link', (req: Request, res: Response) => {
    const {link} = req.params;
    const shortLinkStatement = getShortLinksStatement();
    const raw = shortLinkStatement.get(link);

    if (raw) {
        const insertVisit = createShortLinkVisitStatement();
        insertVisit.run({shortLink: raw.shortLink});

        res.redirect(307, raw.link);
    } else {
        res.redirect(307, 'http://localhost:3000/not-found');
    }
});

app.get('/api/statistics', (req, res: Response) => {
    const {shortUrl} = req.query;
    const visits = listShortLinkVisitsStatement().all(shortUrl) || [];
    res.json(visits);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(PORT, () => {
    console.info(`Server listening on ${PORT}`);
});
