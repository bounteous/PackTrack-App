// Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// rxjs
import { Observable } from 'rxjs';
// Models
import { DealerFront } from '../../models/dealer-front.model';
import { DealerBack } from '../../models/dealer-back.model';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  private apiUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = environment.server.host + environment.server.port;
  }

  public login(dealer: DealerFront): Observable<DealerBack> {
    return this.httpClient
      .post(this.apiUrl + '/login', dealer);
  }

  public signup(dealer: DealerFront): Observable<DealerBack> {
    return this.httpClient
      .post(this.apiUrl + '/signup', dealer);
  }
}
