import { Component, inject } from '@angular/core';
import { MediaService } from '../../core/services/media.service';

@Component({
  selector: 'app-photos',
  imports: [],
  templateUrl: './photos.page.html',
  styleUrl: './photos.page.css',
})
export class PhotosPage {
  readonly mediaService = inject(MediaService);

  copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .catch((err) => console.error('Failed to copy:', err));
  }

  onFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var file = input.files[0];
      this.mediaService.upload(file).subscribe();
    }
  }
}
