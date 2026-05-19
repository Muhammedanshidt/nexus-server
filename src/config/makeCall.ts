import type {
  NextFunction,
  Request,
  Response,
  RequestHandler
} from 'express';
import { IControllerRequest, IControllerResponse } from '../interfaces/controller';
import { IResponse } from '../interfaces/response';

import httpStatus from 'http-status-codes';
import { sentConfiguredHeaders, sentHeaders } from './headers';

type UploadedFile = any;
type FileArray = any;

interface FileRequest extends Request {
  files: FileArray | null;
  file: UploadedFile | any;
}

const extractHeaders = (req: Request) => ({
  'device-id': req?.headers['device-id'] ?? '',
  'app-type': req?.headers['app-type'] ?? '',
  'content-type': req?.headers['content-type'] ?? '',
  referer: req?.headers['referer'] ?? '',
  'user-agent': req?.headers['user-agent'] ?? '',
  authorization: req?.headers['authorization'] ?? '',
});

export const makeCall =
  (callback: IControllerResponse): RequestHandler =>
  (req, res, next) => {
    const fileReq = req as FileRequest;

    const request: IControllerRequest = {
      body: req?.body ?? {},
      query: req?.query ?? {},
      params: req?.params ?? {},
      ip: req?.ip ?? '',
      method: req?.method ?? '',
      path: req?.path ?? '',
      user: (req as any)?.user ?? {},
      cookies: req.cookies ?? {},
      headers: extractHeaders(req),
      file: fileReq.file ?? null,
      files: fileReq.files ?? null,
    };

    const success = (response: string | IResponse) => {
      const {
        statusCode = httpStatus.OK,
        message =
          typeof response === 'string'
            ? response
            : httpStatus.getStatusText(statusCode),
        headers = null,
        data,
        redirect,
        cookies = [],
      } =
        typeof response === 'string'
          ? { message: response }
          : response ?? {};

      if (headers) {
        sentHeaders(res, headers);
      }

      sentConfiguredHeaders(res);

      if (redirect) {
        return res.redirect(statusCode, redirect);
      }

      cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          ...cookie.options,
        });
      });

      return res.status(statusCode).send({
        statusCode,
        message,
        data,
      });
    };

    callback(request)
      .then(success)
      .catch(next);
  };


export default makeCall
