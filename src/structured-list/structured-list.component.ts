import {
	Component,
	Input,
	Output,
	ElementRef,
	HostBinding,
	OnInit
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
	static listCount = 0;

	@Input() selection = false;
	@Input() border = false;

	constructor() {
		StructuredList.listCount++;
	}
}

@Component({
	selector: "ibm-structured-list-head",
	template: `<ng-content></ng-content>`
})
export class StructuredListHead {
	@HostBinding("class.bx--structured-list-thead") className = true;
}

@Component({
	selector: "ibm-structured-list-body",
	template: `<ng-content></ng-content>`
})
export class StructuredListBody {
	@HostBinding("class.bx--structured-list-tbody") className = true;
}

@Component({
	selector: "ibm-structured-list-row",
	template: `<ng-content></ng-content>`
})
export class StructuredListRow {
	@Input() @HostBinding("class.bx--structured-list-row--header-row") head = false;

	@HostBinding("tabIndex") tabindex = -1;
	@HostBinding("class.bx--structured-list-row") rowClass = true;
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
		<input tabindex="-1" class="bx--structured-list-input" [value]="id" type="radio" [name]="name" [title]="id" [checked]="checked"/>
		<ibm-structured-list-cell>
			<svg class="bx--structured-list-svg" width="16" height="16" viewBox="0 0 16 16">
				<path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
					fill-rule="evenodd" />
			</svg>
		</ibm-structured-list-cell>
	`
})
export class StructuredListInput {
	static rowCount = 0;
	@Input() id = `row-${StructuredListInput.rowCount}`;
	@Input() name = `list-${StructuredList.listCount}`;

	@Input() checked = false;

	constructor(private elementRef: ElementRef) {
		StructuredListInput.rowCount++;
	}
}
