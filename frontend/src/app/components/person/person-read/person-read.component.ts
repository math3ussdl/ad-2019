import { PersonService } from './../person.service';
import { Person } from './../person.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-read',
  templateUrl: './person-read.component.html',
  styleUrls: ['./person-read.component.scss']
})
export class PersonReadComponent implements OnInit {

  persons: Person[]
  displayedColumns = ['_id', 'firstName', 'lastName', 'email', 'friend', 'action']

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.read().subscribe(persons => {
      this.persons = persons;
    });
  }

}
