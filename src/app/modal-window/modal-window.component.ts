import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  @Input() closeModal:any
  @Input() cityName: string
  constructor() { }

  ngOnInit(): void {}
}
