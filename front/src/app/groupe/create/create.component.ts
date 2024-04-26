import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public groupeService: GroupeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      origine: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      anneeDebut: new FormControl('', Validators.required),
      anneeSeparation: new FormControl('', Validators.required),
      fondateurs: new FormControl('', Validators.required),
      membres: new FormControl('', Validators.required),
      courant: new FormControl('', Validators.required),
      presentation: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.groupeService.create(this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('groupe/index');
    })
  }

}
