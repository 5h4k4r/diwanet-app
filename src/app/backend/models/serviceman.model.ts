import { Review } from './review.model';
import { User } from './user.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface ServiceMan extends User {
  address?: string;
  price: number;
  price_type: 'day' | 'hour';
  location: {
    id: number;
    name: string;
  };
  service_cat_id?: number;
  image?: string;
  lat?: number;
  long?: string;
  vip?: number;
  facebook?: string;
  instagram?: string;
  snapchat?: string;
  about?: string;
  user_id?: string;
  avg_rating?: Array<{
    id_service_man: string;
    rating: string;
  }>;
  review: Array<Review>;
}
