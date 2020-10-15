import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
	selector: 'app-person-create',
	templateUrl: './person-create.component.html',
	styleUrls: ['./person-create.component.scss'],
})
export class PersonCreateComponent implements OnInit {
	person: Person = {
    firstName: '',
    lastName: '',
		email: null,
	};

	constructor(private personService: PersonService, private router: Router) {}

	ngOnInit(): void {}

	createPerson(): void {
		this.personService.create(this.person).subscribe(() => {
			this.personService.showMessage('Pessoa criada com sucesso!');
			this.router.navigate(['/persons']);
		});
  }
  
  cancel(): void {
    this.router.navigate(['/persons']);
  }
}
