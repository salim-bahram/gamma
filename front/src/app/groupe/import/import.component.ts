import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;

  constructor(
    public groupeService: GroupeService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.groupeService.import(file).subscribe((res:any) => {
          this.router.navigateByUrl('groupe/index');
        });
      }
    }
  }
}
