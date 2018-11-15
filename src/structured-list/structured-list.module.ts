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

import { StructuredListRowDirective } from "./structured-list.directive";

export {
	StructuredList,
	StructuredListHead,
	StructuredListRow,
	StructuredListBody,
	StructuredListCell,
	StructuredListInput
} from "./structured-list.component";

export { StructuredListRowDirective } from "./structured-list.directive";



@NgModule({
	declarations: [
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListBody,
		StructuredListCell,
		StructuredListInput,
		StructuredListRowDirective
	],
	exports: [
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListBody,
		StructuredListCell,
		StructuredListInput,
		StructuredListRowDirective
	],
	imports: [CommonModule]
})
export class StructuredListModule { }
