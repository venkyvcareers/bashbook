import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/internal/Observable";
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { environment } from "src/environments/environment";
import { LoginModel } from "../models/global-models";

@Injectable()
export class ApiService {

    options: RequestOptions;
    tokenOptions: RequestOptions;
    nonAuthoptions: RequestOptions;
    token: string;
    baseurl: string = '';
    userId: number;
    constructor(private http: Http, private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {

        this.baseurl = environment.apiUrl;

        // Token request headers
        const tokenheader = new Headers();
        tokenheader.append('content-type', 'application/x-www-form-urlencoded');
        this.tokenOptions = new RequestOptions({ headers: tokenheader });

        // Non Auth Http request headers
        const nonAuthheaders = new Headers();
        nonAuthheaders.append('content-type', 'application/json');
        this.nonAuthoptions = new RequestOptions({ headers: nonAuthheaders });

        // Http request headers
        const headers = new Headers();
        headers.append('content-type', 'application/json');

        //this.token = this.localStorage.retrieve('access-token');
        this.token = "Y0_qzpfBQSkX-Pt4BGgdElYGOZOBPscjwya1t6f_tpkM8tL7L9A7sNdYZ2frt1-9epJn50sRaNTBvDTPW9UNJAXZAbrOw1xhWZyEJ0mWt1cpbfOSR_YglRNdFtOkcbbTLWFpabuv_9Kp9ZU85-vbIAlgWg28ydVSi18mxj0nODaoAQO8y3foxT-PglvMRuTwNiGnRWt7ciBcazKEHXDAMJH7L2XpghgKQY61ReRxBS2cMFwhe1PRoBaehoblUIZpfz2KVw-vKLvrTmz66WHEBn_WrnEu6lvYJ-fshFy4STgxgs0k1JeyCQFMakGeYBJQvvZgw04QbRqH_2mQIQpsFogLs0r2s52xz55Q-pQi3pti90bLMoN76SXZ_yLkAjIvYfIXT2cSryKdnBLaZErL9N7DYeV5inW-41SpLRpdwJkBRIhbxY0apLUJJkuNEWE8Dt3vGrd1WZV5HQXa2CbiR75iUDtW1kfQcnglCV5aoXo";
        this.userId = this.localStorage.retrieve('userId');

        if (this.token) {
            headers.append('authorization', 'Bearer ' + this.token);
            this.options = new RequestOptions({ headers: headers });
        }
        else {
            this.token = this.sessionStorage.retrieve('access-token');

            if (this.token) {
                headers.append('authorization', 'Bearer ' + this.token);
                this.options = new RequestOptions({ headers: headers });
            }
            else {
                // todo 
            }
        }

    }

    login(model: LoginModel):Observable<any> {
        var data = "username=" + model.UserName + "&password=" + model.Password + "&grant_type=password"
        return this.http.post(environment.tokenUrl, data, this.options);
    }

    get(url: string): Observable<any> {
        return this.http.get(this.baseurl + url, this.options);
    }

    getByUserId(url: string): Observable<any> {
        return this.http.get(this.baseurl + url + '/' + this.userId, this.options);
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(this.baseurl + url, data, this.options);
    }

    nonAuthPost(url: string, data: any): Observable<any> {
        return this.http.post(this.baseurl + url, data, this.nonAuthoptions);
    }
}