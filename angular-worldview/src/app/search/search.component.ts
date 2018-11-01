import { Component, OnInit } from '@angular/core';
import { SitesService } from '../sites.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	sites: Site[];
	constructor(private sitesService: SitesService) { }
	getSites(): void {
	  this.siteService.getSites().subscribe(sites => this.sites = sites);
	}
	ngOnInit() {
	}

}
