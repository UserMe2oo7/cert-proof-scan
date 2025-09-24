import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkUser = () => {
      const savedUser = localStorage.getItem('eduauth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // TODO: Replace with Supabase authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      fullName: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user'
    };
    
    setUser(mockUser);
    localStorage.setItem('eduauth_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    
    // TODO: Replace with Supabase authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      fullName,
      role: 'user'
    };
    
    setUser(mockUser);
    localStorage.setItem('eduauth_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduauth_user');
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};