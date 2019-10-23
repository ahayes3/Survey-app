import { Component } from '@angular/core';
import { surveys } from '../surveys';
import { user } from '../user';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})

export class SurveyListComponent {
  surveys = surveys;
  answered(option, survey) {
    survey.answers.push({
      user: user.name,
      option
    });
  }
  hasAnswered(survey): boolean {
    let ans = false;
    for (const answer in survey.answers) {
      if (answer.user === user.name) {
        console.log('return true' + survey.question + ' ' + answer.user + ' ' + user.name);
        ans = true;
      }
    }
    return ans;
  }
}
