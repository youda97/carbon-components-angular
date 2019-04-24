import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, text, select } from "@storybook/addon-knobs/angular";
import { ModalModule, InputModule, ButtonModule } from "../";
import { Component, Input, Inject, AfterContentInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Modal, ModalService } from "../";
import { ModalButton, AlertModalType, ModalButtonType } from "./alert-modal.interface";
import { PlaceholderModule } from "./../placeholder/placeholder.module";
import { BaseModal } from "./base-modal.class";

@Component({
	selector: "app-sample-modal",
	template: `
		<ibm-modal>
			<ibm-modal-header (closeSelect)="closeModal()">
				<p class="bx--modal-header__label bx--type-delta">{{label}}</p>
				<p class="bx--modal-header__heading bx--type-beta">{{heading}}</p>
			</ibm-modal-header>
			<section class="bx--modal-content">
			<ibm-label>
				{{inputLabel}}
				<input ibmText modal-primary-focus placeholder="Optional placeholder text">
			</ibm-label>
			</section>
			<ibm-modal-footer>
				<button class="bx--btn bx--btn--secondary" (click)="closeModal()">Secondary Button</button>
				<button class="bx--btn bx--btn--primary"  (click)="showSecondaryModal()">Primary Button</button>
			</ibm-modal-footer>
		</ibm-modal>
	`
})
class SampleModal extends BaseModal {
	constructor(
		@Inject("inputLabel") public inputLabel,
		@Inject("label") public label,
		@Inject("heading") public heading,
		protected modalService: ModalService) {
		super();
	}

	showSecondaryModal() {
		this.modalService.show({
			modalTitle: "Confirmation",
			modalContent: "Are you sure you want you want to submit?",
			buttons: [{
				text: "No",
				type: ModalButtonType.secondary
			}, {
				text: "Yes",
				type: ModalButtonType.primary,
				click: () => alert("Yes button clicked")
			}]
		});
	}
}

@Component({
	selector: "app-modal-story",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="openModal()">Open Modal</button>
	`
})
class ModalStory {
	@Input() inputLabel: string;
	@Input() label: string;
	@Input() heading: string;

	constructor(protected modalService: ModalService) { }

	openModal() {
		this.modalService.create({
			component: SampleModal,
			inputs: {
				inputLabel: this.inputLabel,
				label: this.label,
				heading: this.heading
			}
		});
	}
}


@Component({
	selector: "app-alert-modal-story",
	template: `
		<button [ibmButton]="buttonType" (click)="openModal()">Open Modal</button>
	`
})
class AlertModalStory implements AfterContentInit {
	@Input() modalType: AlertModalType;
	@Input() modalLabel: string;
	@Input() modalTitle: string;
	@Input() modalContent: string;
	@Input() primaryButtonText: string;
	@Input() secondaryButtonText: string;
	@Input() buttons: Array<ModalButton>;
	@Input() isPassive = false;
	@Input() buttonType = "primary";

	constructor(protected modalService: ModalService) { }

	openModal() {
		this.modalService.show({
			modalType: this.modalType,
			label: this.modalLabel,
			title: this.modalTitle,
			content: this.modalContent,
			buttons: this.buttons
		});
	}

	ngAfterContentInit() {
		if (this.modalType === "danger") {
			this.buttonType = "danger";
		}
		if (!this.isPassive) {
			this.buttons = [{
				text: this.secondaryButtonText,
				type: "secondary"
			}, {
				text: this.primaryButtonText,
				type:  this.getType(),
				primaryFocus: true,
				click: () => alert("Delete button clicked")
			}] as Array<ModalButton>;
		}
	}

	getType() {
		if (this.modalType === "danger") {
			return "danger";
		} else {
			return "primary";
		}
	}
}

storiesOf("Modal", module)
	.addDecorator(
		moduleMetadata({
			declarations: [
				ModalStory,
				SampleModal,
				AlertModalStory
			],
			imports: [
				ModalModule,
				PlaceholderModule,
				InputModule,
				ButtonModule,
				BrowserAnimationsModule
			],
			entryComponents: [
				SampleModal
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Transactional", () => ({
		template: `
		<app-alert-modal-story
			[primaryButtonText]="primaryButtonText"
			[secondaryButtonText]="secondaryButtonText"
			[modalType]="modalType"
			[modalLabel]="modalLabel"
			[modalTitle]="modalTitle"
			[modalContent]="modalContent">
		</app-alert-modal-story>
		<ibm-placeholder></ibm-placeholder>
		`,
		props: {
			modalType: select("modalType", ["default", "danger"], "default"),
			modalLabel: text("modalLabel", "optional label"),
			modalTitle: text("modalTitle", "Delete service from application"),
			modalContent: text("modalContent", `Are you sure you want to remove the Speech to Text service from the node-test app?`),
			primaryButtonText: text("Primary button text", "Primary Button"),
			secondaryButtonText: text("Secondary button text", "Secondary Button")
		}
	}))
	.add("Passive", () => ({
		template: `
		<app-alert-modal-story
			[isPassive]="true"
			[modalType]="modalType"
			[modalLabel]="modalLabel"
			[modalTitle]="modalTitle"
			[modalContent]="modalContent">
		</app-alert-modal-story>
		<ibm-placeholder></ibm-placeholder>
		`,
		props: {
			modalType: select("modalType", ["default", "danger"], "default"),
			modalLabel: text("modalLabel", "optional label"),
			modalTitle: text("modalTitle", "Passive modal title"),
			modalContent: text("modalContent", "Passive modal notifications should only appear if there is an action " +
				"the user needs to address immediately. Passive modal notifications are persistent on screen")
		}
	}))
	.add("Input", () => ({
		template: `
		<app-modal-story [inputLabel]="inputLabel" [heading]="heading" [label]="label"></app-modal-story>
		<ibm-placeholder></ibm-placeholder>
		`,
		props: {
			label: text("Label", "Optional label"),
			heading: text("Heading", "Modal heading"),
			inputLabel: text("Input label", "Text Input Label")
		}
	}));
