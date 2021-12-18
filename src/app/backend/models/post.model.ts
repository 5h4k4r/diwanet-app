/* eslint-disable @typescript-eslint/naming-convention */

import { Category } from './category.model';
import { Comment } from './comment.model';

export interface Post {
  id?: number;
  customer_id?: number;
  category_id?: number;
  detail?: string;
  created_at?: Date;
  service_category?: Category;
  post_comment?: Comment[];
}
