import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  form: FormGroup;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employeesFromDb => {
      this.employees = employeesFromDb.data;
    })
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({ // TODO: Add validations
      id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      name: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', [Validators.required, Validators.pattern(/^[\S]+$/)]]
    });
  }

  addEmployee(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const name = formValue.name;
      const newEmployee = {
        id: formValue.id,
        first_name: name.substring(0,name.indexOf(" ")),
        last_name: name.substring(name.indexOf(" ") + 1),
        email: formValue.email,
        avatar: formValue.avatar
      };
      this.employees.push(newEmployee);
    }
  }

  deleteEmployee(employee: Employee): void {
    const index = this.employees.indexOf(employee);
    this.employees.splice(index,1);
  }
}
