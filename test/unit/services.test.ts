import { UserService } from '../../src/services/userService';
import { AdjutorService } from '../../src/services/adjutorService';
import { Users } from '../../src/models/User';
import bcrypt from 'bcrypt';

jest.mock('../../src/models/User', () => ({
  Users: jest.fn(() => ({
    insert: jest.fn(),
    where: jest.fn(),
    first: jest.fn(),
    increment: jest.fn()
  }))
}));

jest.mock('../../src/services/adjutorService', () => ({
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
      (Users().insert as jest.Mock).mockResolvedValue([{
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        balance: 0
      }]);
      
      const user = await UserService.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(user).toHaveProperty('id', 1);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });
  });
});