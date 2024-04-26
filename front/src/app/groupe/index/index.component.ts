import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { Groupe } from '../groupe';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  groupes: Groupe[] = [];

  constructor(public groupeService: GroupeService) { }

  ngOnInit(): void {
    this.groupeService.getAll().subscribe((data) => {
      this.groupes = data['hydra:member'];
    })
  }

  deleteGroupe(id:number) {
    this.groupeService.delete(id).subscribe(res => {
      this.groupes = this.groupes.filter(item => item.id !== id);
    })
  }

}
