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
  ngOnInit() {
  }

  // Gets sites for sitesServivce
	getSites(): void {
	  //this.sitesService.getSites(this.model.url).subscribe(sites => this.sites = sites);
    // Optional way of testing, pulls from constants file
	  this.sites = SITES;
	}

	

  // Mapping the form onSubmit to getSites and/or other needed methods
	onSubmit() {
	 this.getSites()
	}

}
