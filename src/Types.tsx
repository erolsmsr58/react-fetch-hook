import { Dispatch, SetStateAction } from 'react';

type IUseFetchProps = { 
  onSubmit: () => void,
  setStatus: Dispatch<SetStateAction<string>>,
  status: string,
  responseData: Response|null,
  error: Response|null
}

export default IUseFetchProps;
