import { Component, Input, OnInit } from '@angular/core';
import { PageProduce } from '@pepperi-addons/papi-sdk';

@Component({
  selector: 'producer-display[pageProduce]',
  templateUrl: './producer-display.component.html',
  styleUrls: ['./producer-display.component.scss']
})
export class ProducerDisplayComponent implements OnInit {

  @Input() pageProduce : PageProduce;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
