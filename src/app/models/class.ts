import { Student } from './student';

export interface Class {
    name: string;
    assignments: string[];
    students: Student[];
}
