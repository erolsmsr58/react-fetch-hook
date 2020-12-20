import { useState } from 'react';
import IUseFetchProps from './Types';

/**
 * @param url @type {string}
 * @param method  @type {string}
 * @param headers @type {Record}
 * @param mode @type {'cors'|'navigate'|'no-cors'|'same-origin'}
 * @param data @type {Response}
 * 
 * @returns @type {Array}
 */
const useFetch = (
  url: string,
  method: string,
  headers: Record<string, string>,
  mode: 'cors'|'navigate'|'no-cors'|'same-origin',
  data: JSON
): IUseFetchProps => {

  const [status, setStatus] = useState<string>('idle');
  const [responseData, setData] = useState<Response|null>(null);
  const [error, setError] = useState<Response|null>(null);

  /**
   * @param formData @type {JSON}
   * 
   * @returns {void}
   */
  const fetchData = async (formData: JSON) => {
    setStatus('fetching');

    try {
      const response = await fetch(url, {
        method: method,
        mode: mode,
        headers: headers,
        body: JSON.stringify(formData)
      });

      setData(response);
      setStatus('fetched');
    } catch (error) {
      setError(error);
      setStatus('failed');
    }
  };

  /**
   * @returns {void}
   */
  const onSubmit = (): void => {
    fetchData(data);
  }

  return { onSubmit, setStatus, status, responseData, error };

};

export default useFetch;
