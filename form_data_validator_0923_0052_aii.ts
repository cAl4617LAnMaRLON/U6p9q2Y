// 代码生成时间: 2025-09-23 00:52:41
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
# NOTE: 重要实现细节

// Define a simple DTO (Data Transfer Object) to validate form data.
class FormData {
    // Decorators for validation
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
# 添加错误处理
    email: string;
# NOTE: 重要实现细节
}

// Async function to validate form data
async function validateFormData(data: object): Promise<string | Error> {
    try {
        // Convert plain object to FormData class instance
        const formData = plainToInstance(FormData, data);

        // Validate the instance
        const errors = await validate(formData);

        // Check for validation errors
# NOTE: 重要实现细节
        if (errors.length > 0) {
            // If errors exist, map them to a string format for better readability
            const errorMessages = errors.map((error: ValidationError) => 
                Object.values(error.constraints).join(' ')
            ).join(', ');

            // Return the error messages
            return errorMessages;
# NOTE: 重要实现细节
        }

        // If no errors, return success message
        return 'Form data is valid.';
    } catch (error) {
        // Catch any unexpected errors
# 优化算法效率
        return error;
    }
}

// Export the validateFormData function for usage in other parts of the application.
export { validateFormData, FormData };
