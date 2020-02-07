import {NgModule} from '@angular/core';
import {ChatLibService} from './services/chat-lib.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChatStore} from './store/reducer';
import {ChatAllEffects} from './store/effects';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ChatComponent } from './containers/chat/chat.component';
import {CHATS_ROUTERS} from './chat-lib-routing.module';
import { ChatViewerComponent } from './components/chat-viewer/chat-viewer.component';


@NgModule({
  declarations: [ChatListComponent, ChatComponent, ChatViewerComponent],
  imports: [
    StoreModule.forFeature(ChatStore.chatFeatureKey, ChatStore.reducer),
    EffectsModule.forFeature([ChatAllEffects.ChatEffects]),
    FlexLayoutModule,
    MatListModule,
    MatIconModule,

    CHATS_ROUTERS
  ],
  exports: [],
  providers: [
    ChatLibService
  ]
})
export class ChatLibModule {
}
