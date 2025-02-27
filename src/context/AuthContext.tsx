import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

// Mock data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@artgallery.com',
    isAdmin: true,
    likedArtworks: ['1', '3']
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    isAdmin: false,
    likedArtworks: ['2']
  }
];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleLike: (artworkId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      username,
      email,
      isAdmin: false,
      likedArtworks: []
    };

    // Add to mock users (in a real app, this would be an API call)
    MOCK_USERS.push(newUser);
    
    // Log in the new user
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('user');
  };

  const toggleLike = (artworkId: string) => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user };
    const likedIndex = updatedUser.likedArtworks.indexOf(artworkId);

    if (likedIndex === -1) {
      updatedUser.likedArtworks.push(artworkId);
    } else {
      updatedUser.likedArtworks.splice(likedIndex, 1);
    }

    setAuthState({
      ...authState,
      user: updatedUser
    });
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      register, 
      logout,
      toggleLike
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};