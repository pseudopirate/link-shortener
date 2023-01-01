import express, {NextFunction, Request, Response} from 'express';
import { shortenLink } from './shortener';
import { LinkPostRequest } from './types';
import validateUrl from './validate-url';

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/ping', (__, res) => {
    res.send('It is fine');
});

app.use(express.json());

app.post('/link', validateUrl, async (req: Request<unknown, LinkPostRequest>, res: Response) => {
    const shortenedLink = shortenLink(req.body.url);

    res.json({
        shortenedLink,
    });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({errors: [err.message]});
});

app.listen(PORT, () => {
    console.info(`Server listening on ${PORT}`);
});