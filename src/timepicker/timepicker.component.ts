import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	TemplateRef
} from "@angular/core";

/**
 * [See demo](../../?path=/story/time-picker--simple)
 *
 * <example-url>../../iframe.html?id=time-picker--simple</example-url>
 *
 * @export
 * @class TimePicker
 */
@Component({
	selector: "ibm-timepicker",
	template: `
		<div class="bx--time-picker" [attr.data-invalid]="(invalid ? '' : null)">
			<div class="bx--time-picker__input">
				<label *ngIf="!skeleton" [for]="id" class="bx--label">
					<ng-container *ngIf="!isTemplate(label)">{{label}}</ng-container>
					<ng-template *ngIf="isTemplate(label)" [ngTemplateOutlet]="label"></ng-template>
				</label>
				<input
					[ngClass]="{
						'bx--select--light': theme === 'light',
						'bx--skeleton': skeleton
					}"
					[value]="(value ? value : null)"
					[placeholder]="placeholder"
					[pattern]="pattern"
					[attr.id]="id"
					[disabled]="disabled"
					maxlength="5"
					(change)="onChange($event)"
					type="text"
					class="bx--time-picker__input-field bx--text-input"
					[ngClass]="{ 'bx--text-input--light': theme === 'light' }">
			</div>
			<ng-content></ng-content>
		</div>
		<div *ngIf="invalid" class="bx--form-requirement">
			{{invalidText}}
		</div>
	`
})
export class TimePicker {
	/**
	 * Tracks the total number of selects instantiated. Used to generate unique IDs
	 */
	static timePickerCount = 0;

	@HostBinding("class.bx--form-item") timePicker = true;

	@Input() label: string | TemplateRef<any>;
	@Input() placeholder = "hh:mm";
	@Input() pattern = "(1[012]|[0-9]):[0-5][0-9]";
	@Input() id = `timepicker-${TimePicker.timePickerCount++}`;
	@Input() disabled = false;
	@Input() invalid = false;
	@Input() value: string;
	@Input() invalidText: string;

	/**
	 * Set to true for a loading select.
	 */
	@Input() skeleton = false;

	/**
	 * `light` or `dark` select theme
	 */
	@Input() theme: "light" | "dark" = "dark";

	@Output() valueChange: EventEmitter<string> = new EventEmitter();

	onChange(event) {
		this.valueChange.emit(event.target.value);
	}

	public isTemplate(value) {
		return value instanceof TemplateRef;
	}
}
