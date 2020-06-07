/* Imports */

//Angular
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/* Componant configuration */
@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})

/* Componant class definition and export */
export class FormRegisterComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  // Declarations
  public formData: FormGroup;

  // Inject FormBuilder
  constructor(private FormBuilder: FormBuilder) {}

  // Method to reset form
  private resetForm = () => {
    this.formData = this.FormBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required]
    },{validator: this.checkPasswords});
  };

  // Specific method to check if both password are same
  // Normally it's better if it's a api side validation (to gain time for front-end dev)
  private checkPasswords = (form: FormGroup) => {
    return form.get('password').value === form.get('confirmPassword').value ? null : { notSame: true }
  }

  /* Start */
  ngOnInit() {
    this.resetForm();
  }
}
