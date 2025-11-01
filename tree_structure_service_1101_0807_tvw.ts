// 代码生成时间: 2025-11-01 08:07:24
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TreeEntity } from './tree.entity'; // Assuming TreeEntity is defined elsewhere

import { CreateTreeDto } from './create-tree.dto'; // Assuming CreateTreeDto is defined elsewhere


// Exception class for tree structure errors
class TreeStructureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TreeStructureError';
  }
}

@Injectable()
export class TreeStructureService {
  constructor(
    @InjectRepository(TreeEntity)
    private readonly treeRepository: Repository<TreeEntity>,
  ) {}

  /**
   * Create a new tree node.
   * @param createTreeDto Data transfer object containing data to create a new tree node.
   */
  async createTreeNode(createTreeDto: CreateTreeDto): Promise<TreeEntity> {
    try {
      const newNode = await this.treeRepository.create(createTreeDto);
      return await this.treeRepository.save(newNode);
    } catch (error) {
      throw new TreeStructureError('Failed to create tree node: ' + error.message);
    }
  }

  /**
   * Find all tree nodes.
   */
  async findAll(): Promise<TreeEntity[]> {
    try {
      return await this.treeRepository.find();
    } catch (error) {
      throw new TreeStructureError('Failed to retrieve tree nodes: ' + error.message);
    }
  }

  /**
   * Find a tree node by its id.
   * @param id The id of the tree node to find.
   */
  async findTreeNodeById(id: number): Promise<TreeEntity> {
    try {
      const treeNode = await this.treeRepository.findOne(id);
      if (!treeNode) {
        throw new TreeStructureError('Tree node not found');
      }
      return treeNode;
    } catch (error) {
      throw new TreeStructureError('Failed to retrieve tree node by id: ' + error.message);
    }
  }

  /**
   * Update a tree node.
   * @param id The id of the tree node to update.
   * @param createTreeDto Data transfer object containing updates for the tree node.
   */
  async updateTreeNode(id: number, createTreeDto: CreateTreeDto): Promise<TreeEntity> {
    try {
      const existingNode = await this.findTreeNodeById(id);
      await this.treeRepository.update(id, createTreeDto);
      return await this.treeRepository.findOne(id);
    } catch (error) {
      throw new TreeStructureError('Failed to update tree node: ' + error.message);
    }
  }

  /**
   * Delete a tree node.
   * @param id The id of the tree node to delete.
   */
  async deleteTreeNode(id: number): Promise<void> {
    try {
      const existingNode = await this.findTreeNodeById(id);
      await this.treeRepository.remove(existingNode);
    } catch (error) {
      throw new TreeStructureError('Failed to delete tree node: ' + error.message);
    }
  }

  // Additional tree structure operations can be added here.
}
