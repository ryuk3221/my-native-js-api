import { Database } from "sqlite3";

export interface ItemsModelProps {
  database: Database
}

export interface ItemProps {
  name: string;
  description: string;
}

export interface ItemUpdateProps extends ItemProps {
  id: number;
}
