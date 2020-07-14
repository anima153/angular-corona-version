import { ICases } from './ICases';

  interface ICountryCount {
    count: number;
    result: {
      todaysDate: {
        [caseName: string]: ICases
      };
    };
  }