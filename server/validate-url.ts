import {NextFunction, Request, Response} from 'express';
import { LinkPostRequest } from './types';

export default function validateUrl(req: Request<unknown, LinkPostRequest>, res: Response, next: NextFunction) {
    const {url} = req.body;

    try {
        new URL(url);
        next()
    } catch (__) {
        res.status(400).send('Invalid url');
    }
}
