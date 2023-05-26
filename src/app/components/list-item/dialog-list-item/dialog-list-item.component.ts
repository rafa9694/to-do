import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  nameSubItem: string;
  name: string;
}

@Component({
  selector: 'app-dialog-list-item',
  templateUrl: './dialog-list-item.component.html',
  styleUrls: ['./dialog-list-item.component.scss']
})

export class DialogListItemComponent {

  formDialog: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogListItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.formDialog = new FormGroup({
      nameSubItem: new FormControl('')
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
