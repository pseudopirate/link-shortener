import { createShortLinkStatement, listShortLinksStatement } from "./db";
import randomstring from 'randomstring';

export function getUniqueLink(existingLinks: string[]) {
    let shortLink = randomstring.generate(6);

    while (existingLinks.includes(shortLink)) {
        shortLink = randomstring.generate(6);
    }

    return shortLink;
}

export function shortenLink(url: string) {
    const shortenedLinks = listShortLinksStatement().all();
    const shortenedLink = getUniqueLink(shortenedLinks);

    createShortLinkStatement().run({
        link: url,
        shortLink: shortenedLink
    })

    return shortenedLink;
}
