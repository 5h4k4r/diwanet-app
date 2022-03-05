import { ServiceMan } from './serviceman.model';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  service_man?: ServiceMan;
};
