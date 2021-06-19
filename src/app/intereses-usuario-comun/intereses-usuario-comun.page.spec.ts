import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InteresesUsuarioComunPage } from './intereses-usuario-comun.page';

describe('InteresesUsuarioComunPage', () => {
  let component: InteresesUsuarioComunPage;
  let fixture: ComponentFixture<InteresesUsuarioComunPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InteresesUsuarioComunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InteresesUsuarioComunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
