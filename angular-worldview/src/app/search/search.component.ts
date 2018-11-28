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
    default = "example.com";
    api_url = "localhost:8000";
    sites: Site[];
    activeid = 1;
    response: Response;
    ips: string[];
    diff_ips: string[];
    image_urls: string[];
    image_diff_urls: string[];
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
        // sanitize url
        url = url.replace(/https?:\/\//,"")
        if(url == ""){
            this.output_text = "Please enter a valid url";
        }
        else{
            document.getElementById("selector").style.display = "";
            console.log("res"+this.activeid);
            document.getElementById("res"+this.activeid).style.display = "";
            this.output_text = "";
            this.sitesService.getSites(url).subscribe(response => {
                                                                this.response = response;
                                                                this.ips = Object.keys(response.html);
                                                                this.diff_ips = Object.keys(response.diff);
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

    showResultDiv(id: number){
      document.getElementById("res"+this.activeid).style.display = "none";
      document.getElementById("res"+id).style.display = "";
      this.activeid = id;
    }

}