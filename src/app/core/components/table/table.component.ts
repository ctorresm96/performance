import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() clients: Client[] = [];
  @Input() title: string = '';
  @Output() newClient = new EventEmitter<string>();

  nameControl = new FormControl('', [
    Validators.minLength(3),
    Validators.required,
  ]);

  registerClient() {
    const value = this.nameControl.value ?? '';
    if (value.length < 3) {
      return;
    }
    this.newClient.emit(value);
    this.nameControl.reset();
  }

  public evaluateScore(score: number) {
    console.log('call fn ' + this.title);
    if (score < 2) {
      return 'low';
    } else if (score < 4) {
      return 'regular';
    } else {
      return 'high';
    }
  }
}
