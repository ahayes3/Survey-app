import {Component, NgModule, OnInit} from '@angular/core';
import { surveys } from '../surveys';
import { user } from '../user';
import { BarGraphComponent } from '../bar-graph/bar-graph.component';
import {Location} from "@angular/common";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})

export class SurveyListComponent implements OnInit {
  surveys = surveys;
  bgc = [];

  constructor(private location: Location){}

  ngOnInit(): void {
    document.body.setAttribute('bgcolor','#F9F9E3');
    //this.location.subscribe((value: PopStateEvent)  => {
    //  this.bgc.forEach( graph => {
    //    graph.createGraph();
    //  });
    //});
    setTimeout(this.drawGraphs, 1);
  }

  drawGraphs() {
    this.surveys = surveys;
    this.surveys.forEach( survey => {
      let ans = false;
      survey.answers.forEach(answer => {
        // console.log(survey.question + ' ' + answer.user + ' ' + answer.option + ' ' + user.name);
        if (answer.user === user.name) {
          // console.log('true');
          ans = true;
        }
      });
      if(ans){
        this.bgc = [];
        this.bgc.push(new BarGraphComponent());
        this.bgc[this.bgc.length-1].setData(survey);
        this.bgc[this.bgc.length-1].createGraph();
      }
    });
  }

  drawGraph(survey): boolean {
    if(this.hasAnswered(survey)){
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
    //const str = "chartContainer";
    //document.getElementsByClassName("share-bubble").innerHTML =
    //  '<div id="{{survey.id}}" style="height: 200px; width: 90%;"></div>';
    this.bgc.push(new BarGraphComponent());
    this.bgc[this.bgc.length-1].setData(survey);
    this.bgc[this.bgc.length-1].createGraph();
  }

  hasAnswered(survey): boolean {
    let ans = false;
    survey.answers.forEach(answer => {
      // console.log(survey.question + ' ' + answer.user + ' ' + answer.option + ' ' + user.name);
      if (answer.user === user.name) {
        // console.log('true');
        ans = true;
      }
    });
    return ans;
  }
}
