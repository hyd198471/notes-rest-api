import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Notebook } from "./notebook";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { objectClone } from "../vendor/types/object.type";
import { errorDefault } from "../vendor/rxjs/error-default.op";

@Injectable({ providedIn: 'root' })
export class NotebookService {
    private http: HttpClient = inject(HttpClient);

   createNoteBook(noteBook: Notebook): Observable<Notebook> {
     return this.http.post<Notebook>(`${environment.noteBooksBackendUrl}`, objectClone(noteBook)).pipe(errorDefault())
   }

}


