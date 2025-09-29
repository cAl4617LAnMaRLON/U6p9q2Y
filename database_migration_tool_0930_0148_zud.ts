// 代码生成时间: 2025-09-30 01:48:25
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Migration } from 'typeorm/migration/Migration';

// 定义数据库迁移接口
interface IMigrationConfig {
  connectionString: string;
  migrationsDir: string;
}

// 定义数据库迁移工具类
class DatabaseMigrationTool {
  private config: IMigrationConfig;

  // 构造函数，接收数据库配置
  constructor(config: IMigrationConfig) {
    this.config = config;
  }

  // 连接数据库
  async connect() {
    try {
      await createConnection(
        this.config.connectionString,
        this.config.migrationsDir
      );
      console.log('Database connection established successfully.');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  // 执行数据库迁移
  async runMigration() {
    try {
      await new Migration()
        .up();
      console.log('Database migration completed.');
    } catch (error) {
      console.error('Failed to run database migration:', error);
      throw error;
    }
  }
}

// 使用示例
// 定义数据库配置
const dbConfig: IMigrationConfig = {
  connectionString: 'mysql://username:password@localhost:3306/your_database',
  migrationsDir: './migrations',
};

// 创建数据库迁移工具实例
const migrationTool = new DatabaseMigrationTool(dbConfig);

// 连接数据库并执行迁移
migrationTool.connect()
  .then(() => migrationTool.runMigration())
  .catch((error) => console.error('Migration error:', error));
