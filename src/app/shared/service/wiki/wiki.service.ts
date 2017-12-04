import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../../app.config';

/**
 * fetch PhenoMeNal Wiki pages
 */
@Injectable()
export class WikiService {
  private gitRepoName = 'phenomenal-h2020.wiki';
  private baseUrl = '';
  private metadataUrl: string;
  private headUrl: string;

  constructor(private http: Http,
              private config: AppConfig) {
    this.metadataUrl = '/php-phenomenal-portal-wiki';
    if (config.getConfig('host') !== '') {
      this.baseUrl = config.getConfig('host') + ':' + config.getConfig('port');
      this.headUrl = this.baseUrl + this.metadataUrl;
    } else {
      this.headUrl = this.metadataUrl;
    }
  }

  /**
   * fetch the menu of wiki
   * @returns {Observable<string[]>}
   */
  loadMenu(): Observable<string[]> {
    const url = this.headUrl + '/wiki/controller.php?filename=' + this.gitRepoName + '&format=array';
    return this.http.get(url).map(this.extractData);
  }

  /**
   * fetch the user documentation menu
   * @returns {Observable<string[]>}
   */
  loadUserDocumentationMenu(): Observable<string[]> {
    const url = this.headUrl + '/wiki/menu.php?foldername=' + this.gitRepoName + '&filename=User-Documentation&format=array&limit=100';
    return this.http.get(url).map(this.extractData);
  }

  /**
   * fetch the developer documentation menu
   * @returns {Observable<string[]>}
   */
  loadDeveloperDocumentationMenu(): Observable<string[]> {
    const url = this.headUrl + '/wiki/menu.php?foldername=' + this.gitRepoName + '&filename=Developer-Documentation&format=array&limit=100';
    return this.http.get(url).map(this.extractData);
  }

  /**
   * fetch the tutorial menu
   * @returns {Observable<string[]>}
   */
  loadTutorialsMenu(): Observable<string[]> {
    const url = this.headUrl + '/wiki/menu.php?foldername=' + this.gitRepoName + '&filename=Tutorials&format=array&limit=100';
    return this.http.get(url).map(this.extractData);
  }

  /**
   * fetch the wiki page by id
   * @param id
   * @returns {Observable<{}>}
   */
  loadPage(id) {
    const url = this.headUrl + '/wiki/page.php?foldername=' + this.gitRepoName + '&filename=' + id + '&format=array&limit=3';
    return this.http.get(url).map(this.extractData);
  }

  /**
   * search a term in wiki
   * @param {string} term
   * @returns {Observable<{}>}
   */
  search(term: string) {
    const url = this.headUrl + '/wiki/search.php?term=' + term;

    const params = new URLSearchParams();
    params.set('search', term); // the user's search value

    // TODO: Add error handling
    return this.http
      .get(url)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

}
