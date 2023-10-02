import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps!: number;
  @Input('url') urlProps!: string;
  @Input('limit') limitProps!: number;
  @Input('currentPage') currentPageProps!: number;
  pagesCount!: number;
  pages!: number[];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    // this.pages = [1,2,3,4,5..., this.pagesCount]
    this.pages = this.utilsService.range(1, this.pagesCount);
  }
}
