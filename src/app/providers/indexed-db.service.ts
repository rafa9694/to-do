import { Injectable } from '@angular/core';
import Dexie, { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService extends Dexie {
  private tree: Dexie.Table<any, number>;

  constructor() {
    super('treeDB');
    this.version(3).stores({
      tree: '++id,parent,name,*children'
    });
    this.tree = this.table('tree');
  }

  adicionarNo(no: any): Promise<number> {
    return this.tree.add(no);
  }

  obterNo(id: number): Promise<any> {
    return this.tree.get(id);
  }

  getChildren(id: number): Promise<any[]> {
    return this.tree.where('parent').equals(id).toArray();
  }

  obterTeste(id: any): Promise<any[]> {
    return this.tree.where('teste').equals(id).toArray();
  }

  getFatherByName(name: string): Promise<any[]> {
    return this.tree.where("name").equals(name).toArray();
  }

  updateNode(node: any): PromiseExtended<number> {
    return this.tree.update(node.id, node);
  }

  excluirNo(id: number): Promise<void> {
    return this.tree.delete(id);
  }
}
