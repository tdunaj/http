import { Component } from '@angular/core';

import { SearchService } from "./search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loading: boolean = false;

  constructor(private itunes:SearchService) {}

  doSearch(term:string) {
    this.loading = true;
    this.itunes.search(term).then(() => this.loading = false);
  }
}
