import {Category} from './Category';
import {Task} from './Task';

export interface Content {
  categories: Category[];
  tasks: Task[];
}
