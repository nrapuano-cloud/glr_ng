// video-manager.module.ts
// Questo file contiene tutto il codice Angular del manager video per il progetto formazione

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VideoManagerComponent } from './video-manager.component';
import { VideoService } from './video.service';

@NgModule({
  declarations: [VideoManagerComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [VideoService],
  exports: [VideoManagerComponent]
})
export class VideoManagerModule {}