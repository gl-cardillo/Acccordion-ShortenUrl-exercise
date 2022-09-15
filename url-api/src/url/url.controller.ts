import { Controller, Get, Body, Post, Header, Res } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  returnUrl(): any {
    return this.urlService.returnAllUrls();
  }

  @Post('encode')
  @Header('Content-type', 'application/json')
  returnShortenUrl(@Body() url: object): any {
    return this.urlService.returnShortenUrl(url);
  }

  @Post('decode')
  @Header('Content-type', 'application/json')
  returnLongUrl(@Body() code: object): any {
    return this.urlService.returnLongUrl(code);
  }

  @Post('retrieve')
  redirectToUrl(@Res() res, @Body() code: object): any {
    const urlRedirect = this.urlService.redirectToUrl(code);
    //if shortenUrl is found redirect to the url
    if (urlRedirect.hasOwnProperty('url')) {
      return res.redirect(urlRedirect.url);
    } else {
      //otherwise redirect to url not found page
      return res.redirect({ url: 'https://urlShort.com/urlNotFound' });
    }
  }
}
