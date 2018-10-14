import { Student } from './student';
import { AssignmentSummary } from './assignment-summary';

export interface Gradebook {
    class: string;
    assignments: AssignmentSummary[];
    students: Student[];
}
