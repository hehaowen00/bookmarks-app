import { createContext, useState } from 'react';

export const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [context, setContext] = useState([]);

  const setCollections = (collections) => {
    setContext(collections);
  };

  const removeCollection = (collectionId) => {
    const collections = [...context];
    const idx = collections.findIndex(e => e.id == collectionId)
    collections.splice(idx, 1)
    setContext(collections);
  };

  const value = {
    context,
    setCollections,
    removeCollection,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  )
}
