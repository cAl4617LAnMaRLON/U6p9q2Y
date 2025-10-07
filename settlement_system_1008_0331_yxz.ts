// 代码生成时间: 2025-10-08 03:31:21
import { createConnection } from 'typeorm';
import { Settlement } from './entities/Settlement';
import { User } from './entities/User';
import { Transaction } from './entities/Transaction';

// Connection configuration
const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'settlement_db',
  entities: [
    './dist/entities/*.js',
  ],
  synchronize: true,
};

// Establishing a database connection
export async function connectDatabase() {
  try {
    await createConnection(config);
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

// Settlement service
export class SettlementService {
  async createSettlement(userId: number, amount: number): Promise<Settlement> {
    try {
      // Find user by ID
      const user = await User.findOne(userId);
      if (!user) {
        throw new Error('User not found.');
      }

      // Create a new settlement
      const settlement = new Settlement();
      settlement.userId = userId;
      settlement.amount = amount;
      settlement.status = 'PENDING';

      // Save the settlement
      await settlement.save();
      return settlement;
    } catch (error) {
      throw error;
    }
  }

  async processSettlement(settlementId: number): Promise<Settlement> {
    try {
      // Find settlement by ID
      const settlement = await Settlement.findOne(settlementId);
      if (!settlement) {
        throw new Error('Settlement not found.');
      }

      // Process the settlement (update status)
      settlement.status = 'COMPLETED';
      await settlement.save();

      // Add a transaction record
      const transaction = new Transaction();
      transaction.settlement = settlement;
      transaction.amount = settlement.amount;
      transaction.status = 'COMPLETED';
      await transaction.save();

      return settlement;
    } catch (error) {
      throw error;
    }
  }
}

// Example usage
(async () => {
  await connectDatabase();
  const service = new SettlementService();
  try {
    const settlement = await service.createSettlement(1, 100);
    console.log('Settlement created:', settlement);
    const processedSettlement = await service.processSettlement(settlement.id);
    console.log('Settlement processed:', processedSettlement);
  } catch (error) {
    console.error('Error:', error);
  }
})();