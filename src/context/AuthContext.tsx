
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define User type
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Define Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Mock users database for demo purposes
const MOCK_USERS: Record<string, User & { password: string }> = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      const emailExists = Object.values(MOCK_USERS).some(u => u.email === email);
      if (emailExists) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const id = `user_${Date.now()}`;
      const newUser: User & { password: string } = {
        id,
        name,
        email,
        password,
      };
      
      // Add to mock database
      MOCK_USERS[id] = newUser;
      
      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      // Store in localStorage
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Account created successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Find user by email
      const foundUser = Object.values(MOCK_USERS).find(u => u.email === email);
      
      // Check if user exists and password matches
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Store in localStorage
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Logged in successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to login';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    
    try {
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      // Update user
      const updatedUser = { ...user, ...data };
      
      // Update in mock database if exists
      if (user.id in MOCK_USERS) {
        MOCK_USERS[user.id] = { ...MOCK_USERS[user.id], ...data };
      }
      
      // Update current user
      setUser(updatedUser);
      
      // Update in localStorage
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => useContext(AuthContext);
