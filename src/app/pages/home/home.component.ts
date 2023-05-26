import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  formHome: FormGroup;

  constructor(private indexedDBService: IndexedDBService,
    private router: Router) {
    this.formHome = new FormGroup({
      name: new FormControl('')
    });
  }

  addList() {
    console.log("criando Lista");
    let name = this.formHome.get('name')?.value;
    const root = {
      parent: null,
      children: [],
      name: name
    };
    this.indexedDBService.adicionarNo(root)
      .then(id => {
        this.router.navigate(['/edit/' + name]);
        console.log('Root node created with ID:', id);
      });
  }
}
