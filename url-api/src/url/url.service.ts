import { Injectable, Redirect } from '@nestjs/common';
import { Url } from './url.model';
import { validUrl } from '../utils/utils';
import { nanoid } from 'nanoid';
import { baseUrl } from '../utils/utils';
import { db } from '../db/urlDB';

@Injectable()
export class UrlService {
  url: Url[] = db;

  returnAllUrls() {
    return [...this.url];
  }

  returnShortenUrl(url) {
    //check is a valid url
    const { longUrl } = url;

    if (validUrl(longUrl)) {
      try {
        const urlFounded = this.url.filter(
          (urlObject) => urlObject.longUrl === longUrl,
        );
        //if the url is in the database
        if (urlFounded.length > 0) {
          //return the shorten url
          return { shortenUrl: urlFounded[0].shortenUrl };
        } else {
          // if is not in the db create a new shorten url
          // and add to the url array
          const newShortenUrl = `${baseUrl}${nanoid()}`;
          this.url.push({ longUrl, shortenUrl: newShortenUrl });
          return { shortenUrl: newShortenUrl };
        }
      } catch (err) {
        console.log(err);
        return { message: 'Sorry a problem as occurred' };
      }
    } else {
      return { message: 'Sorry this is not a valid url' };
    }
  }

  returnLongUrl(url) {
    const { shortenUrl } = url;

    try {
      const urlFounded = this.url.filter(
        (urlObject) => urlObject.shortenUrl === shortenUrl,
      );
      // if code is found in the db return url
      if (urlFounded.length > 0) {
        return { longUrl: urlFounded[0].longUrl };
      } else {
        return { message: 'Sorry url not found' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Sorry an error as occurred' };
    }
  }

  redirectToUrl(url) {
    const { shortenUrl } = url;
    try {
      const urlFounded = this.url.filter(
        (urlObject) => urlObject.shortenUrl === shortenUrl,
      );
      // if code is found in the db return url
      if (urlFounded.length > 0) {
        return { url: urlFounded[0].longUrl };
      } else {
        return { message: 'Sorry code not found' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Sorry an error as occurred' };
    }
  }
}
