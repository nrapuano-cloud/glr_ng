// video.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Video {
  id: number;
  titolo: string;
  descrizione: string;
  file: string;
  file_original_name: string;
  link: string;
  created: string;
  online: boolean;
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  listVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/list_videos.php`);
  }

  uploadVideo(data: { titolo: string; descrizione: string; allegato?: File }, progressCallback?: (progress: number) => void): Observable<any> {
    const formData = new FormData();
    formData.append('titolo', data.titolo);
    formData.append('descrizione', data.descrizione);
    if (data.allegato) {
      formData.append('allegato', data.allegato);
    }

    return this.http.post(`${this.apiUrl}/upload_video.php`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total && progressCallback) {
          progressCallback(Math.round(100 * event.loaded / event.total));
        }
        return event;
      })
    );
  }

  updateVideo(id: number, data: { titolo: string; descrizione: string; allegato?: File }, progressCallback?: (progress: number) => void): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('titolo', data.titolo);
    formData.append('descrizione', data.descrizione);
    if (data.allegato) {
      formData.append('allegato', data.allegato);
    }

    return this.http.post(`${this.apiUrl}/update_video.php`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total && progressCallback) {
          progressCallback(Math.round(100 * event.loaded / event.total));
        }
        return event;
      })
    );
  }

  downloadVideo(link: string) {
    window.open(link, '_blank');
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete_video.php`, { id });
  }
}