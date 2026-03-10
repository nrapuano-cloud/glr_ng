// video-manager.component.ts
import { Component } from '@angular/core';
import { VideoService, Video } from './video.service';

@Component({
  selector: 'app-video-manager',
  template: `
<div *ngFor="let video of videos">
  <h3>{{video.titolo}}</h3>
  <p>{{video.descrizione}}</p>
  <button (click)="download(video)">Download</button>
  <button (click)="deleteVideo(video)">Elimina</button>
  <input type="file" (change)="replaceVideo(video, $event, video.titolo, video.descrizione)">
</div>

<div>
  <h3>Carica nuovo video</h3>
  <input type="text" #titolo placeholder="Titolo">
  <input type="text" #desc placeholder="Descrizione">
  <input type="file" #fileInput (change)="uploadFile($event, titolo.value, desc.value)">
</div>

<progress [value]="progress" max="100"></progress> {{progress}}%
`})
export class VideoManagerComponent {
  videos: Video[] = [];
  progress = 0;

  constructor(private videoService: VideoService) {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.listVideos().subscribe(v => this.videos = v);
  }

  uploadFile(event: any, titolo: string, descrizione: string) {
    const file = event.target.files[0];
    this.videoService.uploadVideo({ titolo, descrizione, allegato: file }, (p) => this.progress = p)
      .subscribe(() => this.loadVideos());
  }

  deleteVideo(video: Video) {
    this.videoService.deleteVideo(video.id).subscribe(() => this.loadVideos());
  }

  replaceVideo(video: Video, event: any, titolo: string, descrizione: string) {
    const file = event.target.files[0];
    this.videoService.updateVideo(video.id, { titolo, descrizione, allegato: file }, (p) => this.progress = p)
      .subscribe(() => this.loadVideos());
  }

  download(video: Video) {
    this.videoService.downloadVideo(video.link);
  }
}