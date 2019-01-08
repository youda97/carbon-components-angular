import {
	Component,
	ApplicationRef,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { Subscription, fromEvent } from "rxjs";

import { TableModel } from "./table.module";
import { TableHeaderItem } from "./table-header-item.class";
import { TableItem } from "./table-item.class";
import { getScrollbarWidth } from "../common/utils";
import { I18n } from "./../i18n/i18n.module";

/**
 * Build your table with this component by extending things that differ from default.
 *
 * demo: [https://angular.carbondesignsystem.com/?selectedKind=Table](https://angular.carbondesignsystem.com/?selectedKind=Table)
 *
 * Instead of the usual write-your-own-html approach you had with `<table>`,
 * carbon table uses model-view-controller approach.
 *
 * Here, you create a view (with built-in controller) and provide it a model.
 * Changes you make to the model are reflected in the view. Provide same model you use
 * in the table to the `<ibm-pagination>` components.
 * They provide a different view over the same data.
 *
 * ## Basic usage
 *
 * ```html
 * <ibm-table [model]="model"></ibm-table>
 * ```
 *
 * ```typescript
 * public model = new TableModel();
 *
 * this.model.data = [
 * 	[new TableItem({data: "asdf"}), new TableItem({data: "qwer"})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "zwer"})],
 * 	[new TableItem({data: "bsdf"}), new TableItem({data: "swer"})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "twer"})]
 * ];
 * ```
 *
 * ## Customization
 *
 * If you have custom data in your table, you need a way to display it. You can do that
 * by providing a template to `TableItem`.
 *
 * ```html
 * <ng-template #customTableItemTemplate let-data="data">
 * 	<a [routerLink]="data.link">{{data.name}} {{data.surname}}</a>
 * </ng-template>
 * ```
 *
 * ```typescript
 * customTableItemTemplate: TemplateRef<any>;
 *
 * this.customModel.data = [
 * 	[new TableItem({data: "asdf"}), new TableItem({data: {name: "Lessy", link: "/table"}, template: this.customTableItemTemplate})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "swer"})],
 * 	[new TableItem({data: "bsdf"}), new TableItem({data: {name: "Alice", surname: "Bob"}, template: this.customTableItemTemplate})],
 * 	[new TableItem({data: "csdf"}), new TableItem({data: "twer"})],
 * ];
 * ```
 *
 * ### Sorting and filtering
 *
 * In case you need custom sorting and/or filtering you should subclass `TableHeaderItem`
 * and override needed functions.
 *
 * ```typescript
 * class FilterableHeaderItem extends TableHeaderItem {
 * 	// custom filter function
 * 	filter(item: TableItem): boolean {
 * 		if (typeof item.data === "string" && item.data.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0 ||
 * 		item.data.name && item.data.name.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0 ||
 * 		item.data.surname && item.data.surname.toLowerCase().indexOf(this.filterData.data.toLowerCase()) >= 0) {
 * 			return false;
 * 		}
 * 		return true;
 * 	}
 *
 * 	set filterCount(n) {}
 * 	get filterCount() {
 * 		return (this.filterData && this.filterData.data && this.filterData.data.length > 0) ? 1 : 0;
 * 	}
 *
 * 	// used for custom sorting
 * 	compare(one: TableItem, two: TableItem) {
 * 		const stringOne = (one.data.name || one.data.surname || one.data).toLowerCase();
 * 		const stringTwo = (two.data.name || two.data.surname || two.data).toLowerCase();
 *
 * 		if (stringOne > stringTwo) {
 * 			return 1;
 * 		} else if (stringOne < stringTwo) {
 * 			return -1;
 * 		} else {
 * 			return 0;
 * 		}
 * 	}
 * }
 * ```
 *
 * See `TableHeaderItem` class for more information.
 *
 * ## No data template
 *
 * When table has no data to show, it can show a message you provide it instead.
 *
 * ```html
 * <ibm-table [model]="model">No data.</ibm-table>
 * ```
 *
 * ... will show `No data.` message, but you can get creative and provide any template you want
 * to replace table's default `tbody`.
 *
 * ## Use pagination as table footer
 *
 * ```html
 * <ibm-pagination [model]="model" (selectPage)="selectPage($event)"></ibm-pagination>
 * ```
 *
 * `selectPage()` function should fetch the data from backend, create new `data`, apply it to `model.data`,
 * and update `model.currentPage`.
 *
 * If the data your server returns is a two dimensional array of objects, it would look something like this:
 *
 * ```typescript
 * selectPage(page) {
 * 	this.getPage(page).then((data: Array<Array<any>>) => {
 * 		// set the data and update page
 * 		this.model.data = this.prepareData(data);
 * 		this.model.currentPage = page;
 * 	});
 * }
 *
 * protected prepareData(data: Array<Array<any>>) {
 * 	// create new data from the service data
 * 	let newData = [];
 * 	data.forEach(dataRow => {
 * 		let row = [];
 * 		dataRow.forEach(dataElement => {
 * 			row.push(new TableItem({
 * 				data: dataElement,
 * 				template: typeof dataElement === "string" ? undefined : this.paginationTableItemTemplate
 * 				// your template can handle all the data types so you don't have to conditionally set it
 * 				// you can also set different templates for different columns based on index
 * 			}));
 * 		});
 * 		newData.push(row);
 * 	});
 * 	return newData;
 * }
 * ```
 *
 * @export
 * @class Table
 * @implements {AfterContentChecked}
 */
@Component({
	selector: "ibm-table",
	template: `
	<table
	class="bx--data-table-v2"
	[ngClass]="{
		'bx--data-table-v2--compact': size === 'sm',
		'bx--data-table-v2--tall': size === 'lg',
		'bx--data-table-v2--zebra': striped,
		'bx--skeleton': skeleton
	}">
		<thead>
			<tr>
				<th *ngIf="model.hasExpandableRows()"></th>
				<th *ngIf="!skeleton && showSelectionColumn">
					<ibm-checkbox
						[size]="size !== ('lg' ? 'sm' : 'md')"
						[(ngModel)]="selectAllCheckbox"
						[indeterminate]="selectAllCheckboxSomeSelected"
						aria-label="Select all rows"
						(change)="onSelectAllCheckboxChange()">
					</ibm-checkbox>
				</th>
				<ng-container *ngFor="let column of model.header; let i = index">
					<th [ngClass]='{"thead_action": column.filterTemplate || this.sort.observers.length > 0}'
					*ngIf="column.visible"
					[class]="column.className"
					[ngStyle]="column.style"
					[draggable]="columnsDraggable"
					(dragstart)="columnDragStart($event, i)"
					(dragend)="columnDragEnd($event, i)">
						<div
						*ngIf="columnsResizable"
						class="column-resize-handle"
						(mousedown)="columnResizeStart($event, column)">
						</div>
						<button
							class="bx--table-sort-v2"
							*ngIf="this.sort.observers.length > 0 && column.sortable"
							[ngClass]="{
								'bx--table-sort-v2--active': column.sorted,
								'bx--table-sort-v2--ascending': column.ascending
							}"
							(click)="sort.emit(i)">
							<span *ngIf="!column.template" [title]="column.data">{{column.data}}</span>
							<ng-template
								[ngTemplateOutlet]="column.template" [ngTemplateOutletContext]="{data: column.data}">
							</ng-template>
							<svg
							class="bx--table-sort-v2__icon"
							width="10" height="5" viewBox="0 0 10 5"
							[attr.aria-label]="(column.sorted && column.ascending ? sortDescendingLabel : sortAscendingLabel)"
							[attr.alt]="(column.sorted && column.ascending ? sortDescendingLabel : sortAscendingLabel)">
								<title>{{(column.sorted && column.ascending ? sortDescendingLabel : sortAscendingLabel)}}</title>
								<path d="M0 0l5 4.998L10 0z" fill-rule="evenodd" />
							</svg>
						</button>
						<span
							class="bx--table-header-label"
							*ngIf="!skeleton && this.sort.observers.length === 0 || (this.sort.observers.length > 0 && !column.sortable)">
							<span *ngIf="!column.template" [title]="column.data">{{column.data}}</span>
							<ng-template
								[ngTemplateOutlet]="column.template" [ngTemplateOutletContext]="{data: column.data}">
							</ng-template>
						</span>
						<button
							[ngClass]="{'active': column.filterCount > 0}"
							*ngIf="column.filterTemplate"
							type="button"
							aria-expanded="false"
							aria-haspopup="true"
							[ibmTooltip]="column.filterTemplate"
							trigger="click"
							[title]="translations.FILTER"
							placement="bottom,top"
							[data]="column.filterData">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon--sm"
								width="16"
								height="16"
								viewBox="0 0 16 16">
								<path d="M0 0v3l6 8v5h4v-5l6-8V0H0zm9 10.7V15H7v-4.3L1.3 3h13.5L9 10.7z"/>
							</svg>
							<span *ngIf="column.filterCount > 0">
								{{column.filterCount}}
							</span>
						</button>
						<div
						*ngIf="columnsDraggable && isColumnDragging"
						class="drop-area">
							<div
							*ngIf="columnDraggedHoverIndex == i && columnDraggedPosition == 'left'"
							class="drop-indicator-left"></div>
							<div
							class="drop-area-left"
							(dragenter)="columnDragEnter($event, 'left', i)"
							(dragleave)="columnDragLeave($event, 'left', i)"
							(dragover)="columnDragover($event, 'left', i)"
							(drop)="columnDrop($event, 'left', i)">
							</div>

							<div
							class="drop-area-right"
							(dragenter)="columnDragEnter($event, 'right', i)"
							(dragleave)="columnDragLeave($event, 'right', i)"
							(dragover)="columnDragover($event, 'right', i)"
							(drop)="columnDrop($event, 'right', i)">
							</div>
							<div
							*ngIf="columnDraggedHoverIndex == i && columnDraggedPosition == 'right'"
							class="drop-indicator-right"></div>
						</div>
					</th>
				</ng-container>
				<th *ngIf="!skeleton" [ngStyle]="{'width': scrollbarWidth + 'px', 'padding': 0, 'border': 0}">
					<!--
						Scrollbar pushes body to the left so this header column is added to push
						the title bar the same amount and keep the header and body columns aligned.
					-->
				</th>
			</tr>
		</thead>
		<tbody
		*ngIf="!noData; else noDataTemplate"
		[ngStyle]="{'overflow-y': 'scroll'}"
		(scroll)="onScroll($event)">
			<ng-container *ngFor="let row of model.data; let i = index">
				<tr *ngIf="!model.isRowFiltered(i)"
					(click)="onRowSelect(i)"
					[attr.data-parent-row]="(model.isRowExpandable(i) ? 'true' : null)"
					[ngClass]="{
						'bx--data-table-v2--selected': model.rowsSelected[i],
						'bx--parent-row-v2': model.isRowExpandable(i),
						'bx--expandable-row-v2': model.rowsExpanded[i],
						'tbody_row--selectable': enableSingleSelect,
						'tbody_row--success': !model.rowsSelected[i] && model.rowsContext[i] === 'success',
						'tbody_row--warning': !model.rowsSelected[i] && model.rowsContext[i] === 'warning',
						'tbody_row--info': !model.rowsSelected[i] && model.rowsContext[i] === 'info',
						'tbody_row--error': !model.rowsSelected[i] && model.rowsContext[i] === 'error'
					}">
					<td
					*ngIf="model.hasExpandableRows()"
					class="bx--table-expand-v2"
					[attr.data-previous-value]="(model.rowsExpanded[i] ? 'collapsed' : null)">
						<button
						*ngIf="model.isRowExpandable(i)"
						(click)="model.expandRow(i, !model.rowsExpanded[i])"
						[attr.aria-label]="expandButtonAriaLabel"
						class="bx--table-expand-v2__button">
							<svg class="bx--table-expand-v2__svg" width="7" height="12" viewBox="0 0 7 12">
								<path fill-rule="nonzero" d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z" />
							</svg>
						</button>
					</td>
					<td *ngIf="!skeleton && showSelectionColumn">
						<ibm-checkbox
							aria-label="Select row"
							[size]="size !== ('lg' ? 'sm' : 'md')"
							[(ngModel)]="model.rowsSelected[i]"
							(change)="onRowCheckboxChange(i)">
						</ibm-checkbox>
					</td>
					<ng-container *ngFor="let item of row; let j = index">
						<td *ngIf="model.header[j].visible"
							[class]="model.header[j].className"
							[ngStyle]="model.header[j].style">
							<ng-container *ngIf="!item.template">{{item.data}}</ng-container>
							<span *ngIf="skeleton && i === 0"></span>
							<ng-template
								[ngTemplateOutlet]="item.template" [ngTemplateOutletContext]="{data: item.data}">
							</ng-template>
						</td>
					</ng-container>
				</tr>
				<tr
				*ngIf="model.rowsExpanded[i]"
				class="bx--expandable-row-v2"
				[attr.data-child-row]="(model.rowsExpanded[i] ? 'true' : null)">
					<td [attr.colspan]="row.length + 2">
						<ng-container *ngIf="!firstExpandedTemplateInRow(row)">{{firstExpandedDataInRow(row)}}</ng-container>
						<ng-template
							[ngTemplateOutlet]="firstExpandedTemplateInRow(row)"
							[ngTemplateOutletContext]="{data: firstExpandedDataInRow(row)}">
						</ng-template>
					</td>
				</tr>
			</ng-container>
		</tbody>
		<ng-template #noDataTemplate><ng-content></ng-content></ng-template>
		<tfoot>
			<tr *ngIf="this.model.isLoading">
				<td class="table_loading-indicator">
					<ibm-static-icon icon="loading_rows" size="lg"></ibm-static-icon>
				</td>
			</tr>
			<tr *ngIf="this.model.isEnd">
				<td class="table_end-indicator">
					<h5>{{translations.END_OF_DATA}}</h5>
					<button (click)="scrollToTop($event)" class="btn--secondary-sm">
						{{translations.SCROLL_TOP}}
					</button>
				</td>
			</tr>
		</tfoot>
	</table>
	`
})
export class Table {
	/**
	 * Creates a skeleton model with a row and column count specified by the user
	 *
	 * @param {number} rowCount
	 * @param {number} columnCount
	 */
	static skeletonModelHeader(rowCount: number, columnCount: number) {
		const model = new TableModel();
		let header = new Array<TableHeaderItem>();
		let data = new Array<Array<TableItem>>();
		let row = new Array<TableItem>();

		for (let i = 0; i < columnCount; i++) {
			header.push(new TableHeaderItem());
			row.push(new TableItem());
		}
		for (let j = 0; j < rowCount - 1 ; j++) {
			data.push(row);
		}

		model.header = header;
		model.data = data;
		return model;
	}

	/**
	 * Size of the table rows.
	 *
	 * @type {("sm" | "md" | "lg")}
	 * @memberof Table
	 */
	@Input() size: "sm" | "md" | "lg" = "md";
	/**
	 * Set to `true` for a loading table.
	 */
	@Input() skeleton = false;
	/**
	 * Object of all the strings table needs.
	 * Defaults to the `TABLE` value from the i18n service.
	 */
	@Input() translations = this.i18n.get().TABLE;

	/**
	 * `TableModel` with data the table is to display.
	 *
	 * @type {TableModel}
	 * @memberof Table
	 */
	@Input()
	set model(m: TableModel) {
		if (this._model) {
			this._model.dataChange.unsubscribe();
			this._model.rowsSelectedChange.unsubscribe();
		}

		this._model = m;
		this._model.rowsSelectedChange.subscribe(() => this.updateSelectAllCheckbox());
		this._model.dataChange.subscribe(() => this.updateSelectAllCheckbox());
	}

	get model(): TableModel {
		return this._model;
	}

	/**
	 * Controls whether to show the selection checkboxes column or not.
	 *
	 * @deprecated in the next major carbon-components-angular version in favour of
	 * `showSelectionColumn` because of new attribute `enableSingleSelect`
	 *  please use `showSelectionColumn` instead
	 */
	@Input()
	set enableRowSelect(value: boolean) {
		this.showSelectionColumn = value;
	}

	get enableRowSelect () {
		return this.showSelectionColumn;
	}

	/**
	 * Controls whether to show the selection checkboxes column or not.
	 *
	 * @type {boolean}
	 * @memberof Table
	 */
	@Input() showSelectionColumn = true;

	/**
	 * Controls whether to enable multiple or single row selection.
	 *
	 * @type {boolean}
	 * @memberof Table
	 */
	@Input() enableSingleSelect = false;

	/**
	 * Distance (in px) from the bottom that view has to reach before
	 * `scrollLoad` event is emitted.
	 *
	 * @type {number}
	 * @memberof Table
	 */
	@Input() scrollLoadDistance = 0;

	/**
	 * Set to `true` to enable users to resize columns.
	 *
	 * Works for columns with width set in pixels.
	 *
	 * @memberof Table
	 */
	@Input() columnsResizable = false;

	/**
	 * Set to `true` to enable users to drag and drop columns.
	 *
	 * Changing the column order in table changes table model. Be aware of it when you add additional data
	 * to the model.
	 *
	 * @memberof Table
	 */
	@Input() columnsDraggable = false;

	@Input() expandButtonAriaLabel = "Expand row";
	@Input() sortDescendingLabel = "Sort rows by this header in descending order";
	@Input() sortAscendingLabel = "Sort rows by this header in ascending order";

	/**
	 * Controls if all checkboxes are viewed as selected.
	 *
	 * @type {boolean}
	 * @memberof Table
	 */
	selectAllCheckbox = false;

	/**
	 * Controls the indeterminate state of the header checkbox.
	 *
	 * @type {boolean}
	 * @memberof Table
	 */
	selectAllCheckboxSomeSelected = false;

	/**
	 * Set to `false` to remove table rows (zebra) stripes.
	 *
	 * @type {boolean}
	 * @memberof Table
	 */
	@Input() striped = true;

	/**
	 * Emits an index of the column that wants to be sorted.
	 *
	 * @memberof Table
	 */
	@Output() sort = new EventEmitter<number>();

	/**
	 * Emits if all rows are selected.
	 *
	 * @param {TableModel} model
	 * @memberof Table
	 */
	@Output() selectAll = new EventEmitter<Object>();

	/**
	 * Emits if all rows are deselected.
	 *
	 * @param {TableModel} model
	 * @memberof Table
	 */
	@Output() deselectAll = new EventEmitter<Object>();

	/**
	 * Emits if a single row is selected.
	 *
	 * @param {Object} ({model: this.model, selectedRowIndex: index})
	 * @memberof Table
	 */
	@Output() selectRow = new EventEmitter<Object>();

	/**
	 * Emits if a single row is deselected.
	 *
	 * @param {Object} ({model: this.model, deselectedRowIndex: index})
	 * @memberof Table
	 */
	@Output() deselectRow = new EventEmitter<Object>();

	/**
	 * Emits when table requires more data to be loaded.
	 *
	 * @param {TableModel} model
	 * @memberof Table
	 */
	@Output() scrollLoad = new EventEmitter<TableModel>();

	get noData() {
		return !this.model.data ||
			this.model.data.length === 0 ||
			this.model.data.length === 1 && this.model.data[0].length === 0;
	}

	protected _model: TableModel;

	protected columnResizeWidth: number;
	protected columnResizeMouseX: number;
	protected mouseMoveSubscription: Subscription;
	protected mouseUpSubscription: Subscription;

	protected isColumnDragging = false;
	protected columnDraggedHoverIndex = -1;
	protected columnDraggedPosition = "";

	/**
	 * Creates an instance of Table.
	 *
	 * @param {ApplicationRef} applicationRef
	 * @memberof Table
	 */
	constructor(protected applicationRef: ApplicationRef, protected i18n: I18n) {}

	columnResizeStart(event, column) {
		this.columnResizeWidth = parseInt(column.style.width, 10);
		this.columnResizeMouseX = event.clientX;
		event.preventDefault();

		this.mouseMoveSubscription = fromEvent(document.body, "mousemove").subscribe(event => {
			this.columnResizeProgress(event, column);
		});
		this.mouseUpSubscription = fromEvent(document.body, "mouseup").subscribe(event => {
			this.columnResizeEnd(event, column);
		});
	}

	columnResizeProgress(event, column) {
		const move = event.clientX - this.columnResizeMouseX;
		column.style.width = `${this.columnResizeWidth + move}px`;
	}

	columnResizeEnd(event, column) {
		this.mouseMoveSubscription.unsubscribe();
		this.mouseUpSubscription.unsubscribe();
	}

	onRowSelect(index: number) {
		if (!this.showSelectionColumn && this.enableSingleSelect) {
			this.model.rowsSelected.forEach((element, index) => {
				this.model.selectRow(index, false);
			});
			this.model.selectRow(index, !this.model.rowsSelected[index]);
		}
	}

	updateSelectAllCheckbox() {
		const selectedRowsCount = this.model.selectedRowsCount();

		if (selectedRowsCount <= 0) {
			// reset select all checkbox if nothing selected
			this.selectAllCheckbox = false;
			this.selectAllCheckboxSomeSelected = false;
		} else if (selectedRowsCount < this.model.data.length) {
			this.selectAllCheckboxSomeSelected = true;
		}
	}

	/**
	 * Triggered whenever the header checkbox is clicked.
	 * Updates all the checkboxes in the table view.
	 * Emits the `selectAll` or `deselectAll` event.
	 *
	 * @memberof Table
	 */
	onSelectAllCheckboxChange() {
		this.applicationRef.tick(); // give app time to process the click if needed

		if (this.selectAllCheckboxSomeSelected) {
			this.selectAllCheckbox = false; // clear all boxes
			this.deselectAll.emit(this.model);
		} else if (this.selectAllCheckbox) {
			this.selectAll.emit(this.model);
		} else {
			this.deselectAll.emit(this.model);
		}

		this.selectAllCheckboxSomeSelected = false;

		for (let i = 0; i < this.model.rowsSelected.length; i++) {
			this.model.rowsSelected[i] = this.selectAllCheckbox;
		}
	}

	/**
	 * Triggered when a single row is clicked.
	 * Updates the header checkbox state.
	 * Emits the `selectRow` or `deselectRow` event.
	 *
	 * @param {number} index
	 * @returns
	 * @memberof Table
	 */
	onRowCheckboxChange(index: number) {
		let startValue = this.model.rowsSelected[0];

		if (this.model.rowsSelected[index]) {
			this.selectRow.emit({model: this.model, selectedRowIndex: index});
		} else {
			this.deselectRow.emit({model: this.model, deselectedRowIndex: index});
		}

		for (let i = 1; i < this.model.rowsSelected.length; i++) {
			let one = this.model.rowsSelected[i];

			if (!!one !== !!startValue) {  // !! essentially converts to boolean and we want undefined to be false
				// set indeterminate
				this.selectAllCheckbox = false;
				this.selectAllCheckboxSomeSelected = true;
				return;
			}
		}

		this.selectAllCheckboxSomeSelected = false;
		this.selectAllCheckbox = startValue;
	}

	/**
	 * Triggered when the user scrolls on the `<tbody>` element.
	 * Emits the `scrollLoad` event.
	 *
	 * @param {any} event
	 * @memberof Table
	 */
	onScroll(event) {
		const distanceFromBottom = event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop;

		if (distanceFromBottom <= this.scrollLoadDistance) {
			this.scrollLoad.emit(this.model);
		} else {
			this.model.isEnd = false;
		}
	}

	columnDragStart(event, columnIndex) {
		this.isColumnDragging = true;
		this.columnDraggedHoverIndex = columnIndex;
		event.dataTransfer.setData("columnIndex", JSON.stringify(columnIndex));
	}

	columnDragEnd(event, columnIndex) {
		this.isColumnDragging = false;
		this.columnDraggedHoverIndex = -1;
	}

	columnDragEnter(event, position, columnIndex) {
		this.columnDraggedPosition = position;
		this.columnDraggedHoverIndex = columnIndex;
	}

	columnDragLeave(event, position, columnIndex) {
		this.columnDraggedPosition = "";
	}

	columnDragover(event, position, columnIndex) {
		this.columnDraggedHoverIndex = columnIndex;
		this.columnDraggedPosition = position;

		// needed to tell browser to allow dropping
		event.preventDefault();
	}

	columnDrop(event, position, columnIndex) {
		this.isColumnDragging = false;
		this.columnDraggedHoverIndex = -1;
		this.columnDraggedPosition = "";

		this.model.moveColumn(
			parseInt(event.dataTransfer.getData("columnIndex"), 10),
			columnIndex + (position === "right" ? 1 : 0)
		);
	}

	get scrollbarWidth() {
		return getScrollbarWidth();
	}

	firstExpandedDataInRow(row) {
		const found = row.find(d => d.expandedData);
		if (found) {
			return found.expandedData;
		}
		return found;
	}

	firstExpandedTemplateInRow(row) {
		const found = row.find(d => d.expandedTemplate);
		if (found) {
			return found.expandedTemplate;
		}
		return found;
	}
	/**
	 * Triggered when the user scrolls on the `<tbody>` element.
	 * Emits the `scrollLoad` event.
	 *
	 * @param {any} event
	 * @memberof Table
	 */
	scrollToTop(event) {
		event.target.parentElement.parentElement.parentElement.parentElement.children[1].scrollTop = 0;
		this.model.isEnd = false;
	}
}
