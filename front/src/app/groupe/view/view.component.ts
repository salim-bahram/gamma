import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from '../groupe';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  groupe!: Groupe;

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
  }

}
