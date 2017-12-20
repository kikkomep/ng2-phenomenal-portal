import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../../app.config';

/**
 * Control user metadata
 */
@Injectable()
export class UserService {
  private baseUrl = window.location.protocol + '//';
  private metadataUrl = '/api/v1/metadata';
  private headUrl: string;
  private currentUser;

  // 
  private currentUserSource = new Subject<{}>();
  public currentUserObservable = this.currentUserSource.asObservable();

  constructor(private http: Http,
              private authService: AuthService,
              private config: AppConfig) {
    this.baseUrl += config.getConfig('host') ? config.getConfig('host') : window.location.hostname;
    this.baseUrl += ':' + (config.getConfig('port') ? config.getConfig('port') : window.location.port);
    this.headUrl = this.baseUrl + this.metadataUrl;
  private notifyUser() {
    this.currentUserSource.next(this.currentUser);
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(userInfo: any) {
    console.log("Call to 'setCurrentUser'");
    this.currentUser = userInfo ? new User(userInfo) : null;
    this.notifyUser();
  }
  /**
   * get user metadata by id
   * @param {string} id
   * @returns {Observable<string[]>}
   */
  get(id: string): Observable<string[]> {
    const url = this.headUrl + '/' + id;
    return this.http.get(url).map(this.extractData);
  }

  /**
   * add user metadata
   * @param {string} id
   * @returns {Observable<string[]>}
   */
  add(id: string): Observable<string[]> {
    const url = this.headUrl;
    const data = {Idmetadata: id, Isaccepttermcondition: 1, Isregistergalaxy: 0};

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = new RequestOptions({headers: headers}); // Create a request option

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Metadata', JSON.stringify(data));

    return this.http.post(url, urlSearchParams.toString(), options).map(this.extractData);
  }

  /**
   * update a user metadata
   * @param {string} id
   * @returns {Observable<string[]>}
   */
  updateTermCondition(id: string): Observable<string[]> {
    const url = this.headUrl;
    const data = {Idmetadata: id, Isaccepttermcondition: 1, Isregistergalaxy: 0};

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = new RequestOptions({headers: headers}); // Create a request option

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Metadata', JSON.stringify(data));

    return this.http.put(url, urlSearchParams.toString(), options).map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
