import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Node } from 'src/app/models/node';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  listName: string = "";
  formList: FormGroup;
  root: Node;
  nodes: Node[] = [];

  constructor(private indexedDBService: IndexedDBService,
    private router: Router) {
    this.formList = new FormGroup({
      nameItem: new FormControl('')
    });
    this.root = {
      id: 0,
      parent: 0,
      children: [],
      name: ""
    };
  }

  ngOnInit() {
    const url = window.location.href;
    const rootName = url.substring(url.lastIndexOf('edit/') + 5);
    this.indexedDBService.getFatherByName(rootName).then(resp => {
      if (resp && resp.length > 0) {
        this.root = resp[0];
        this.indexedDBService.getChildren(this.root.id).then(resp => {
          this.nodes = resp;
          this.nodes.forEach(node => {
            this.indexedDBService.getChildren(node.id).then(resp => {
              node.children = resp;
            });
          })
        })
      } else {
        this.router.navigate(['']);
      }
    }).catch(err => {
      console.log(err);
    })

  }

  addListitem() {
    let name = this.formList.get('nameItem')?.value;
    if (name) {
      const nodeAdd = {
        parent: this.root.id,
        children: [],
        name: name
      };
      this.indexedDBService.adicionarNo(nodeAdd)
        .then(id => {
          let nodeCreated: Node = {
            id: id,
            parent: nodeAdd.parent,
            children: [],
            name: nodeAdd.name
          };
          this.nodes[this.nodes.length] = nodeCreated;
          console.log('Root node created with ID:', id);
        });
    }
  }

  deleteItem(nodeDelete: Node) {
    this.nodes = this.nodes.filter(node => node.id != nodeDelete.id);
  }

  deleteSubItem(nodeDelete: Node) {
    let nodeParent = this.nodes.find(node => node.parent == nodeDelete.id);
    if (nodeParent)
      nodeParent.children.filter(children => children != nodeDelete.id);
  }

  addSubItem(nodeAdd: Node) {
    let nodeParent = this.nodes.find(node => node.parent == nodeAdd.id);
    if (nodeParent)
      nodeParent.children.push(nodeAdd.id);
  }

  getNode(id: number): Node {
    let node: Node = {
      id: id,
      parent: 0,
      children: [],
      name: ''
    };

    return node;
  }
}
