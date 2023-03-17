import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CreatePersonComponent } from '../dialogs/create-person/create-person.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  total = 0;
  displayedColumns: string[] = ['name', 'email', 'phone', 'signature', 'birthdate', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  point = "http://nestapi3-env.eba-cprej32x.us-east-2.elasticbeanstalk.com/";
  loadSucces = false

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {

    // const canvas = document.querySelector("canvas");
    // const signaturePad = new SignaturePad(canvas);
  }
  async openDialog(): Promise<void> {
    await this.dialog.open(CreatePersonComponent, {
      width: '650px',

    }).afterClosed().subscribe(async (result: any) => {
      await this.getPersons();
    });




  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  async ngOnInit(): Promise<void> {

    let authorizationData = 'Basic ' + btoa("admon" + ':' + "123");

    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorizationData
      })
    };
    await this.getPersons();
  }
  async getPersons() {
    await this.http.get<any>(`${this.point}person/`).subscribe((response: any) => {
      this.dataSource.data = response
      this.total = response.length
      this.loadSucces = true
    }, error => {
    })
  }
  async editCountry(element: any) {
    await this.dialog.open(CreatePersonComponent, {
      width: '650px',
      data: element
    }).afterClosed().subscribe(async (result: any) => {
      await this.getPersons();
    });

  }
  async deleteCountry(element: any) {
    Swal.fire({
      title: 'Deseas eliminar el registro?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: `No eliminar`,
      confirmButtonColor: '#dc3741',
      cancelButtonColor: '#B0B0B0',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await this.http.delete<any>(`${this.point}person/${element._id}`).subscribe(async (response: any) => {
          await Swal.fire(
            'Gurdado con exito!',
            `La persona con nombre ${name} se a gurdado con exito!`,
            'success'
          );
          this.getPersons();

        }, error => {
          console.log(error)
        })
      } else if (result.isDenied) {

      }
    })

  }
}
