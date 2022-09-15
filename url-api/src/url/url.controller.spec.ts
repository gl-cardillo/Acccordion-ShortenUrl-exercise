import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { db } from '../db/urlDB';
import { createMock } from '@golevelup/ts-jest';
import { Request, Response, NextFunction } from 'express';

describe('AppController', () => {
  let urlController: UrlController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
    }).compile();

    urlController = app.get<UrlController>(UrlController);
  });

  describe('url', () => {
    it('should return all the db, (longUrl, shortenUrl', () => {
      expect(urlController.returnUrl()).toStrictEqual(db);
    });
  });

  describe('url/encode', () => {
    it('should return a shorten Url', () => {
      const longUrl = {
        longUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      };
      const shortenUrl = {
        shortenUrl: 'https://urlShort.com/V9zBtPZkJwbtO7ThZMraq',
      };
      const longUrl2 = {
        longUrl:
          'https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452?th=1',
      };
      const shortenUrl2 = {
        shortenUrl: 'https://urlShort.com/VeeuFzLkGJ4dFJyoa8eCa',
      };
      expect(urlController.returnShortenUrl(longUrl)).toStrictEqual(shortenUrl);
      expect(urlController.returnShortenUrl(longUrl2)).toStrictEqual(
        shortenUrl2,
      );
    });
  });

  describe('url/decode', () => {
    it('should return the long Url', () => {
      const longUrl = {
        longUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      };
      const shortenUrl = {
        shortenUrl: 'https://urlShort.com/V9zBtPZkJwbtO7ThZMraq',
      };
      const longUrl2 = {
        longUrl:
          'https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452?th=1',
      };

      const shortenUrl2 = {
        shortenUrl: 'https://urlShort.com/VeeuFzLkGJ4dFJyoa8eCa',
      };
      expect(urlController.returnLongUrl(shortenUrl)).toStrictEqual(longUrl);
      expect(urlController.returnLongUrl(shortenUrl2)).toStrictEqual(longUrl2);
    });
  });
});
