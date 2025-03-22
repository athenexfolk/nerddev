import { Component, inject } from '@angular/core';
import { Toggler } from '../../shared/utils/toggler';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly contentService = inject(ContentService);
  menuPanel = new Toggler();
}
