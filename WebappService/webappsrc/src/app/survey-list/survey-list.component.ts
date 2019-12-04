import {AfterViewInit, Component, Injectable, NgModule, OnInit} from '@angular/core';
import {surveys} from '../surveys';
import {user} from '../user';
import {BarGraphComponent} from '../bar-graph/bar-graph.component';
import {HttpClient, HttpClientModule, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class SurveysService {
  constructor(private http: HttpClient) { }

  private static SURVEYS_URL = 'http://localhost:8090/SurveyService/surveys.json';

  async fetchSurveys() {
    try {
      const data: any = await this.http.get(SurveysService.SURVEYS_URL).toPromise();
      // console.log(data);
      return data;
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }
}
@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  providers: [ SurveysService ],
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  surveys; // = surveys;
  surveys1 = [];
  objs: Array<object>;
  bgc = [];

  constructor(private surveysService: SurveysService) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    // surveys2: any[] = this.surveysService.fetchSurveys().then(data => {this.surveys1 = data;} );
    // .then(data => this.objs.concat(data)); // .then(data => this.surveys1 = data);
    this.surveysService.fetchSurveys().then(data => { this.drawGraphs(data); } );
    console.log('afterView');
    console.log(this.surveys1);
    this.surveys = this.surveys1;
    console.log('AM HERE');
    // this.drawGraphs();
  }
  ngOnInit(): void {
    // console.log(this.surveysService.fetchSurveys().then(data => {this.surveys1 = data; }));
    this.surveysService.fetchSurveys().then(data => { this.surveys1 = data; } );
    console.log('oninit');
    console.log(this.surveys1);
    document.body.setAttribute('bgcolor', '#F9F9E3');
    console.log('BEANS: ');
    this.surveysService.fetchSurveys().then(data => { this.surveys1 = data; } );
    // setTimeout(this.drawGraphs(), 3000);
  }
  drawGraphs(surveys2) {
    // this.surveysService.fetchSurveys().then(data => {this.surveys1 = data; });
    // console.log('HERE2');
    // console.log('in graphs' + this.surveys1);
    surveys2.forEach(survey => {
      // console.log('hasanswered' + this.hasAnswered(survey));
      if (this.hasAnswered(survey)) {
        // console.log('here3');
        this.createGraph(survey);
      }
    });
  }

  drawGraph(survey): boolean {
    if (this.hasAnswered(survey)) {
      this.createGraph(survey);
      return true;
    }
    return false;
  }

  answered(option, survey) {
    survey.answers.push({
      user: user.name,
      option
    });
    this.createGraph(survey);
  }

  createGraph(survey) {
    // const str = "chartContainer";
    // document.getElementsByClassName("share-bubble").innerHTML =
    //  '<div id="{{survey.id}}" style="height: 200px; width: 90%;"></div>';
    this.bgc.push(new BarGraphComponent());
    this.bgc[this.bgc.length - 1].setData(survey);
    this.bgc[this.bgc.length - 1].createGraph();
  }

  hasAnswered(survey): boolean {
    let ans = false;
    survey.answers.forEach(answer => {
      // console.log('Answer user: ' + answer.user + ' UserName: ' + user.name);
      // console.log(survey.question + ' ' + answer.user + ' ' + answer.option + ' ' + user.name);
      if (answer.user === user.name) {
        // console.log('true');
        ans = true;
      }
    });
    return ans;
  }
}
