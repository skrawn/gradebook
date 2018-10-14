import { Assignment } from './assignment';

export interface Student {
    firstName: string;
    lastName: string;
    assignments: Assignment[];
    grade: string;
    letterGrade: string;
}
