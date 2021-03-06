import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      // clear alert message on route change
      if (event instanceof NavigationStart) {

        if (this.keepAfterNavigationChange) {
          // only keep for a single  location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    setTimeout(function () {
      this.closeMessage();
    }.bind(this), 5000);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    setTimeout(function () {
      this.closeMessage();
    }.bind(this), 5000);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  closeMessage() {
    this.subject.next();
  }
}
