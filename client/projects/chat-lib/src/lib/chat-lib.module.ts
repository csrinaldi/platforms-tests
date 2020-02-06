import {NgModule} from '@angular/core';
import {ChatLibService} from './services/chat-lib.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChatStore} from './store/reducer';
import {ChatAllEffects} from './store/effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(ChatStore.chatFeatureKey, ChatStore.reducer),
    EffectsModule.forFeature([ChatAllEffects.ChatEffects]),
  ],
  exports: [],
  providers: [
    ChatLibService
  ]
})
export class ChatLibModule {
}
