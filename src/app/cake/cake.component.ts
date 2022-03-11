import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css'],
})
export class CakeComponent implements OnInit {
  @Input() cake: any; //this cake has to be received as input from parent component

  // Step 1 for the passing data from child to parent
  // Create output event using Event Emitter

  @Output() discount: any = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cakeDetail() {
    this.router.navigate(['/cakedetail/' + this.cake.cakeid]);
  }

  //discount fucntion to place in parent component
  applyDiscount() {
    this.discount.emit(10);
  }
}
