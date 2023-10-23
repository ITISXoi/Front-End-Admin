import { getAddress } from 'ethers/lib/utils';
import bigDecimal from 'js-big-decimal';
import { toast } from 'react-hot-toast';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseJson = (str?: string | null) => {
  if (!str) return null;
  try {
    const data = JSON.parse(str);
    return data;
  } catch (err) {
    return null;
  }
};

/**
 * Add query to url, preserve old query, overriding can happen when `query` contains
 * key that is already in the url
 * @param strict Should exclude null/undefined value or not
 * @returns url after properly adding query
 */
export const addQueryToURL = (url: string, query: Record<string, any>, strict = false) => {
  const newURL = new URL(url);
  Object.keys(query)
    .filter((key) => (strict ? query[key] !== null && query[key] !== undefined : true))
    .forEach((key) => newURL.searchParams.set(key, query[key]));

  return newURL.toString();
};

/**
 * Replace current pathname with newPath, returns replaced url
 */
export const replacePathName = (url: string, newPath: string) => {
  const newURL = new URL(url);
  newURL.pathname = newPath;

  return newURL.toString();
};

export const getErrorMessage = (error: any) => {
  if (typeof error?.message === 'string') {
    return error.message;
  }

  if (typeof error?.message === 'object' && error?.message?.length > 0) {
    return error.message[0];
  }

  return JSON.stringify(error?.message);
};

export const handleErrorMutate = (err: any) => {
  toast.error(getErrorMessage(err));
};

export function shortenString(str: string, length = 10) {
  return str.substring(0, length) + '...' + str.substring(str.length - 10);
}

export function shortenAddress(address: string, length = 10): string {
  try {
    const formattedAddress = getAddress(address);
    return shortenString(formattedAddress, length);
  } catch {
    throw new TypeError("Invalid input, address can't be parsed");
  }
}

// export const convertToFormData = (data: Record<string, any>) => {
//   const bodyFormData = new FormData();
//   if (data) {
//     for (const [key, value] of Object.entries(data)) {
//       // bodyFormData.append(key, value || '')
//       /**
//        * If value is file list
//        */
//       if (value instanceof Array && value[0] && value[0] instanceof Blob) {
//         value.forEach((v) => {
//           bodyFormData.append(key, v);
//         });
//       } else {
//         bodyFormData.append(key, value || '');
//       }
//     }
//   }
//   return bodyFormData;
// };

export const convertToFormData = (data: Record<string, any>) => {
  const bodyFormData = new FormData();
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      // bodyFormData.append(key, value || '')
      /**
       * If value is file list
       */
      if (value instanceof Array && value[0] && value[0] instanceof Blob) {
        value.forEach((v) => {
          bodyFormData.append(key, v);
        });
      } else {
        if (value !== null && value !== '') bodyFormData.append(key, value || '');
      }
    }
  }
  return bodyFormData;
};

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ReturnType<T> = T extends true | undefined ? string : bigDecimal;

type Parameter = boolean | undefined;

const parseInput = (a: any, b: any) => {
  let firstNum = null;
  let secondNum = null;

  if (a instanceof bigDecimal) {
    firstNum = a;
  } else {
    firstNum = new bigDecimal(a);
  }

  if (b instanceof bigDecimal) {
    secondNum = b;
  } else {
    secondNum = new bigDecimal(b);
  }

  return [firstNum, secondNum];
};

export const multiply = <T extends Parameter>(a: any, b: any, pretty = true as T): ReturnType<T> => {
  const [firstNum, secondNum] = parseInput(a, b);
  const result = firstNum.multiply(secondNum);
  if (pretty) return result.getPrettyValue(undefined, undefined) as ReturnType<T>;
  return result as ReturnType<T>;
};

export const prettyNumber = (a: any) => new bigDecimal(a).getPrettyValue(undefined, undefined);
