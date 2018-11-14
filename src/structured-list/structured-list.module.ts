import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
	StructuredList,
	StructuredListHead,
	StructuredListRow,
	StructuredListBody,
	StructuredListCell,
	StructuredListInput
} from "./structured-list.component";

export {
	StructuredList,
	StructuredListHead,
	StructuredListRow,
	StructuredListBody,
	StructuredListCell,
	StructuredListInput
} from "./structured-list.component";

@NgModule({
	declarations: [
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListBody,
		StructuredListCell,
		StructuredListInput
	],
	exports: [
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListBody,
		StructuredListCell,
		StructuredListInput
	],
	imports: [CommonModule]
})
export class StructuredListModule { }
