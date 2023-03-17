import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  sig!: SignaturePad;
  public formState!: FormGroup;
  isEdit = false;
  point = "http://nestapi3-env.eba-cprej32x.us-east-2.elasticbeanstalk.com/";

  constructor(
    public dialogRef: MatDialogRef<CreatePersonComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formState = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      phone: ["",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      birthdate: [, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    if(this.data){
      let { name, phone, email, birthdate } = { 
        name: this.data.name, 
        phone: this.data.phone, 
        email: this.data.email, 
        birthdate: new Date(this.data.birthdate)
      }
      this.formState.setValue({ name, phone, email, birthdate })
      this.isEdit=true
    }
  }

  async create() {
    
    const { name, phone, email, birthdate } = this.formState.getRawValue();
    const signature: string = this.sig.toDataURL('image/png');

    await this.http.post<any>(`${this.point}person/`,
      {
        name,
        phone,
        email,
        birthdate: birthdate.toString(),
        signature
      }).subscribe((response: any) => {
        Swal.fire(
          'Gurdado con exito!',
          `La persona con nombre ${name} se a gurdado con exito!`,
          'success'
        );
        this.dialogRef.close();

      }, error => {
        console.log(error)
      })
  }
  
  clear() {
    this.sig.clear();
  }

  async update(){
    const { name, phone, email, birthdate } = this.formState.getRawValue();

    await this.http.patch<any>(`${this.point}person/${this.data._id}`,
      {
        name,
        phone,
        email,
        birthdate,
      }).subscribe((response: any) => {
        Swal.fire(
          'Actualizado con exito!',
          `La persona con nombre ${name} se a actualizado con exito!`,
          'success'
        );
        this.dialogRef.close();

      }, error => {
        console.log(error)
      })
  }

}
