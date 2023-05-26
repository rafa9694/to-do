import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IndexedDBService } from 'src/app/providers/indexed-db.service';
import { ListComponent } from './list.component';
import { ListItemComponentModule } from 'src/app/components/list-item/list-item.component.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    ListItemComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [IndexedDBService]
})
export class ListComponentModule { }