import { IResponse } from "./response";

export interface IControllerRequest {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: string;
  user: any;
  headers: Record<string, any>;
  cookies: Record<string, any> & {
    accessToken?: string;
    refreshToken?: string;
  };
  files?: any;
  file?: any;
}

export type IControllerResponse = (request:IControllerRequest) => Promise<IResponse | string >;