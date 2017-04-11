import 'meteor-client';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './app.module';
import { MeteorObservable } from "meteor-rxjs";

Meteor.startup(() => {
    const subscription = MeteorObservable.autorun().subscribe(() => {
    setTimeout(() => subscription.unsubscribe());
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
