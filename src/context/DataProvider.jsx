import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth }  from "../config/firebase";

const DataContext = createContext({});

export const DataProvider =  ({ children }) => { 
  const [user, setUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser) {
        setUser(authUser.email)
      } else {
        setUser(null)
      }
    })
  })
  return (
    <DataContext.Provider value={{ user, setUser }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContext;