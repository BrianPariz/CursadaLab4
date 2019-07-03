import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Person } from 'app/models/Person';
import { PersonService } from 'app/services/person.service';
import { CapturerVerificationComponent } from 'app/foreign/capturer-verification/capturer-verification.component';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  profileForm: FormGroup;
  person: Person;
  minDate: Date;
  maxDate: Date;
  personReadOnly: boolean;
  captureBiometry: boolean;

  @ViewChild(CapturerVerificationComponent, { static: false }) _capturerVerificationComponent: CapturerVerificationComponent;

  constructor(private fb: FormBuilder, private personService: PersonService, private ns: NotificationsService, private router: Router) {
    this.personReadOnly = false;
    this.captureBiometry = false;
    this.person = new Person();

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    this.minDate = new Date(year - 100, month, day);
    this.maxDate = new Date(year - 12, month, day);
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      licenseControl: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      identityNumberControl: [null, [Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      nationalityControl: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      passportNumberControl: [null, [Validators.pattern('^[a-zA-Z0-9]+$')]],
      firstNameControl: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      secondNameControl: [null, [Validators.pattern('^[a-zA-Z]+$')]],
      firstSurnameControl: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      secondSurnameControl: [null, [Validators.pattern('^[a-zA-Z]+$')]],
      birthDateControl: [null, [Validators.required]],
      genderControl: [null, [Validators.required]]
    });
  }

  receivePersonProfile($event) {
    this.resetEntireForm();
    this.person = $event;

    this.profileForm.get('licenseControl').setValue(this.person.id);
    this.profileForm.get('identityNumberControl').setValue(this.person.identityNumber);
    this.profileForm.get('nationalityControl').setValue(this.person.nationality);
    this.profileForm.get('passportNumberControl').setValue(this.person.passportNumber);
    this.profileForm.get('firstNameControl').setValue(this.person.firstName);
    this.profileForm.get('secondNameControl').setValue(this.person.secondName);
    this.profileForm.get('firstSurnameControl').setValue(this.person.firstSurname);
    this.profileForm.get('secondSurnameControl').setValue(this.person.secondSurname);
    this.profileForm.get('birthDateControl').setValue(this.person.birthDate);
    this.profileForm.get('genderControl').setValue(this.person.gender);

    if (this.person.validationOrigin != 0)
      this.personReadOnly = true;

    if (this.person.validationStatus == 0) {
      this.captureBiometry = true;
    }
  }

  hasImage(imgBase64: string) {
    return (imgBase64 != null && imgBase64.length > 50);
  }

  confirmPerson($event) {
    this.person.fingers = $event;
    this.person.id = this.profileForm.get('licenseControl').value;
    this.person.identityNumber = this.profileForm.get('identityNumberControl').value;
    this.person.nationality = this.profileForm.get('nationalityControl').value;
    this.person.passportNumber = this.profileForm.get('passportNumberControl').value;
    this.person.firstName = this.profileForm.get('firstNameControl').value;
    this.person.secondName = this.profileForm.get('secondNameControl').value;
    this.person.firstSurname = this.profileForm.get('firstSurnameControl').value;
    this.person.secondSurname = this.profileForm.get('secondSurnameControl').value;
    this.person.birthDate = this.profileForm.get('birthDateControl').value;
    this.person.gender = this.profileForm.get('genderControl').value;

    this.personService.Post(this.person).then(
      () => {
        this.ns.success('Persona registrada', 'Operación efectuada correctamente.');
        this.router.navigate(["/refresh"]).then(() => {
          this.router.navigate(["/foreign"]);
        });
      },
      () => {
        this.ns.error('No se pudo registrar la persona', 'Verifique los datos o intente nuevamente.');
      }).catch(() => {
        this.ns.error('No se pudo registrar la persona', 'Verifique los datos o intente nuevamente.');
      });
  }

  resetEntireForm() {
    this.personReadOnly = false;
    this.captureBiometry = false;
    this.person = new Person();
    this.profileForm.reset();
    this._capturerVerificationComponent.clear();
  }

  /******Form Control Getters******/

  get licenseControl() {
    return this.profileForm.get('licenseControl');
  }

  get identityNumberControl() {
    return this.profileForm.get('identityNumberControl');
  }

  get nationalityControl() {
    return this.profileForm.get('nationalityControl');
  }

  get passportNumberControl() {
    return this.profileForm.get('passportNumberControl');
  }

  get firstNameControl() {
    return this.profileForm.get('firstNameControl');
  }

  get secondNameControl() {
    return this.profileForm.get('secondNameControl');
  }

  get firstSurnameControl() {
    return this.profileForm.get('firstSurnameControl');
  }

  get secondSurnameControl() {
    return this.profileForm.get('secondSurnameControl');
  }

  get birthDateControl() {
    return this.profileForm.get('birthDateControl');
  }

  get genderControl() {
    return this.profileForm.get('genderControl');
  }

  /************************/
}