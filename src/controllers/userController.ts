// userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}