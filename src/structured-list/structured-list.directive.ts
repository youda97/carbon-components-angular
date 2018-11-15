import { Directive, HostBinding, ElementRef, OnInit, Input, HostListener } from "@angular/core";

/**
 * A directive for applying styling to an input element.
 *
 * Example:
 *
 * ```html
 * <input ibmText/>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/text-input/code) for more detail.
 */
@Directive({
	selector: "[ibmStructuredListRow]"
})
export class StructuredListRowDirective {
	@HostBinding("class.bx--structured-list-row") rowClass = true;
	@HostBinding("tabIndex") tabindex = 0;
	@HostBinding("class.bx--structured-list-row--selected") get selectedClass() {
		return this.elementRef.nativeElement.querySelector(".bx--structured-list-input:checked");
	}

	constructor(private elementRef: ElementRef) {}

	@HostListener("click", ["$event"])
	onClick() {
		this.selectedClass();
	}
}
