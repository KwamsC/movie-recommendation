import { Router } from '@angular/router';
import { Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  constructor( private router: Router ) {}

  closeModal( $event ) {
    this.router.navigate([{outlets: {modal: null}}]);
    this.modalClose.next($event);
  }
}
