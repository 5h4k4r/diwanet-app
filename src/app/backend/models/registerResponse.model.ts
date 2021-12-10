import { ServiceMan } from './serviceman.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface RegisterResponse {
  access_token?: string;
  service_man?: ServiceMan;
}
