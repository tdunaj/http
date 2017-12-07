import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { SearchItem } from './search-item';

@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  search(term:string) {
    let test:string;
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      test = apiURL;
      console.log(apiURL);
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            console.log(res.json());
            //this.results = res.json().results;
            this.results = res.json().results.map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            
            resolve();
          },
          msg => { // Error
            console.log(msg);
            reject(msg);
          }
        );
    });

    console.log(test);
    return promise;
  }
}
