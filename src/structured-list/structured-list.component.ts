import {
	Component,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	HostBinding,
	HostListener,
	QueryList,
	OnInit,
	ContentChildren,
	forwardRef,
	ContentChild
} from "@angular/core";



/**
 * This is a sample component to demonstrate how components should be written, and can be used as a template for new components
 */
@Component({
	selector: "ibm-structured-list",
	template: `
		<section
			class="bx--structured-list"
			[ngClass]="{
				'bx--structured-list--border': selection,
				'bx--structured-list--selection': border
			}">
			<ng-content></ng-content>
		</section>
	`
})
export class StructuredList {
	@Input() selection = false;
	@Input() border = false;
}

@Component({
	selector: "ibm-structured-list-head",
	template: `<ng-content></ng-content>`
})
export class StructuredListHead {
	@HostBinding("class.bx--structured-list-thead") className = true;
}



@Component({
	selector: "ibm-structured-list-row",
	template: `
		<ng-container *ngIf="label; else content">
				<input
				type="radio"
				tabIndex="-1"
				class="bx--structured-list-input"
				[id]="id"
				[value]="id"
				[title]="id"
				[checked]="checked"/>
				<ibm-structured-list-cell>
					<svg class="bx--structured-list-svg" width="16" height="16" viewBox="0 0 16 16">
						<path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
							fill-rule="evenodd" />
					</svg>
				</ibm-structured-list-cell>
				<ng-container *ngTemplateOutlet="content"></ng-container>
		</ng-container>

		<ng-template #content>
			<ng-content></ng-content>
		</ng-template>
	`
})
export class StructuredListRow {
	static rowCount = 0;

	tabIndex = 0;
	@Input() label = false;
	@Input() head = false;
	@Input() checked = false;
	@Input() id = `row-${StructuredListRow.rowCount}`;
	// @Input() name;
	@Input() defaultChecked = false;

	@HostBinding("class.bx--structured-list-row") rowClass = true;
	@HostBinding("class.bx--structured-list-row--header-row") get headerClass() {
		return this.head;
	}

	@HostBinding("class.bx--structured-list-row--selected") get selectedClass() {
		return this.checked;
	}

	constructor(private elementRef: ElementRef) {
		StructuredListRow.rowCount++;
	}

	// @HostListener("click", ["$event"])
	// clickClose() {
	// 	this.checked = !this.checked;
	// }
}


@Component({
	selector: "ibm-structured-list-body",
	template: `<ng-content></ng-content>`
})
export class StructuredListBody implements OnInit {
	@HostBinding("class.bx--structured-list-tbody") className = true;

	public rows: QueryList<StructuredListRow>;

	// tslint:disable-next-line:no-forward-ref
	@ContentChildren(forwardRef(() => StructuredListRow)) list: QueryList<StructuredListRow>;

	@ContentChildren(StructuredListRow) structuredListRow: QueryList<StructuredListRow>;

	@ContentChildren(StructuredListRow, {read: ElementRef}) children: QueryList<ElementRef>;


	ngOnInit() {
		console.log(this.children);
	}

}


@Component({
	selector: "ibm-structured-list-cell",
	template: `<ng-content></ng-content>`
})
export class StructuredListCell {
	@Input() head = false;
	@Input() @HostBinding("class.bx--structured-list-content--nowrap") noWrap = false;

	@HostBinding("class.bx--structured-list-th") get headerClass() {
		return this.head;
	}
	@HostBinding("class.bx--structured-list-td") get bodyClass() {
		return !this.head;
	}
}

@Component({
	selector: "ibm-structured-list-input",
	template: `

	`
})
export class StructuredListInput {

}
