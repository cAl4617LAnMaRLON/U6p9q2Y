// 代码生成时间: 2025-10-04 02:41:28
import { createConnection } from 'typeorm';
import { CareerPlan } from './entity/CareerPlan';
import { User } from './entity/User';

// Database configuration
const dbConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'career_planning_db',
  entities: [
    './dist/entity/**/*.js',
  ],
  synchronize: true,
};

// Establish database connection
createConnection(dbConfig).then(async connection => {
  // Entities are now mapped and can be used.
  console.log('Database connected successfully.');

  // Example usage: Adding a new career plan
  try {
    const careerPlan = new CareerPlan();
    careerPlan.title = 'Software Developer';
    careerPlan.description = 'Plan to become a Software Developer';
    careerPlan.user = await connection.getRepository(User).findOne(1);
    await connection.manager.save(careerPlan);
    console.log('Career plan created successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }

  // Example usage: Retrieving all career plans for a user
  try {
    const user = await connection.getRepository(User).findOne(1);
    if (user) {
      const plans = await connection.getRepository(CareerPlan).find({ where: { user } });
      console.log('User career plans:', plans);
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }

}).catch(error => console.log('Error connecting to the database:', error));

// Entity: User
// Represents a user in the career planning system.
export class User {
  id: number;
  name: string;
  /*
   * Adds a career plan to the user's list of plans.
   */
  async addCareerPlan(careerPlan: CareerPlan): Promise<void> {
    this.careerPlans.push(careerPlan);
    await careerPlan.save();
  }
  /*
   * Retrieves all career plans associated with the user.
   */
  async getCareerPlans(): Promise<CareerPlan[]> {
    return await CareerPlan.find({ where: { user: this } });
  }
}

// Entity: CareerPlan
// Represents a career plan in the career planning system.
export class CareerPlan {
  id: number;
  title: string;
  description: string;
  /*
   * The user associated with this career plan.
   */
  user: User;
  /*
   * Adds a new milestone to the career plan.
   */
  async addMilestone(milestone: Milestone): Promise<void> {
    this.milestones.push(milestone);
    await milestone.save();
  }
  /*
   * Retrieves all milestones associated with the career plan.
   */
  async getMilestones(): Promise<Milestone[]> {
    return await Milestone.find({ where: { careerPlan: this } });
  }
}

// Entity: Milestone
// Represents a milestone in a career plan.
export class Milestone {
  id: number;
  title: string;
  description: string;
  /*
   * The career plan associated with this milestone.
   */
  careerPlan: CareerPlan;
}
