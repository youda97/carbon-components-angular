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
					<ibm-structured-list-row head="true">
						<ibm-structured-list-cell head="true">Column1</ibm-structured-list-cell>
						<ibm-structured-list-cell head="true">Column2</ibm-structured-list-cell>
						<ibm-structured-list-cell head="true">Column3</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-head>
				<ibm-structured-list-body>
					<ibm-structured-list-row>
						<ibm-structured-list-cell noWrap="true">Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</ibm-structured-list-row>
					<ibm-structured-list-row>
						<ibm-structured-list-cell noWrap="true">Row 2</ibm-structured-list-cell>
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
	.add("Selection", () => ({
		template: `
			<ibm-structured-list selection="true" border="true">
				<ibm-structured-list-head>
					<ibm-structured-list-row head="true">
						<ibm-structured-list-cell head="true"></ibm-structured-list-cell>
						<ibm-structured-list-cell head="true">Column1</ibm-structured-list-cell>
						<ibm-structured-list-cell head="true">Column2</ibm-structured-list-cell>
						<ibm-structured-list-cell head="true">Column3</ibm-structured-list-cell>
					</ibm-structured-list-row>
				</ibm-structured-list-head>

				<ibm-structured-list-body>
					<label ibmStructuredListRow>
						<ibm-structured-list-input checked="true"></ibm-structured-list-input>
						<ibm-structured-list-cell noWrap="true">Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 1</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</label>

					<label ibmStructuredListRow>
						<ibm-structured-list-input></ibm-structured-list-input>
						<ibm-structured-list-cell noWrap="true">Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 2</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</label>

					<label ibmStructuredListRow>
						<ibm-structured-list-input></ibm-structured-list-input>
						<ibm-structured-list-cell noWrap="true">Row 3</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 3</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</label>

					<label ibmStructuredListRow>
						<ibm-structured-list-input></ibm-structured-list-input>
						<ibm-structured-list-cell noWrap="true">Row 4</ibm-structured-list-cell>
						<ibm-structured-list-cell>Row 4</ibm-structured-list-cell>
						<ibm-structured-list-cell>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
							magna, finibus id tortor sed, aliquet bibendum augue. Aenean
							posuere sem vel euismod dignissim. Nulla ut cursus dolor.
							Pellentesque vulputate nisl a porttitor interdum.
						</ibm-structured-list-cell>
					</label>
				</ibm-structured-list-body>
			</ibm-structured-list>
		`
	}));

