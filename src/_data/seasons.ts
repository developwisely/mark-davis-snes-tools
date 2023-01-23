import {
  FaCalendarCheck,
  FaCanadianMapleLeaf,
  FaLeaf,
  FaSnowflake,
  FaSun,
  FaTrophy,
} from 'react-icons/fa';

import { Season } from '../types';

export const seasonsData: Season[] = [
  {
    name: 'All Seasons',
    icon: FaCalendarCheck,
  },
  {
    name: 'Spring',
    icon: FaLeaf,
  },
  {
    name: 'Summer',
    icon: FaSun,
  },
  {
    name: 'Fall',
    icon: FaCanadianMapleLeaf,
  },
  {
    name: 'Winter 1',
    icon: FaSnowflake,
  },
  {
    name: 'Winter 2',
    icon: FaSnowflake,
  },
  {
    name: 'Championship',
    icon: FaTrophy,
  },
];
