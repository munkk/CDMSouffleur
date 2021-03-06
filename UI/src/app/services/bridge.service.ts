import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CommonService } from 'src/app/services/common.service';
import { DrawService } from 'src/app/services/draw.service';
import { IRow } from 'src/app/models/row';

@Injectable()
export class BridgeService {
  private _sourceRow: IRow;
  private _targetRow: IRow;
  private _targetRowElement = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private drawService: DrawService
  ) { }

  set sourceRow(row: IRow) {
    this._sourceRow = row;
  }
  get sourceRow() {
    return this._sourceRow;
  }

  set targetRow(row: IRow) {
    this._targetRow = row;
  }
  get targetRow() {
    return this._targetRow;
  }

  get targetRowElement() {
    return this._targetRowElement;
  }
  set targetRowElement(element: HTMLElement) {
    this._targetRowElement = element;
  }

  connect() {
    this.drawService.drawLine(this.sourceRow, this.targetRow);
    this.commonService.linked = true;
  }

  invalidate() {
    this.sourceRow = null;
    this.targetRow = null;
  }

  getStyledAsDragStartElement() {
    this.sourceRow.htmlElement.classList.add('drag-start');
  }
  getStyledAsDragEndElement() {
    this.sourceRow.htmlElement.classList.remove('drag-start');
  }
}