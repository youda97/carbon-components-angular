import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withNotes } from "@storybook/addon-notes";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, object } from "@storybook/addon-knobs/angular";

import { StructuredListModule } from "../";

storiesOf("Structured List", module)
	.addDecorator(
		moduleMetadata({
			imports: [StructuredListModule]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<ibm-structured-list>
				<ibm-structured-list-head>
					<ibm-structured-list-row [head]="true">
						<ibm-structured-list-cell [head]="true">Column1</ibm-structured-list-cell>
						<ibm-structured-list-cell [head]="true">Column2</ibm-structured-list-cell>
						<ibm-structured-list-cell [head]="true">Column3</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-head>
				<ibm-structured-list-body>
					<ibm-structured-list-row>
						<ibm-structured-list-cell [noWrap]="true">Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</ibm-structured-list-row>
					<ibm-structured-list-row>
						<ibm-structured-list-cell [noWrap]="true">Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-body>
			</ibm-structured-list>
		`
	}))
	.add("With Selection", () => ({
		template: `
			<ibm-structured-list [selection]="true" [border]="true">
				<ibm-structured-list-head>
					<ibm-structured-list-row [head]="true">
						<ibm-structured-list-cell [head]="true"></ibm-structured-list-cell>
						<ibm-structured-list-cell [head]="true">Column1</ibm-structured-list-cell>
						<ibm-structured-list-cell [head]="true">Column2</ibm-structured-list-cell>
						<ibm-structured-list-cell [head]="true">Column3</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-head>
				<ibm-structured-list-body>
					<ibm-structured-list-row [label]="true" [checked]="true">
						<ibm-structured-list-cell [noWrap]="true">Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</ibm-structured-list-row>

					<ibm-structured-list-row [label]="true">
						<ibm-structured-list-cell [noWrap]="true">Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-body>
			</ibm-structured-list>



			<section class="bx--structured-list bx--structured-list--border bx--structured-list--selection">
				<div class="bx--structured-list-thead">
					<div class="bx--structured-list-row bx--structured-list-row--header-row">
						<div class="bx--structured-list-th"></div>
						<div class="bx--structured-list-th">Column1</div>
						<div class="bx--structured-list-th">Column2</div>
						<div class="bx--structured-list-th">Column3</div>
					</div>
				</div>
				<div class="bx--structured-list-tbody">
					<label aria-label="apache spark" class="bx--structured-list-row bx--structured-list-row--selected" tabindex="0">
						<input tabindex="-1" class="bx--structured-list-input" value="apache spark" type="radio" name="services" title="apache spark"/>
						<div class="bx--structured-list-td">
							<svg class="bx--structured-list-svg" width="16" height="16" viewBox="0 0 16 16">
								<path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
									fill-rule="evenodd" />
							</svg>
						</div>
						<div class="bx--structured-list-td bx--structured-list-content--nowrap">Row 1</div>
						<div class="bx--structured-list-td">Row 1</div>
						<div class="bx--structured-list-td">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
							Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</div>
					</label>
					<label aria-label="Cloudant" class="bx--structured-list-row" tabindex="0">
						<input tabindex="-1" class="bx--structured-list-input" value="Cloudant" type="radio" name="services" title="Cloudant" />
						<div class="bx--structured-list-td">
							<svg class="bx--structured-list-svg" width="16" height="16" viewBox="0 0 16 16">
								<path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
								fill-rule="evenodd" />
							</svg>
						</div>
						<div class="bx--structured-list-td bx--structured-list-content--nowrap">Row 2</div>
						<div class="bx--structured-list-td">Row 2</div>
						<div class="bx--structured-list-td">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
							Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</div>
					</label>
				</div>
			</section>
		`
	}));

