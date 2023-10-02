import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/components/feed.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/components/popularTags.component';

@Component({
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FeedTogglerComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedComponent
  ],
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
