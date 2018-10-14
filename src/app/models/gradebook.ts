import { Student } from './student';

export interface Gradebook {
    class: string;
    assignments: string[];
    students: Student[];
}
