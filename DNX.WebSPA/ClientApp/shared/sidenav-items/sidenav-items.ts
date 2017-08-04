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

const ALL_ITEMS = DOCS.reduce((result, category) => result.concat(category.items), []);

@Injectable()
export class SideNavItems {
  getItemsInCategories(): DocCategory[] {
    return DOCS;
  }

  getAllItems(): DocItem[] {
    return ALL_ITEMS;
  }

  getItemById(id: string): DocItem {
    return ALL_ITEMS.find(i => i.id === id);
  }

  getCategoryById(id: string): DocCategory {
    return DOCS.find(c => c.id == id);
  }
}
