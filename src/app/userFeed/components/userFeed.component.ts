import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/components/feed.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/components/popularTags.component';

@Component({
  selector: 'mc-user-feed',
  templateUrl: './userFeed.component.html',
  standalone: true,
  imports: [
    BannerComponent,
    FeedComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
})
export class UserFeedComponent {
  apiUrl = '/articles/feed';
}
