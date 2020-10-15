import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from 'src/app/components/person/person.model';
import { PersonService } from 'src/app/components/person/person.service';

@Component({
	selector: 'app-person-crud',
	templateUrl: './person-crud.component.html',
	styleUrls: ['./person-crud.component.scss'],
})
export class PersonCrudComponent implements OnInit {
	persons: Person[];

	constructor(
		private router: Router,
		private headerService: HeaderService,
		private personService: PersonService
	) {
		headerService.headerData = {
			title: 'Cadastro de Pessoas',
			icon: 'person',
			routeUrl: '/persons',
		};
	}

	ngOnInit(): void {
		this.personService.read().subscribe((persons) => {
			this.persons = persons;
		});
	}

	navigateToPersonCreate(): void {
		this.router.navigate(['/persons/create']);
	}

	newSort(): void {
		if (this.persons.length <= 1) {
			this.personService.showMessage(
				'É preciso ter mais de um usuário para que o sorteio seja realizado!',
				false,
				true
			);
		} else {
			this.personService.raffle().subscribe(() => {
        this.personService.showMessage('Sorteio realizado com sucesso!');
        location.reload();
			});
		}
	}
}
