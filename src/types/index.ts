import { IconType } from 'react-icons';

export interface Lure {
  name: string;
  values: number[];
}

export interface LureCategory {
  name: string;
  lures: Lure[];
}

export interface Bait {
  name: string;
  values: number[];
}

export interface Season {
  name: string;
  icon: IconType;
}

export interface FishRating {
  name: string;
  value: number;
}
