import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MockDataService } from './app/services/mock-data.service';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
