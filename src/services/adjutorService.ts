import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AdjutorService {
  static async checkBlacklist(email: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${process.env.ADJUTOR_API_URL}/verify`,
        {
          params: { email },
          headers: { 'x-api-key': process.env.ADJUTOR_API_KEY! }
        }
      );
      
      return response.data.status === 'blacklisted';
    } catch (error) {
      console.error('Adjutor API error:', error);
      throw new Error('Blacklist verification service unavailable');
    }
  }
}