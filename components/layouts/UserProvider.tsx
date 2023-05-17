import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';

interface UserData {
  nick: string;
  scores: number;
  email: string;
  company: string | null | undefined;
}

interface UserContextProps {
  userData: UserData | null;
  setUser: (data: UserData | null) => void;
}

interface UserProviderProps {
  children: ReactNode;
  // Allow any additional props
  [key: string]: any;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<UserProviderProps> = ({ children, ...props }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session) {
          // Fetch user data using the session user ID
          const res = await fetch(`/api/get-user/${session.user.id}`);
          const data: UserData = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [session]);

  const setUser = (data: UserData | null) => {
    setUserData(data);
  };

  const contextValue: UserContextProps = {
    userData,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
