import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withNotes } from "@storybook/addon-notes";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, object } from "@storybook/addon-knobs/angular";

import { GridModule, TilesModule } from "../";


storiesOf("Grid", module)
	.addDecorator(
		moduleMetadata({
			imports: [GridModule, TilesModule]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div ibmGrid style="outline: 1px dashed #97c1ff;">
				<div class="bx--tile-container" style="width: 100%">
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':12}"><ibm-tile></ibm-tile></div>
					</div>
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'sm':6, 'xs': 6}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'sm':6, 'xs': 6}"><ibm-tile></ibm-tile></div>
					</div>
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':4, 'sm': 4}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':4, 'sm': 4}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':4, 'sm': 4}"><ibm-tile></ibm-tile></div>

					</div>
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':3, 'sm': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':3, 'sm': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':3, 'sm': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':3, 'sm': 12}"><ibm-tile></ibm-tile></div>
					</div>
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'lg':2, 'md': 12}"><ibm-tile></ibm-tile></div>
					</div>
					<div ibmRow>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':8, 'sm': 8}"><ibm-tile></ibm-tile></div>
						<div ibmCol class="bx--col" [columnNumbers]="{'md':4, 'sm': 4}"><ibm-tile></ibm-tile></div>
					</div>
				</div>
         	</div>
		`,
		styles: [`
			.bx--col {
				margin-bottom: 1rem;
				flex-basis: 0;
				flex-grow: 1;
				max-width: 100%;
				width: 100%;
				padding-right: 1rem;
				padding-left: 1rem;
			}
		`]
	}));
