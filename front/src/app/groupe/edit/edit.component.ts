import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from '../groupe';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  groupe!: Groupe;
  form!: FormGroup;

  constructor(
    public groupeService: GroupeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['groupeId'];
    this.groupeService.find(this.id).subscribe((data: Groupe)=>{
      this.groupe = data;
    });

    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      origine: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      anneeDebut: new FormControl('', [Validators.required]),
      anneeSeparation: new FormControl('', Validators.required),
      fondateurs: new FormControl('', Validators.required),
      membres: new FormControl('', [Validators.required]),
      courant: new FormControl('', Validators.required),
      presentation: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.groupeService.update(this.id, this.form.value).subscribe((res:any) => {
      this.router.navigateByUrl('groupe/index');
    })
  }

}
