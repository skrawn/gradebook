import { Component, OnInit } from '@angular/core';

import { Class } from '../../models/class';
import { GradebookService } from '../../services/gradebook.service';
import { Student } from 'src/app/models/student';
import { Gradebook } from 'src/app/models/gradebook';
import { Assignment } from 'src/app/models/assignment';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {

  constructor(private grades: GradebookService) { }

  classInfo: Class;
  assignmentList: string[];
  students: Student[];
  gradebook: Gradebook;

  ngOnInit() {
    this.grades.getAll().forEach(next => {
      this.classInfo = next[0];
      this.assignmentList = this.classInfo.assignments;
      this.gradebook = {
        class: this.classInfo.name,
        assignments: this.classInfo.assignments,
        students: this.classInfo.students
      };

      // Map the list of the assignments to each student's grade on the assignment
      this.gradebook.students.forEach((student) => {
        this.gradebook.assignments.forEach((assignment, index) => {
          const gradedAssignment = student.assignments.filter((studentGrade) => (studentGrade.name === assignment));

          if (gradedAssignment.length === 0) {
            // Student does not have a grade for this assignment yet. Create an empty grade
            const newAssignment = { name: assignment, grade: '' };
            student.assignments.splice(index, 0, newAssignment);
          }
        });

        student.grade = this.calculateGrade(student);

        // TODO: Highlight student with failing grade (< 65)
      });
    });
  }

  private calculateGrade(student: Student): string {
    let grade = 0;
    let gradedAssignments = 0;
    student.assignments.forEach((assignment) => {
      if (assignment.grade !== '') {
        gradedAssignments++;
        grade += parseInt(assignment.grade, 10);
      }
    });

    if (gradedAssignments > 0) {
      return (grade / gradedAssignments).toString();
    } else {
      return '';
    }
  }

}
