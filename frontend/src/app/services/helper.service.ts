import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Http, Headers, Jsonp} from '@angular/http';
import {AppLogger} from '../utils/AppLogger';
import {CustomRequest} from '../model/CustomRequest';
import {CustomResponse} from '../model/CustomResponse';
import {Location} from '@angular/common';
import 'rxjs/add/operator/map';
import {MatSnackBar} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HelperService {
  response: CustomResponse;

  constructor(private http: HttpClient,
              private router: Router, private location: Location, public snackBar: MatSnackBar) {
  }


  /**
   * For HTTP POST calls
   * @param {string} url URL of backend API
   * @param {CustomRequest} customRequest Request Data
   * @returns {Observable<CustomResponse>} CustomResponse
   */
  post(url: string, customRequest: CustomRequest): Observable<CustomResponse> {
    AppLogger.log('Custom Request=======> ', customRequest);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Allow-Cross-Origin', '*');
    const bodySend = JSON.parse(JSON.stringify(customRequest));
    return this.http.post<CustomResponse>(url, bodySend);
  }

  /**
   * For HTTP GET calls
   * @param {string} url
   * @returns {Observable<CustomResponse>}
   */
  get(url: string): Observable<CustomResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Allow-Cross-Origin', '*');
    return this.http.get(url).map(res => res);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goCodingPage() {
    this.router.navigate(['/code']);
  }

  /**
   * Clears all storage data - session and local.
   */
  clear() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  /**
   * Common Method to show snackbar on screen.
   * @param {string} msg Message to show.
   */
  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 6000,
    });
  }

}
