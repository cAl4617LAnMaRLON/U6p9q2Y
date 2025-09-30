// 代码生成时间: 2025-10-01 01:33:46
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

// 定义用户和产品之间的评分实体
@Entity()
class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  score: number;
}

// 推荐系统的接口，定义推荐逻辑
interface IRecommendationSystem<T> {
  recommend(user: T): Promise<T[]>;
}

// 简单的推荐系统实现，基于用户评分
class SimpleRecommendationSystem implements IRecommendationSystem<User> {
  private userRepository: typeof User;
  private productRepository: typeof Product;

  constructor(userRepository: typeof User, productRepository: typeof Product) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }

  // 根据用户的历史评分推荐产品
  async recommend(user: User): Promise<Product[]> {
    try {
      // 获取用户评分过的所有产品
      const ratings = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.ratings', 'rating')
        .where('user.id = :userId', { userId: user.id })
        .getMany();

      // 计算评分的平均值来确定用户偏好的产品类型
      const averageRating = ratings.map(r => r.rating.score).reduce((sum, score) => sum + score, 0) / ratings.length;

      // 推荐评分高于平均值且用户未评分的产品
      const recommendedProducts = await this.productRepository.createQueryBuilder('product')
        .where('product.id NOT IN (:...productIds)', { productIds: ratings.map(r => r.rating.productId) })
        .andWhere('product.averageRating > :averageRating', { averageRating })
        .getMany();

      return recommendedProducts;
    } catch (error) {
      console.error('Error recommending products:', error);
      throw error;
    }
  }
}

// 定义 User 实体
@Entity()
class User extends Rating {
  // 使用继承来自Rating类的字段

  @Column()
  username: string;

  // 用户和产品之间的多对多关系
  @ManyToMany(() => Product, 'ratings')
  @JoinTable()
  products: Product[];
}

// 定义 Product 实体
@Entity()
class Product extends Rating {
  // 使用继承来自Rating类的字段

  @Column()
  name: string;

  // 计算产品的平均评分
  get averageRating(): number {
    return this.ratings.reduce((sum, rating) => sum + rating.score, 0) / this.ratings.length;
  }
}

// 示例：如何使用 SimpleRecommendationSystem
// const userRepository = getRepository(User);
// const productRepository = getRepository(Product);
// const recommendationSystem = new SimpleRecommendationSystem(userRepository, productRepository);
// recommendationSystem.recommend(user).then(recommendedProducts => {
//   console.log('Recommended Products:', recommendedProducts);
// });
