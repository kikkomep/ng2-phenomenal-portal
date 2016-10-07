import { NgModule } from "@angular/core"
import {ApplicationLibraryComponent} from "./application-library.component";
import {ApplicationListComponent} from "./application-list/application-list.component";
import {ApplicationDetailComponent} from "./application-detail/application-detail.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FilterPipe} from "../shared/pipe/filter.pipe";
import {applicationLibraryRouting} from "./application-library.routing";
import {ApplicationsDatabaseService} from "../shared/service/applications-database/applications-database.service";
import {ApplicationGridComponent} from "./application-grid/application-grid.component";

/**
 * @auther Dr. Sijin He
 * @date 27/09/2016
 * Project Phenomenal, EMBL-EBI
 */

@NgModule({
  declarations: [
    ApplicationGridComponent,
    ApplicationLibraryComponent,
    ApplicationListComponent,
    ApplicationDetailComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    applicationLibraryRouting
  ],
  providers: [
    ApplicationsDatabaseService
  ]
})
export class ApplicationLibraryModule {}
