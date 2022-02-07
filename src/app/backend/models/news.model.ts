import { Image } from './image.model';
import { ServiceMan } from './serviceman.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface News {
  created_at: Date;
  title: string;
  detail?: string;
  id: number;
  id_service_man: number;
  last_image: Image;
  images?: Image[];
  service_man: ServiceMan;
  video?: string;
}
