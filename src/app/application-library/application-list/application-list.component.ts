import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Application } from '../../shared/model/application/application';

import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'fl-application-list',
  templateUrl: 'application-list.component.html',
  styleUrls: ['application-list.component.css'],
})

export class ApplicationListComponent {

  @Input() application: Application;

  constructor(
  ) {

  }

}
