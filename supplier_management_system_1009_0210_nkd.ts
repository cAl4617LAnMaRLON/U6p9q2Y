// 代码生成时间: 2025-10-09 02:10:27
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Supplier } from './entity/Supplier';

// Database configuration
const config = {
    type: 'postgres', // or 'mysql', 'mariadb', 'sqlite', 'mssql', etc.
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    entities: [
        './dist/entity/**/*.js' // Adjust the path according to your project structure
    ],
    synchronize: true, // Set to false in production
    logging: false // Set to true in development for logging
};

// Create a connection to the database
createConnection(config).then(async connection => {
    /**
     * Create a new supplier
     * @param {string} name - The name of the supplier
     * @param {string} contactPerson - The contact person for the supplier
     * @returns {Promise<Supplier>} The newly created supplier
     */
    async function createSupplier(name: string, contactPerson: string): Promise<Supplier> {
        const supplier = new Supplier();
        supplier.name = name;
        supplier.contactPerson = contactPerson;
        try {
            await supplier.save(); // Save the supplier to the database
            return supplier; // Return the saved supplier
        } catch (error) {
            // Handle save errors
            console.error(error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    /**
     * Get all suppliers
     * @returns {Promise<Supplier[]>} An array of all suppliers
     */
    async function getAllSuppliers(): Promise<Supplier[]> {
        try {
            const suppliers = await Supplier.find(); // Find all suppliers in the database
            return suppliers; // Return the found suppliers
        } catch (error) {
            // Handle find errors
            console.error(error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    /**
     * Update a supplier's details
     * @param {number} id - The ID of the supplier to update
     * @param {string} name - The new name of the supplier
     * @param {string} contactPerson - The new contact person for the supplier
     * @returns {Promise<Supplier>} The updated supplier
     */
    async function updateSupplier(id: number, name: string, contactPerson: string): Promise<Supplier> {
        const supplier = await Supplier.findOne(id); // Find the supplier by ID
        if (!supplier) {
            throw new Error('Supplier not found'); // Throw an error if the supplier is not found
        }
        supplier.name = name;
        supplier.contactPerson = contactPerson;
        try {
            await supplier.save(); // Save the updated supplier
            return supplier; // Return the updated supplier
        } catch (error) {
            // Handle save errors
            console.error(error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    /**
     * Delete a supplier
     * @param {number} id - The ID of the supplier to delete
     * @returns {Promise<void>} A promise that resolves when the supplier is deleted
     */
    async function deleteSupplier(id: number): Promise<void> {
        const supplier = await Supplier.findOne(id); // Find the supplier by ID
        if (!supplier) {
            throw new Error('Supplier not found'); // Throw an error if the supplier is not found
        }
        try {
            await supplier.remove(); // Remove the supplier from the database
        } catch (error) {
            // Handle removal errors
            console.error(error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Example usage
    (async () => {
        try {
            const supplier = await createSupplier('Acme Corp', 'John Doe');
            console.log('Supplier created:', supplier);
            
            const allSuppliers = await getAllSuppliers();
            console.log('All suppliers:', allSuppliers);
            
            supplier.name = 'Acme Industries';
            supplier.contactPerson = 'Jane Smith';
            const updatedSupplier = await updateSupplier(supplier.id, supplier.name, supplier.contactPerson);
            console.log('Supplier updated:', updatedSupplier);
            
            await deleteSupplier(updatedSupplier.id);
            console.log('Supplier deleted');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    })();

}).catch(error => console.log('TypeORM connection error:', error));
