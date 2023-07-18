import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogListItemComponent } from './dialog-list-item/dialog-list-item.component';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Node } from 'src/app/models/node';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() position: number = 0;
  @Input() parentPosition: number = 0;
  @Input() node: any;

  @Output() delete: EventEmitter<Node> = new EventEmitter<Node>();
  @Output() addSubItem: EventEmitter<Node> = new EventEmitter<Node>();

  title: string = "";

  constructor(public dialog: MatDialog,
    private indexedDBService: IndexedDBService) { }

  ngOnInit() {
    this.setTitle();
  }

  onAddSubItem() {
    const dialogRef = this.dialog.open(DialogListItemComponent, {
      data: { title: "Criar Subitem: " + this.node.name, name: "name", nameSubItem: "", type: "insert" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nodeSubAdd = {
          parent: this.node.id,
          children: [],
          name: result
        };
        this.indexedDBService.adicionarNo(nodeSubAdd).then(async resp => {
          if (resp) {
            let nodeSubCreated: Node = {
              id: resp,
              parent: nodeSubAdd.parent,
              children: [],
              name: nodeSubAdd.name
            };
            this.node.children[this.node.children.length] = resp;
            await this.indexedDBService.updateNode(this.node);
            this.addSubItem.emit(nodeSubCreated);
          }
        })
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: "Aviso!", message: "Tem certeza que deseja deletar esse item?", buttonCancel: "Não", buttonConfirm: "Sim" },
    });

    dialogRef.beforeClosed().subscribe(async result => {
      if (result) {
        await this.indexedDBService.excluirNo(this.node.id);
        this.delete.emit(this.node);
      }
    });
  }

  onEdit() {
    const dialogRef = this.dialog.open(DialogListItemComponent, {
      data: { title: "Editar: " + this.node.name, name: this.node.name, nameSubItem: "", type: "edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.node.name = result;
        this.setTitle();
        this.indexedDBService.updateNode(this.node).then(() => console.log("Atualizado node"));
      }
    })
  }

  setTitle() {
    if (this.parentPosition == 0)
      this.title = this.position.toString() + ") " + this.node.name;
    else
      this.title = this.parentPosition.toString() + "." + this.position.toString() + ") " + this.node.name;
  }
}
