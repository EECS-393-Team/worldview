import { Component, OnInit } from '@angular/core';
import { SitesService } from '../sites.service';
import { Site } from '../site';
import { Search } from '../search';
import { SITES } from '../mock-sites';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	sites: Site[];
  model = new Search("www.nytimes.com")
	constructor(private sitesService: SitesService) { }
	getSites(): void {
	  this.sitesService.getSites(this.model.url).subscribe(sites => this.sites = sites);
	  //this.sites = SITES;
	}

	ngOnInit() {
	}

	onSubmit() {
	 this.getSites()
	}

}
