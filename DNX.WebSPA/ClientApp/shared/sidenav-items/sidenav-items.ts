import { DocCategory, DocItem } from './sidenav-items';
import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  examples?: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
}

const DOCS = [
  {
    id: 'app',
    name: 'Application Navigation',
    summary: '',
    items: [
      {id: 'home', name: 'Home', examples: ['autocomplete-overview']},
      {id: 'counter', name: 'Counter', examples: ['autocomplete-overview']},
      {id: 'fetch-data', name: 'Fetch data', examples: ['checkbox-configurable']}
    ]
  }
];

const ALL_ITEMS:Array<DocItem> = DOCS.reduce((result: Array<DocItem>, category: DocCategory) => result.concat(category.items), []);
const DEFAULT_ITEM: DocItem = {id: 'home', name: 'Home', examples: ['autocomplete-overview']};
@Injectable()
export class SideNavItems {
  getItemsInCategories(): DocCategory[] {
    return DOCS;
  }

  getAllItems(): DocItem[] {
    return ALL_ITEMS;
  }

  getItemById(id: string): DocItem {
    var result = ALL_ITEMS.find(i => i.id === id);
    return result ? result : DEFAULT_ITEM;
  }

  getCategoryById(id: string): DocCategory {
    var result = DOCS.find(c => c.id == id);
    return result ? result : DOCS[0];
  }
}
