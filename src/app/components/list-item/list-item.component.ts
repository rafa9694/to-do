import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogListItemComponent } from './dialog-list-item/dialog-list-item.component';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() name: string = "";
  @Input() position: number = 0;
  @Input() parentPosition: number = 0;
  @Input() node: any;

  title: string = "";

  constructor(public dialog: MatDialog,
    private indexedDBService: IndexedDBService) { }

  ngOnInit() {
    if (this.parentPosition == 0)
      this.title = this.position.toString() + ") " + this.name;
    else
      this.title = this.parentPosition.toString() + "." + this.position.toString() + ") " + this.name;
  }

  addSubItem() {
    const dialogRef = this.dialog.open(DialogListItemComponent, {
      data: { title: "Criar Subitem - " + this.title, name: "name", nameSubItem: "", type: "insert" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const node = {
          parent: this.node.id,
          children: [],
          name: result
        };
        this.indexedDBService.adicionarNo(node).then(resp => {
          if (resp) {
            this.node.children[this.node.children.length] = resp;
            this.indexedDBService.updateNode(this.node);
          }
        })
      }
    });
  }

  deleteSubItem() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: "Aviso!", message: "Tem certeza que deseja deletar esse item?", buttonCancel: "Não", buttonConfirm: "Sim" },
    });

    dialogRef.beforeClosed().subscribe(async result => {
      if (result)
        await this.indexedDBService.excluirNo(this.node.id);
    });
  }

  editItem(node: any) {
    const dialogRef = this.dialog.open(DialogListItemComponent, {
      data: { title: "Editar: " + this.title, name: node.name, nameSubItem: "", type: "edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        node.name = result;
        this.indexedDBService.updateNode(node).then(() => console.log("Atualizado node"));
      }
    })
  }
}
