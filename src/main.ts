import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { SFSchema } from '@delon/form';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

export type NFSchema = SFSchema;
