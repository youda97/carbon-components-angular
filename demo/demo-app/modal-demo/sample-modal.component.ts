import { Component, Injector } from "@angular/core";
import { Modal } from "../../../src";

@Modal()
@Component({
	selector: "app-sample-modal",
	template: `
		<n-modal size="xl" (overlaySelected)="closeModal()">
			<n-modal-header (closeSelect)="closeModal()">Header text</n-modal-header>
			<section class="modal-body">
				<h1>Sample modal works.</h1>
				<button class="btn--icon-link" nPopover="Hello there" title="Popover title" placement="right" appendToBody="true">
					<n-icon icon="info" size="sm"></n-icon>
				</button>
				{{modalText}}
			</section>
			<n-modal-footer><button class="btn--primary cancel-button" (click)="closeModal()">Close</button></n-modal-footer>
		</n-modal>
	`,
	styleUrls: ["./sample-modal.component.scss"]
})
export class SampleModalComponent {
	modalText: string;
	constructor(private injector: Injector) {
		this.modalText = this.injector.get("modalText");
	}
}
