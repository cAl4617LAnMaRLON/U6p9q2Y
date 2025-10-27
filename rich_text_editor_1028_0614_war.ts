// 代码生成时间: 2025-10-28 06:14:12
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rich_texts')
export class RichText {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;
}

import { createConnection } from 'typeorm';
import { RichText } from './RichText';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Connects to the database and initializes the RichTextEditor.
 * @returns Promise<void>
 */
async function initEditor(): Promise<void> {
    try {
        const connection = await createConnection({
            type: 'sqlite',
            database: './database.sqlite',
            entities: [
                path.join(__dirname, './entity/*.js'),
            ],
            synchronize: true,
            logging: false,
        });

        console.log('Database connected and entities synchronized.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

/**
 * Creates a new rich text entry in the database.
 * @param content The content of the rich text to be saved.
 * @returns Promise<RichText>
 */
async function createRichText(content: string): Promise<RichText> {
    const richText = new RichText();
    richText.content = content;
    try {
        await initEditor();
        return await richText.save();
    } catch (error) {
        console.error('Error creating rich text:', error);
        throw error;
    }
}

/**
 * Retrieves a rich text entry from the database by its ID.
 * @param id The ID of the rich text to retrieve.
 * @returns Promise<RichText | undefined>
 */
async function getRichTextById(id: number): Promise<RichText | undefined> {
    try {
        await initEditor();
        return await RichText.findOne(id);
    } catch (error) {
        console.error('Error retrieving rich text by ID:', error);
        throw error;
    }
}

/**
 * Updates a rich text entry in the database.
 * @param id The ID of the rich text to update.
 * @param content The new content of the rich text.
 * @returns Promise<RichText>
 */
async function updateRichText(id: number, content: string): Promise<RichText> {
    const richText = await getRichTextById(id);
    if (richText) {
        richText.content = content;
        try {
            await initEditor();
            return await richText.save();
        } catch (error) {
            console.error('Error updating rich text:', error);
            throw error;
        }
    } else {
        throw new Error('Rich text not found.');
    }
}

/**
 * Deletes a rich text entry from the database by its ID.
 * @param id The ID of the rich text to delete.
 * @returns Promise<void>
 */
async function deleteRichText(id: number): Promise<void> {
    const richText = await getRichTextById(id);
    if (richText) {
        try {
            await initEditor();
            await richText.remove();
        } catch (error) {
            console.error('Error deleting rich text:', error);
            throw error;
        }
    } else {
        throw new Error('Rich text not found.');
    }
}

// Example usage:
async function main() {
    await createRichText('<p>Hello, world!</p>');
    const richText = await getRichTextById(1);
    console.log('Retrieved rich text:', richText);
    await updateRichText(1, '<p>Hello, updated world!</p>');
    await deleteRichText(1);
}

main();