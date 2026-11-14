import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

export interface PaginationChange {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-table-footer-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, NgSelectModule],
  templateUrl: './table-footer-pagination.component.html',
  styleUrl: './table-footer-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFooterPaginationComponent implements OnChanges {
  @Input() totalItems = 0;
  @Input() pageSize = 5;
  @Input() page = 1;
  @Input() totalItemsPerPage = 0;
  @Input() pageSizes = [5, 10, 15];
  @Output() changePaginate = new EventEmitter<PaginationChange>();

  localPage = 1;
  localPageSize = 5;
  rangeStart = 0;
  rangeEnd = 0;

  ngOnChanges(_changes: SimpleChanges): void {
    this.localPage = this.page;
    this.localPageSize = this.pageSize;
    this.calculateRange();
  }

  onChangePageSize(pageSize: number): void {
    this.localPage = 1;
    this.localPageSize = pageSize;
    this.calculateRange();
    this.changePaginate.emit({ page: 1, pageSize });
  }

  onChangePage(page: number): void {
    this.localPage = page;
    this.calculateRange();
    this.changePaginate.emit({ page, pageSize: this.localPageSize });
  }

  private calculateRange(): void {
    this.rangeStart = this.totalItems ? (this.localPage - 1) * this.localPageSize + 1 : 0;
    this.rangeEnd = Math.min(this.localPage * this.localPageSize, this.totalItems);
  }
}
