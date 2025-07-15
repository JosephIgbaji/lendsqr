# Wallet Service MVP

A Node.js wallet service with MySQL, KnexJS, and TypeScript.

## Features
- User account creation with blacklist verification
- Account funding
- Funds transfer between users
- Funds withdrawal
- Transaction history

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Run migrations: `npm run migrate`
5. Start server: `npm run dev`

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/users` | POST | Create new user |
| `/transactions/fund` | POST | Fund account |
| `/transactions/transfer` | POST | Transfer funds |
| `/transactions/withdraw` | POST | Withdraw funds |
| `/transactions/history` | GET | Get transaction history |
| `/transactions/balance` | GET | Get Authenticated user balance |

## Testing
Run unit tests: `npm test`