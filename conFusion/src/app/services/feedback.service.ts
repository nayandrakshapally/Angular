import { Injectable } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';


import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular'

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {

  constructor(private http: Http,
  private restangular: Restangular,
              private processHTTPMsgService: ProcessHttpmsgService) { }

 getFeedback(): Observable<Feedback[]> {
    return this.restangular.all('Feedback').getList();
  }
  postFeedback(data): Observable<Feedback[]> {
     console.log("test",data);
    return this.restangular.all('Feedback').post(data);
  }

}
