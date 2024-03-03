import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountingComponent } from './counting.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CountingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CountingComponent]
})
export class CountingModule { 
}
