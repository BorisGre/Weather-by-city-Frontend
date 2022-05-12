import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-element',
  templateUrl: './repo-element.component.html',
  styleUrls: ['./repo-element.component.css']
})
export class RepoElementComponent implements OnInit {

  @Input() repo: string = "Test";

  constructor() { }

  ngOnInit(): void {
  }

}
