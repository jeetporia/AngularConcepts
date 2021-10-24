import { Component, EventEmitter, Input, OnInit, OnDestroy, OnChanges , Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  @Input() init : number = null;
  @Output() OnDecrease = new EventEmitter<number>();
  @Output() OnComplete = new EventEmitter<void>();
  private timerRef: any = null;
  public counter : number = 0;
  constructor() { }

  ngOnInit() :void{
    this.startCountDown();
  }

  ngOnChanges(changes): void {
    console.log('New Changes', changes.init.currentValue);
    this.startCountDown();
  }

  startCountDown() {
    if(this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown() {
    this.timerRef = setTimeout(()=> {
      this.counter = this.counter - 1;
      this.processCount();
    }, 1000)
  }

  private clearTimeout() {
    if(this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }

  processCount() {
    this.OnDecrease.emit(this.counter);
    console.log('Counter is', this.counter);
    if(this.counter == 0) {
      this.OnComplete.emit();
      console.log("-- End Counter--");
    } else {
      this.doCountDown();
    }
  }

  ngOnDestroy(): void{
    this.clearTimeout();
  }

}
