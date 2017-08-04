import { Component } from '@angular/core';
import { ComponentPageTitle } from './../../../shared/page-title/page-title';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls:["./counter.component.scss"]
})
export class CounterComponent {
    constructor(public _componentPageTitle: ComponentPageTitle){
        _componentPageTitle.title = "Counter";
    }
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
