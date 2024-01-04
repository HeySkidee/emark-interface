import { createContext, useEffect, useState } from 'react';
import { getIndexerStats } from "../../services/indexer";

export const Context = createContext({});

function AppProvider({children}) {
  const [indexer, setIndexer] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const msg = await getIndexerStats()
        if (msg.data.code === 0) {
          setIndexer(msg.data.data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    setTimeout(fetch)
    const inc = setInterval(fetch, 1000 * 10)
    return () => clearInterval(inc)
  }, []);

  const value = {indexer};
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export default AppProvider;