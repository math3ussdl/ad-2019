import { Router, ActivatedRoute } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-person-update',
	templateUrl: './person-update.component.html',
	styleUrls: ['./person-update.component.scss'],
})
export class PersonUpdateComponent implements OnInit {
	person: Person;

	constructor(
		private personService: PersonService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.personService.readById(id).subscribe((person) => {
			this.person = person;
		});
  }

  updatePerson(): void {
    this.personService.update(this.person).subscribe(() => {
      this.personService.showMessage("Pessoa atualizada com sucesso!");
      this.router.navigate(["/persons"]);
    });
  }
  
  cancel(): void {
		this.router.navigate(['/persons']);
	}
}
