import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-view',
  standalone: true,
  imports: [],
  templateUrl: './empty-view.component.html',
  styleUrl: './empty-view.component.scss',
})
export class EmptyViewComponent implements OnInit {
  ngOnInit(): void {}
}
