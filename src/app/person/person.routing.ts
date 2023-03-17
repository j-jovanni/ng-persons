import { Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { PersonComponent } from "./person.component";

export const PersonRoutes: Routes = [
    {
        path: '',
        component: PersonComponent,
        canActivate: [AuthGuard]
    },

]