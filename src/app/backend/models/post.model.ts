/* eslint-disable @typescript-eslint/naming-convention */

import { Category } from './category.model';

export interface Post {
  id?: number;
  customer_id?: number;
  category_id?: number;
  detail?: string;
  created_at?: Date;
  service_category?: Category;
}
