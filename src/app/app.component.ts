import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from 'flowbite';
import { NgxSonnerToaster } from 'ngx-sonner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'my-library';

  ngOnInit(): void {
    initFlowbite();
  }
}
