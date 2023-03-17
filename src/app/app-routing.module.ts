import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [];

export const AppRoutes: Routes = [

  {
    path: "",
    //component: DashboardComponent,
    canActivate: [],
    children: [
      {
        path: "",
        //canActivate: [AuthGuard],
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "person",
        //canActivate: [AuthGuard],
        loadChildren: () =>
          import("./person/person.module").then(
            (m) => m.PersonModule
          ),
      },

    ],
  },

];
