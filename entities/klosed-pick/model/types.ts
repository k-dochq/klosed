export interface KlosedPickItem {
  id: number;
  title: string;
  image: string;
}

export interface KlosedPickCategory {
  category: string;
  items: KlosedPickItem[];
}

export interface KlosedPicksData {
  title: string;
  categories: KlosedPickCategory[];
}
