import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'ph-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  announcement = '';
  _urls: string[];
  isEmptyAnnouncement = false;

  ngOnInit() {
  }

  constructor(private router: Router,
              private breadcrumbService: BreadcrumbService,
              private config: AppConfig) {
    this._urls = [];
    this.router.events.subscribe((navigationEnd: NavigationEnd) => {
      this._urls.length = 0; // Fastest way to clear out array
      this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
    });

    const text = config.getConfig('announcement');
    if (text !== '') {
      this.announcement = text;
      this.isEmptyAnnouncement = true;
    }
  }

  generateBreadcrumbTrail(url: string): void {
    this._urls.unshift(url); // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
    if (url !== undefined && url.toString().lastIndexOf('/') > 0) {
      // Find last '/' and add everything before it as a parent route
      this.generateBreadcrumbTrail(url.toString().substr(0, url.toString().lastIndexOf('/')));
    }
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  friendlyName(url: string): string {
    return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
  }

  hidden(): boolean {
    return this._urls.length > 0 ? this.breadcrumbService.hidden(this._urls[0]) : false;
  }
}
