import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  carousel1 = 'assets/11.jpg';
  carousel2 = 'assets/22.jpeg';
  carousel3 = 'assets/3.jpg';

  constructor() {}

  ngOnInit(): void {}
  handleCopy() {
    console.log('prevent Copy');
    alert("You can't! copy");
  }
}
