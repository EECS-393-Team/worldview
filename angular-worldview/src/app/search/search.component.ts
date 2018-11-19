import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
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
    default = "nytimes.com"
    sites: Site[];
    form: FormGroup;
    model = new Search("www.nytimes.com");
    output_text = '';
    constructor(private sitesService: SitesService) { }

    ngOnInit() {
        this.form  = new FormGroup({
            url: new FormControl(''),
          });
    }

  // Gets sites for sitesServivce
    getSites(): void {
        var url = this.form.get('url').value
        if(url == ""){
            this.output_text = "Please enter a valid url";
        }
        else{
            this.output_text = "";
            this.sitesService.getSites(url).subscribe(sites => this.sites = sites);
            // Optional way of testing, pulls from constants file
            //this.sites = SITES;
        }
    }



  // Mapping the form onSubmit to getSites and/or other needed methods
    onSubmit() {
     this.getSites()
    }

    toggleCollapse(id: string) {
        console.log(document.getElementById("cont"+id).style.fontSize)
        if (document.getElementById("cont"+id).style.fontSize == "0px" ){
            document.getElementById("cont"+id).style.fontSize = "";
        }
        else{
            document.getElementById("cont"+id).style.fontSize = "0px";
        }
    }
}