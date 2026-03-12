import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

let angularStarted = false;

(window as any).startAngular = () => {

  if (angularStarted) return;

  angularStarted = true;

  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));

};