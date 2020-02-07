import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Thread, User, Message} from '../../model';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListComponent implements OnInit {

  private threads$: Thread[] = [];
  private users$: User[] = [];

  constructor() { }


  ngOnInit(): void {
  }

}
