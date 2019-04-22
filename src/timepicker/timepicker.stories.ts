import { action } from "@storybook/addon-actions";
import { TimePickerSelectModule } from "../timepicker-select/timepicker-select.module";
import { TimePickerModule } from "./timepicker.module";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs/angular";
import { ExperimentalModule } from "..";

storiesOf("Time Picker", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TimePickerModule,
				ExperimentalModule,
				TimePickerSelectModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<ibm-timepicker
			(valueChange)="timePickerChange($event)"
			[theme]="theme"
			[invalid]="invalid"
			[invalidText]="invalidText"
			[placeholder]="placeholder"
			[disabled]="disableTime"
			[label]="label">
			<ibm-timepicker-select (valueChange)="timePickerSelectChange($event)" [disabled]="disabledSelect" display="inline">
				<option selected value="AM">AM</option>
				<option value="PM">PM</option>
			</ibm-timepicker-select>
			<ibm-timepicker-select (valueChange)="timePickerSelectChange($event)" [disabled]="disabledSelect" display="inline">
				<option selected value="Time Zone 1">Time Zone 1</option>
				<option value="Time Zone 2">Time Zone 2</option>
			</ibm-timepicker-select>
		</ibm-timepicker>

		`,
		props: {
			timePickerChange : action("Time picker change fired"),
			timePickerSelectChange: action("Time picker select change fired"),
			theme: select("Theme", ["dark", "light"], "dark"),
			disableTime: boolean("disabled time", false),
			disabledSelect: boolean("disabled selects", false),
			invalid: boolean("Show form validation", false),
			invalidText: text("Form validation content", "Invalid time."),
			label: text("Label text", "select a time"),
			placeholder: text("Placeholder text", "hh:mm")
		}
	}));
