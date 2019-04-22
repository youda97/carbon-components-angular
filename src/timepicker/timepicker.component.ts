import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding
} from "@angular/core";

@Component({
	selector: "ibm-timepicker",
	template: `
		<label *ngIf="!skeleton" [attr.for]="id" class="bx--label">{{label}}</label>
		<div class="bx--time-picker" [attr.data-invalid]="(invalid ? '' : null)">
			<div
				[ngClass]="{
					'bx--select--light': theme === 'light',
					'bx--skeleton': skeleton
				}"
				class="bx--time-picker__input">
				<input
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

	@Input() label;
	@Input() theme: "light" | "dark" = "dark";
	@Input() placeholder = "hh:mm";
	@Input() pattern = "(1[012]|[0-9]):[0-5][0-9]";
	@Input() id = `timepicker-${TimePicker.timePickerCount++}`;
	@Input() disabled = false;
	@Input() invalid = false;
	@Input() value: string;
	@Input() invalidText: string;

	@Output() valueChange: EventEmitter<string> = new EventEmitter();

	onChange(event) {
		this.valueChange.emit(event.target.value);
	}
}
