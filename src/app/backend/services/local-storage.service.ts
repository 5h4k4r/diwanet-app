import { Injectable } from '@angular/core';
import { StorageKey } from './local-storage.keys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //#region Constructor
  constructor() { }
  //#endregion

  //#region Functions

  /**
   * Clears all the key/value pairs in the local storage, if there are any.
   */
  clear() {
    localStorage.clear();
  }

  /**
   * Removes a key/value pair from the local storage, if the key exists.
   */
  removeKey(key: StorageKey) {
    localStorage.removeItem(key);
  }

  /**
   * Saves a string value with a given key, replaces existing value if it exists.
   */
  setString(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Returns a string value with a given key, if such key does not exist, defaultValue or null will be returned.
   */
  getString(key: StorageKey, defaultValue?: string): string | null {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue ?? null;

    return value;
  }

  /**
   * Saves a boolean value with a given key, replaces existing value if it exists.
   */
  setBoolean(key: StorageKey, value: boolean) {
    if (typeof (value) !== 'boolean') throw new Error('Value must be of type boolean');

    localStorage.setItem(key, value ? '1' : '0');
  }

  /**
   * Returns a boolean value with a given key, if such key does not exist, defaultValue or false will be returned.
   */
  getBoolean(key: StorageKey, defaultValue?: boolean): boolean {
    if (defaultValue !== null && typeof (defaultValue) !== 'boolean') throw new Error('Default value must be of type boolean');

    const value = localStorage.getItem(key);
    if (value === null) return defaultValue ?? false;

    return value === '1';
  }

  /**
   * Saves a number value with a given key, replaces existing value if it exists.
   */
  setNumber(key: StorageKey, value: number) {
    if (typeof (value) !== 'number') throw new Error('Value must be of type number');

    localStorage.setItem(key, value.toString());
  }

  /**
   * Returns a number value with a given key, if such key does not exist, defaultValue or null will be returned.
   */
  getNumber(key: StorageKey, defaultValue?: number): number | null {
    if (defaultValue !== null && typeof (defaultValue) !== 'number') throw new Error('Default value must be of type number');

    const value = localStorage.getItem(key);
    if (value === null) return defaultValue ?? null;

    return Number(value);
  }

  /**
   * Converts an object to json string and saves it with a given key, replaces existing value if it exists.
   */
  setObject(key: StorageKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Returns an object value with a given key, if such key does not exist, defaultValue or null will be returned.
   */
  getObject(key: StorageKey, defaultValue?: any): any | null {

    const value = localStorage.getItem(key);
    if (value === null) return defaultValue ?? null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  }
  //#endregion
}
