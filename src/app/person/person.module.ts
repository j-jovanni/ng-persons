import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PersonComponent } from "./person.component";
import {PersonRoutes} from "./person.routing"
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
  imports: [
    //CommonModule,
    //RouterModule.forChild(DashboardRoutes),
    //FormsModule,
    //ComponentsModule,
    //MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forChild(PersonRoutes),
  ],
  declarations: [],
})
export class PersonModule {}
