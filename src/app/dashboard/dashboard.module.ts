import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DashboardRoutes } from "./dashboard.routing";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  declarations: [],
})
export class DashboardModule { }
