import { UserService } from '../../services/userService';
import { AdjutorService } from '../../services/adjutorService';
import { Users } from '../../models/User';
import bcrypt from 'bcrypt';

// Mock chainable database functions
const insertMock = jest.fn();
const whereMock = jest.fn();
const firstMock = jest.fn();

jest.mock('../../models/User', () => {
  return {
    Users: jest.fn(() => ({
      insert: insertMock,
      where: whereMock
    })),
    __mocks__: {
      insertMock,
      whereMock,
      firstMock
    }
  };
});

jest.mock('../../models/User', () => ({
  Users: jest.fn(() => ({
    insert: insertMock,
    where: whereMock,
    first: firstMock,
    increment: jest.fn()
  }))
}));

jest.mock('../../services/adjutorService', () => ({
  AdjutorService: {
    checkBlacklist: jest.fn()
  }
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password')
}));

describe('UserService', () => {
  describe('createUser', () => {
    it('should throw error for blacklisted user', async () => {
      (AdjutorService.checkBlacklist as jest.Mock).mockResolvedValue(true);
      
      await expect(
        UserService.createUser({
          name: 'Blacklisted User',
          email: 'blacklisted@example.com',
          password: 'password123'
        })
      ).rejects.toThrow('User is blacklisted');
    });

    it('should create user successfully', async () => {
       (AdjutorService.checkBlacklist as jest.Mock).mockResolvedValue(false);

      // Mock insert to return new user ID
      insertMock.mockResolvedValue([1]);

      // Mock Users().where().first() chain
      whereMock.mockReturnValue({
        first: firstMock.mockResolvedValue({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          balance: 0
        })
      });
      const user = await UserService.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(insertMock).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        balance: 0.0
      }));

      expect(user).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        balance: 0
      });
  });
});
});
