import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Person } from './person.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PersonService {
	baseUrl = 'http://localhost:4000/persons';

	constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

	showMessage(
		msg: string,
		isError: boolean = false,
		isWarn: boolean = false
	): void {
		this.snackBar.open(msg, 'X', {
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: isError
				? ['msg-error']
				: isWarn
				? ['msg-warn']
				: ['msg-success'],
		});
	}

	create(person: Person): Observable<Person> {
		return this.http.post<Person>(this.baseUrl, person).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	read(): Observable<Person[]> {
		return this.http.get<Person[]>(this.baseUrl).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	readById(id: string): Observable<Person> {
		const url = `${this.baseUrl}/${id}`;
		return this.http.get<Person>(url).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	update(person: Person): Observable<Person> {
		const url = `${this.baseUrl}/${person._id}`;
		return this.http.put<Person>(url, person).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	delete(id: string): Observable<Person> {
		const url = `${this.baseUrl}/${id}`;
		return this.http.delete<Person>(url).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	raffle(): Observable<Person> {
		const url = `${this.baseUrl}/raffle`;
		return this.http.post<Person>(url, {}).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		);
	}

	errorHandler(e: any): Observable<any> {
		this.showMessage('Ocorreu um erro!', true);
		console.log(e);
		return EMPTY;
	}
}
