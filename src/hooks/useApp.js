import { useContext } from 'react';
import { Context } from '../contexts/AppProvider';

function useApp() {
  const {indexer} = useContext(Context);
  return {indexer};
}

export default useApp;