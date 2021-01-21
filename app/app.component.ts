import { ApplicationRef, ComponentFactoryResolver, Component, OnInit, Injector, TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { HeaderComponent } from './header.component';
import { DomPortalHost, Portal, TemplatePortal } from '@angular/cdk/portal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';


@Component({
  selector: 'my-app',
  template: `
       <h1> Reactive Contact Form Example </h1>
<div>
<form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
  <input type = "text" name = "fullName" placeholder = "Your full name" formControlName="fullName" >
  <br/>
  
  <input type = "email" name = "email" placeholder = "Your email" formControlName="email" >
  <br/>
  
  <textarea name = "message" placeholder = "Your message" formControlName="message" ></textarea>
  <br/>

</form>

 <div #addTypeRef>
          <button 
            (click)="addType(addTypeRef,templateRef)">
            Next
          </button>
</div>

<ng-template #templateRef>
  <table>
      <thead>
    <tr>
      <th *ngFor="let column of header">{{column}}</th>
    </tr>
  </thead>
  <tbody>
    <tr my-active *ngFor="let row of tableData; index as rowIndex">
      <td>{{row.fullName}}</td>
       <td>{{row.email}}</td>
    </tr>
  </tbody>
  </table>
</ng-template>
</div>
`,
})
export class AppComponent {
     
  contactForm: FormGroup;
  header=['name','email']
  tableData=[]
   private overlayRef: OverlayRef;
  constructor(private formBuilder: FormBuilder,
  public viewContainerRef: ViewContainerRef,
   private overlay: Overlay) {
    this.createContactForm();
  }



  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: [''],  
      email: [''],
      message: ['']
    });
  }




  addType(addTypeRef,templateRef){
        //   if (this.overlayRef && this.overlayRef.hostElement) {
        //     this.overlayRef.dispose();
        //     return;
        // }
        const overlayConfig: OverlayConfig = new OverlayConfig();
        overlayConfig.hasBackdrop = true;
        overlayConfig.backdropClass = '';
        overlayConfig.positionStrategy = this.overlay.position().connectedTo(addTypeRef, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
        // create overlay
        this.overlayRef = this.overlay.create(overlayConfig);
        // instance of conformation modal component
        const portal
            = new TemplatePortal(templateRef, this.viewContainerRef, { $implicit: this.tableData.push(this.contactForm.value) });
        // attach component portal 
        const componentRef: EmbeddedViewRef<any> = this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });

  }
}

