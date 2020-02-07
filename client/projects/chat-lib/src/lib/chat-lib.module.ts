import {NgModule} from '@angular/core';
import {ChatLibService} from './services/chat-lib.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChatStore} from './store/reducer';
import {ChatAllEffects} from './store/effects';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [ChatListComponent],
  imports: [
    StoreModule.forFeature(ChatStore.chatFeatureKey, ChatStore.reducer),
    EffectsModule.forFeature([ChatAllEffects.ChatEffects]),
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [],
  providers: [
    ChatLibService
  ]
})
export class ChatLibModule {
}
