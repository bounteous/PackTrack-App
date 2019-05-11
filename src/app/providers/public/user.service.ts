// Modules
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
// rxjs
import { Observable } from "rxjs";
// Models
import { UserFront } from "../../models/user-front.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.server.host + environment.server.port;
  }

  public login(user: UserFront): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/login", user);
  }

  public signup(user: UserFront): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/signup", user);
  }
}
