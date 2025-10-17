// 代码生成时间: 2025-10-17 19:03:36
import { createConnection, getConnectionOptions } from 'typeorm';
import { Caption } from './entity/Caption'; // Assuming Caption entity is defined in Caption.ts

/**
 * This service generates captions for the given text input.
 */
class CaptionGeneratorService {
  private static instance: CaptionGeneratorService;

  private constructor() {}

  public static getInstance(): CaptionGeneratorService {
    if (!CaptionGeneratorService.instance) {
      CaptionGeneratorService.instance = new CaptionGeneratorService();
    }
    return CaptionGeneratorService.instance;
  }

  /**
   * Connects to the database using TypeORM.
   */
  async connectDatabase(): Promise<void> {
    const options = await getConnectionOptions();
    await createConnection({ ...options, name: 'default' });
  }

  /**
   * Generates a caption for the given text.
   * @param text The text for which a caption needs to be generated.
   * @returns The generated caption or an error message.
   */
  async generateCaption(text: string): Promise<string> {
    try {
      // Assuming some logic to generate a caption based on the input text.
      // This is a placeholder and would need to be replaced with actual caption generation logic.
      const caption = `Caption for: ${text}`;
      await this.saveCaption(caption); // Save the generated caption to the database.
      return caption;
    } catch (error) {
      console.error('Error generating caption:', error);
      throw new Error('Failed to generate caption.');
    }
  }

  /**
   * Saves the caption to the database.
   * @param caption The caption to be saved.
   */
  private async saveCaption(caption: string): Promise<void> {
    const newCaption = Caption.create({ caption });
    await newCaption.save();
  }
}

export default CaptionGeneratorService.getInstance();