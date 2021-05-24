import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmacionModalComponent } from './confirmacion-modal.component';

describe('ConfirmacionModalComponent', () => {
  let component: ConfirmacionModalComponent;
  let fixture: ComponentFixture<ConfirmacionModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
