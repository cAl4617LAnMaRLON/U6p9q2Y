// 代码生成时间: 2025-10-04 21:28:49
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { TreeEntity } from './tree.entity';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';

/**
 * TreeService class that handles operations related to tree structure components.
 */
@Injectable()
export class TreeStructureService {

  constructor(
    @InjectRepository(TreeEntity)
    private treeRepository: TreeRepository<TreeEntity>,
  ) {}

  /**
   * Creates a new tree node.
   * @param createTreeDto contains the data for the new tree node.
   * @returns the created tree node.
   */
  async create(createTreeDto: CreateTreeDto): Promise<TreeEntity> {
    try {
      const newNode = this.treeRepository.create(createTreeDto);
      return await this.treeRepository.save(newNode);
    } catch (error) {
      throw new Error(`Failed to create new tree node: ${error.message}`);
    }
  }

  /**
   * Updates an existing tree node.
   * @param id the ID of the tree node to update.
   * @param updateTreeDto contains the updated data for the tree node.
   * @returns the updated tree node.
   */
  async update(id: number, updateTreeDto: UpdateTreeDto): Promise<TreeEntity> {
    try {
      const existingNode = await this.treeRepository.findOne(id);
      if (!existingNode) {
        throw new Error(`Tree node with ID ${id} not found`);
      }
      this.treeRepository.merge(existingNode, updateTreeDto);
      return await this.treeRepository.save(existingNode);
    } catch (error) {
      throw new Error(`Failed to update tree node: ${error.message}`);
    }
  }

  /**
   * Deletes a tree node and its children (if any).
   * @param id the ID of the tree node to delete.
   * @returns a message indicating the deletion status.
   */
  async remove(id: number): Promise<string> {
    try {
      await this.treeRepository.delete(id);
      return `Tree node with ID ${id} and its children have been deleted`;
    } catch (error) {
      throw new Error(`Failed to delete tree node: ${error.message}`);
    }
  }

  /**
   * Finds a tree node by its ID.
   * @param id the ID of the tree node to find.
   * @returns the found tree node.
   */
  async findOne(id: number): Promise<TreeEntity> {
    try {
      return await this.treeRepository.findOne(id, { relations: ['children'] });
    } catch (error) {
      throw new Error(`Failed to find tree node: ${error.message}`);
    }
  }

  /**
   * Finds all tree nodes.
   * @returns a list of all tree nodes.
   */
  async findAll(): Promise<TreeEntity[]> {
    try {
      return await this.treeRepository.findTrees();
    } catch (error) {
      throw new Error(`Failed to find all tree nodes: ${error.message}`);
    }
  }
}
