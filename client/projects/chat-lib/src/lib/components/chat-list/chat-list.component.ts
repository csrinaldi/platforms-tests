import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'chat-lib-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
