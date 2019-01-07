import {
	Directive,
	HostBinding,
	Input,
	OnInit
} from "@angular/core";

/**
 * A convinence directive for applying styling to a button.
 *
 * Example:
 *
 * ```hmtl
 * <button ibmButton>A button</button>
 * <button ibmButton="secondary">A secondary button</button>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/button/code) for more detail.
 */
@Directive({
	selector: "[ibmButton]"
})
export class Button implements OnInit {
	/**
	 * sets the button type
	 */
	@Input() ibmButton: "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger--primary" | "skeleton" = "primary";
	/**
	 * Specify the size of the button
	 */
	@Input() size: "normal" | "sm" = "normal";
	// a whole lot of HostBindings ... this way we don't have to touch the elementRef directly
	@HostBinding("class.bx--btn") baseClass = true;
	@HostBinding("class.bx--btn--primary") primary = true;
	@HostBinding("class.bx--skeleton") skeleton = false;
	@HostBinding("class.bx--btn--secondary") secondary = false;
	@HostBinding("class.bx--btn--tertiary") tertiary = false;
	@HostBinding("class.bx--btn--ghost") ghost = false;
	@HostBinding("class.bx--btn--danger") danger = false;
	@HostBinding("class.bx--btn--danger--primary") dangerPrimary = false;
	@HostBinding("class.bx--btn--sm") smallSize = false;

	ngOnInit() {
		if (this.size === "sm") {
			this.smallSize = true;
		}
		this.primary = false;
		switch (this.ibmButton) {
			case "primary": this.primary = true; break;
			case "skeleton": this.skeleton = true; break;
			case "secondary": this.secondary = true; break;
			case "tertiary": this.tertiary = true; break;
			case "ghost": this.ghost = true; break;
			case "danger": this.danger = true; break;
			case "danger--primary": this.dangerPrimary = true; break;
			default: this.primary = true; break;
		}
	}
}
