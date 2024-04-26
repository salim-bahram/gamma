import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupeService } from '../groupe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild("fileUpload", {static: false})

  public form!: FormGroup;
  file!: File;
  fileUpload!: ElementRef;

  constructor(
    public groupeService: GroupeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file: null
    });
  }

  onSubmit(file: File) {
    console.log('r');
    this.fileUpload.nativeElement.value = '';
    this.groupeService.import(file).subscribe((res:any) => {
      this.router.navigateByUrl('groupe/index');
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
      const file = fileUpload.file;
      this.onSubmit(file);
    };
    fileUpload.click();
  }

  // clearFile() {
  //   this.fileToUpload.value = null;
  // }
}
