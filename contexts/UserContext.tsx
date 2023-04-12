import { Children, createContext, FC, useState } from 'react'

interface User {
  id: number; 
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
})

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

