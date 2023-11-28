import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export makes the class accessible
export class AppComponent {
  title = 'appointment-app';
  items: string[]=['item1','item2'];

// no need for return type
  log(text: string): void {
    var message: string='Message '+text;
    console.log(message)
  }
// no need for return type
  sum(a:number, b:number): number{
    return a+b;
  }
  f(){
    this.log('a')
    this.log('b')
  }
  // number, string, boolean primitive datatypes in Typescript
  // var app : AppComponent=new AppComponent();



}
