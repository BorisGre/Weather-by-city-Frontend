
import { Component, OnInit, Input } from '@angular/core';
import { GithubRepos }  from '../shared/github-repos'

@Component({
  selector: 'repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  constructor(repository: GithubRepos) {}

  ngOnInit(): void {
  }

  @Input() repository: GithubRepos;

}