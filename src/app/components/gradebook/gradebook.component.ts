import { Component, OnInit } from '@angular/core';

import { Class } from '../../models/class';
import { GradebookService } from '../../services/gradebook.service';
import { Student } from 'src/app/models/student';
import { Gradebook } from 'src/app/models/gradebook';
import { AssignmentSummary } from 'src/app/models/assignment-summary';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {

  constructor(private grades: GradebookService) { }

  classInfo: Class;
  students: Student[];
  gradebook: Gradebook;

  ngOnInit() {
    this.grades.getAll().forEach(next => {
      this.classInfo = next[0];
      const assignmentSummary: AssignmentSummary[] = [];
      this.classInfo.assignments.forEach((assignment) => {
        const assignSum: AssignmentSummary = {
          name: assignment,
          minGrade: '',
          maxGrade: '',
          avgGrade: '0',
          numGrades: 0
        };

        assignmentSummary.push(assignSum);
      });
      this.gradebook = {
        class: this.classInfo.name,
        assignments: assignmentSummary,
        students: this.classInfo.students
      };

      // Map the list of the assignments to each student's grade on the assignment
      this.gradebook.students.forEach((student) => {
        this.gradebook.assignments.forEach((assignment, index) => {
          const gradedAssignment = student.assignments.filter((studentGrade) => (studentGrade.name === assignment.name));

          if (gradedAssignment.length === 0) {
            // Student does not have a grade for this assignment yet. Create an empty grade
            const newAssignment = { name: assignment.name, grade: '' };
            student.assignments.splice(index, 0, newAssignment);
          } else {
            // Calculate min, max and average of assignments
            const assignSum = this.gradebook.assignments.filter((asum) => (asum.name === assignment.name));
            if (assignSum.length > 0) {
              if (assignSum[0].maxGrade === '') {
                assignSum[0].maxGrade = gradedAssignment[0].grade;
              } else if (parseInt(assignSum[0].maxGrade, 10) < parseInt(gradedAssignment[0].grade, 10)) {
                assignSum[0].maxGrade = gradedAssignment[0].grade;
              }

              if (assignSum[0].minGrade === '') {
                assignSum[0].minGrade = gradedAssignment[0].grade;
              } else if (parseInt(assignSum[0].minGrade, 10) > parseInt(gradedAssignment[0].grade, 10)) {
                assignSum[0].minGrade = gradedAssignment[0].grade;
              }

              assignSum[0].avgGrade = (parseInt(assignSum[0].avgGrade, 10) +
                parseInt(gradedAssignment[0].grade, 10)).toString();
              assignSum[0].numGrades++;

            } else {
              console.log('Missing assignment name in assignment summary');
            }
          }
        });

        student.grade = this.calculateGrade(student);
        this.gradebook.assignments.forEach((assignment) => {
          if (assignment.numGrades === 0) {
            assignment.avgGrade = '';
          } else {
            assignment.avgGrade = (parseInt(assignment.avgGrade, 10) /
              assignment.numGrades).toString();
          }
        });

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
