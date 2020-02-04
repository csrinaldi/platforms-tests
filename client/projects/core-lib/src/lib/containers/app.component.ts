import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lgk-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <lgk-layout>

        </lgk-layout>
  `
})
export class AppComponent {
}
