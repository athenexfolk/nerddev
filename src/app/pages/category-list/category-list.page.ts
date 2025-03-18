import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { CategoryStoreService } from '../../core/stores/category-store.service';
import { CategoryCreateComponent } from '../../components/category-create/category-create.component';
import { CategoryDeleteComponent } from '../../components/category-delete/category-delete.component';
import { CategoryUpdateComponent } from '../../components/category-update/category-update.component';
import { Toggler } from '../../shared/utils/toggler';
import type { Category } from '../../core/models/category';

@Component({
  selector: 'app-category-list',
  imports: [
    CategoryCreateComponent,
    CategoryDeleteComponent,
    CategoryUpdateComponent,
  ],
  templateUrl: './category-list.page.html',
  styleUrl: './category-list.page.css',
})
export class CategoryListPage {
  readonly #contentService = inject(ContentService);
  readonly categoryStore = inject(CategoryStoreService);

  createPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  focusCategory?: Category;

  ngOnInit() {
    this.#contentService.loadCategories();
  }

  openUpdatePanel(category: Category) {
    this.updatePanel.up();
    this.focusCategory = category;
  }

  closeUpdatePanel() {
    this.updatePanel.down();
    this.focusCategory = undefined;
  }

  openDeletePanel(category: Category) {
    this.deletePanel.up();
    this.focusCategory = category;
  }

  closeDeletePanel() {
    this.deletePanel.down();
    this.focusCategory = undefined;
  }
}
