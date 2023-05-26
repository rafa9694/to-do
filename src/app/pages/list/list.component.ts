import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  listName: string = "";
  formList: FormGroup;
  root: any;
  nodes: any[] = [];

  constructor(private indexedDBService: IndexedDBService,
    private router: Router) {
    this.formList = new FormGroup({
      nameItem: new FormControl('')
    });
    this.root = {
      parent: null,
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
      const node = {
        parent: this.root.id,
        children: [],
        name: name
      };
      this.indexedDBService.adicionarNo(node)
        .then(id => {
          this.nodes[this.nodes.length] = node;
          console.log('Root node created with ID:', id);
        });
    }
  }
}
