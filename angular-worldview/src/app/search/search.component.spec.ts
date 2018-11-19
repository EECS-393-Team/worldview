import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { SearchComponent } from './search.component';
import { SitesService } from '../sites.service';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SIMPLESITE } from '../mock-sites';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message upon no input', () => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    component.search_url = "";
    component.getSites()
    expect(component.output_text).toEqual("Please enter a valid url")
  });

  it('should display simple html off of good input', async(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    spyOn(component.sitesService, 'getSites').and.returnValue(Promise.resolve(SIMPLESITE));
    component.search_url = "http://example.com";
    component.getSites();
    console.log(component.response);
    expect(component.response.html).toEqual(SIMPLESITE.html);
  }));

  it('should contain a 404 message on a bad request', async(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.search_url = "example.comasdfasdf";
    component.getSites();
    setTimeout(function() {
      fixture.detectChanges();
      const compilation = fixture.debugElement.nativeElement;
      expect(compilation.querySelector('cont0').textContent).toContain("404");
    }, 1000);
  }));

  it('should contain no differences if the sites are the same', async(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    spyOn(component.sitesService, 'getSites').and.returnValue(Promise.resolve(SIMPLESITE));
    component.search_url = "http://example.com";
    component.getSites();
    expect(Object.keys(component.response.diff).length).toEqual(0));
  }));
});
