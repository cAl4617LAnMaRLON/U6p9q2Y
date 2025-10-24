// 代码生成时间: 2025-10-24 14:51:00
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * HealthRecord entity for storing health monitoring data
 */
@Entity()
export class HealthRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patientId: string;

    @Column('float')
    heartRate: number;

    @Column('float')
    bloodPressure: number;

    @Column('float')
    oxygenSaturation: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}

/**
 * HealthMonitoringService for handling health monitoring operations
 */
export class HealthMonitoringService {
    /**
     * Saves a new health record
     * @param record The health record to be saved
     * @returns The saved health record with its ID
     */
    async saveHealthRecord(record: HealthRecord): Promise<HealthRecord> {
        try {
            const repository = getManager().getRepository(HealthRecord);
            return await repository.save(record);
        } catch (error) {
            console.error('Failed to save health record:', error);
            throw new Error('Failed to save health record');
        }
    }

    /**
     * Retrieves all health records for a specific patient
     * @param patientId The patient's ID
     * @returns An array of health records
     */
    async getHealthRecordsForPatient(patientId: string): Promise<HealthRecord[]> {
        try {
            const repository = getManager().getRepository(HealthRecord);
            return await repository.find({ where: { patientId } });
        } catch (error) {
            console.error('Failed to retrieve health records:', error);
            throw new Error('Failed to retrieve health records');
        }
    }
}

/**
 * HealthMonitoringController for handling HTTP requests related to health monitoring
 */
export class HealthMonitoringController {
    private healthService: HealthMonitoringService;

    constructor() {
        this.healthService = new HealthMonitoringService();
    }

    /**
     * Handles POST requests for saving a new health record
     * @param patientId The patient's ID
     * @param heartRate The heart rate
     * @param bloodPressure The blood pressure
     * @param oxygenSaturation The oxygen saturation
     * @returns The saved health record
     */
    async postHealthRecord(
        patientId: string,
        heartRate: number,
        bloodPressure: number,
        oxygenSaturation: number
    ): Promise<HealthRecord> {
        const record = new HealthRecord();
        record.patientId = patientId;
        record.heartRate = heartRate;
        record.bloodPressure = bloodPressure;
        record.oxygenSaturation = oxygenSaturation;

        return await this.healthService.saveHealthRecord(record);
    }

    /**
     * Handles GET requests for retrieving a patient's health records
     * @param patientId The patient's ID
     * @returns An array of health records
     */
    async getPatientHealthRecords(patientId: string): Promise<HealthRecord[]> {
        return await this.healthService.getHealthRecordsForPatient(patientId);
    }
}