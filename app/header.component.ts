import { Component } from '@angular/core';

@Component({
    selector: 'my-header',
    template: `<h1>{{ title }}</h1>`
})
export class HeaderComponent {
  title = 'Hello World';
    
  constructor() {
    setTimeout(_ => {
        this.title = 'Updated!';
    }, 5000);   
  }
}