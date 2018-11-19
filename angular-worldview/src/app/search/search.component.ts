import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SitesService } from '../sites.service';
import { Site } from '../site';
import { Response } from '../response';
import { Search } from '../search';
import { SITES } from '../mock-sites';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    default = "nytimes.com";
    sites: Site[];
    response = new Response([],[]);
    ips: string[];
    search_url: string;
    form: FormGroup;
    model = new Search("www.nytimes.com");
    output_text = '';
    constructor(public sitesService: SitesService) { }

    ngOnInit() {
        this.form  = new FormGroup({
            url: new FormControl(''),
          });
    }

  // Gets sites for sitesServivce
    getSites(): void {
        var url = this.search_url;
        if(url == ""){
            this.output_text = "Please enter a valid url";
        }
        else{
            this.output_text = "";
            this.sitesService.getSites(url).subscribe(response => {
                                                                this.response = response;
                                                                this.ips = Object.keys(response.html)
                                                                console.log(this.response);
                                                                }, err => this.output_text = err.status);
            // Optional way of testing, pulls from constants file
            //this.sites = SITES;

        }
    }



  // Mapping the form onSubmit to getSites and/or other needed methods
    onSubmit() {
     this.search_url = this.form.get('url').value;
     this.getSites();
    }

    toggleCollapse(id: string) {
        console.log(document.getElementById("cont"+id).style.fontSize)
        if (document.getElementById("cont"+id).style.height == "10px" ){
            document.getElementById("cont"+id).style.height = "";
        }
        else{
            document.getElementById("cont"+id).style.height = "10px";
        }
    }
}