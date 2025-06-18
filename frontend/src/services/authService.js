// Mock authentication service for testing
// This simulates API calls until the backend is ready

const MOCK_USERS = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  },
];

const MOCK_TOKEN = 'mock-jwt-token-12345';

export const authService = {
  // Mock login function
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      return {
        token: MOCK_TOKEN,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Mock register function
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      token: MOCK_TOKEN,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      }
    };
  },

  // Mock token validation
  async validateToken(token) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return token === MOCK_TOKEN;
  }
}; 