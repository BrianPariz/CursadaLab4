import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterName: string;
  @Output() busquedaEvento = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(value: string) {
    let filterValue = value.trim().toLowerCase();
    this.busquedaEvento.emit(filterValue);
  }

}
