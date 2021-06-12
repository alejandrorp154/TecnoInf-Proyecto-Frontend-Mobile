import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarUbicacionesPage } from './visualizar-ubicaciones.page';

describe('VisualizarUbicacionesPage', () => {
  let component: VisualizarUbicacionesPage;
  let fixture: ComponentFixture<VisualizarUbicacionesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarUbicacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarUbicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
